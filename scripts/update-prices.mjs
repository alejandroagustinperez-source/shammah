#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PROJECT_DIR = join(dirname(fileURLToPath(import.meta.url)), "..");

function loadEnvFile(file) {
  let text;
  try {
    text = readFileSync(file, "utf8");
  } catch {
    return;
  }
  for (const line of text.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!match) continue;
    let value = match[2];
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(match[1] in process.env)) process.env[match[1]] = value;
  }
}

loadEnvFile(join(PROJECT_DIR, ".env.local"));

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const showHelp = args.includes("--help") || args.includes("-h");
const flagValue = (name) => {
  const i = args.indexOf(name);
  return i !== -1 ? args[i + 1] : undefined;
};

const DEFAULT_FILE = join(PROJECT_DIR, "data", "mlProducts.ts");
const DATA_FILE = flagValue("--file") ?? DEFAULT_FILE;
const LIMIT = Number(flagValue("--limit") ?? Number.POSITIVE_INFINITY);
const DELAY_MS = Number(process.env.ML_DELAY_MS ?? 300);
const API_BASE = process.env.ML_API_BASE ?? "https://api.mercadolibre.com";
const ML_CLIENT_ID = process.env.ML_CLIENT_ID;
const ML_CLIENT_SECRET = process.env.ML_CLIENT_SECRET;
const TIMEOUT_MS = Number(process.env.ML_TIMEOUT_MS ?? 15000);
const SEARCH_LIMIT = 1;

const RETRY_STATUSES = new Set([429, 500, 502, 503, 504]);

function truncate(text, max) {
  const clean = String(text ?? "").replace(/\s+/g, " ").trim();
  return clean.length > max ? clean.slice(0, max - 1) + "…" : clean;
}

function formatPrice(n) {
  return "$" + n.toLocaleString("es-AR");
}

async function fetchText(url, options = {}, retries = 3) {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(url, { ...options, signal: controller.signal });
      const text = await res.text();
      clearTimeout(timer);
      if (RETRY_STATUSES.has(res.status)) {
        await sleep(500 * 2 ** attempt);
        continue;
      }
      return { res, text };
    } catch (err) {
      clearTimeout(timer);
      lastError = err;
      await sleep(500 * 2 ** attempt);
    }
  }
  throw lastError ?? new Error("La petición falló tras varios intentos");
}

let accessToken = null;
let tokenExpiresAt = 0;

async function obtainToken() {
  if (!ML_CLIENT_ID || !ML_CLIENT_SECRET) {
    throw new Error(
      "Faltan ML_CLIENT_ID y/o ML_CLIENT_SECRET. Definilas en .env.local",
    );
  }
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: ML_CLIENT_ID,
    client_secret: ML_CLIENT_SECRET,
  });
  const { res, text } = await fetchText(
    `${API_BASE}/oauth/token`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    },
    1,
  );
  if (!res.ok) {
    let reason = `HTTP ${res.status}`;
    try {
      const error = JSON.parse(text);
      if (error.error_description) reason = error.error_description;
      if (error.message) reason = error.message;
      if (error.error) reason = `${error.error} (${reason})`;
    } catch {}
    throw new Error(`No se pudo obtener el access token (${reason})`);
  }
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("OAuth: la respuesta no es JSON");
  }
  if (!data.access_token) {
    throw new Error("OAuth: la respuesta no incluye access_token");
  }
  accessToken = data.access_token;
  tokenExpiresAt =
    Date.now() + (Number(data.expires_in ?? 3600) * 1000) - 60000;
  return accessToken;
}

function getAccessToken() {
  if (accessToken && Date.now() < tokenExpiresAt) {
    return Promise.resolve(accessToken);
  }
  return obtainToken();
}

async function searchItem(name) {
  const q = encodeURIComponent(name);
  const searchUrl = `${API_BASE}/sites/MLA/search?q=${q}&limit=${SEARCH_LIMIT}`;
  let { res, text } = await fetchText(searchUrl, {
    headers: {
      accept: "application/json",
      authorization: `Bearer ${await getAccessToken()}`,
    },
  });
  if (res.status === 401) {
    accessToken = null;
    const retry = await fetchText(searchUrl, {
      headers: {
        accept: "application/json",
        authorization: `Bearer ${await obtainToken()}`,
      },
    });
    res = retry.res;
    text = retry.text;
  }
  if (res.status === 403) {
    let reason = `HTTP ${res.status}`;
    try {
      const body = JSON.parse(text);
      if (body.message) reason = body.message;
      if (body.blocked_by) reason = `API bloqueada por ${body.blocked_by}`;
    } catch {}
    return { status: "error", reason };
  }
  if (!res.ok) {
    return { status: "error", reason: `HTTP ${res.status}` };
  }
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    return { status: "error", reason: "la respuesta de la API no es JSON" };
  }
  const item = data?.results?.[0];
  if (!item) {
    return { status: "inactive", reason: "sin resultados en la búsqueda" };
  }
  if (!Number.isFinite(item.price)) {
    return { status: "error", reason: "la API no devolvió un price válido" };
  }
  return { status: "ok", id: item.id, item };
}

function fieldRegex(key) {
  return new RegExp(`\\n {6}${key}: [^\\n]*`);
}
function hasField(block, key) {
  return fieldRegex(key).test(block);
}
function setField(block, key, literal) {
  const re = fieldRegex(key);
  if (!re.test(block)) return block;
  return block.replace(re, `\n      ${key}: ${literal},`);
}
function removeField(block, key) {
  return block.replace(fieldRegex(key), "");
}
function insertAfter(block, afterKey, key, literal) {
  return block.replace(
    new RegExp(`(\\n {6}${afterKey}: [^\\n]*)`),
    `$1\n      ${key}: ${literal},`,
  );
}

function setMlId(block, id) {
  return hasField(block, "mlId")
    ? setField(block, "mlId", `"${id}"`)
    : insertAfter(block, "name", "mlId", `"${id}"`);
}

function stripInactivo(block) {
  return block.replace(/\n {6}\/\/\s*INACTIVO/, "");
}
function markInactivo(block) {
  return stripInactivo(block).replace(/\n {4}\}$/, (m) => "\n      // INACTIVO" + m);
}

function computeDiscount(price, original) {
  if (original == null || original <= price) return null;
  const pct = Math.round((1 - price / original) * 100);
  return pct > 0 ? `${pct}% OFF` : null;
}

function buildUpdatedBlock(block, result) {
  if (result.status === "inactive") {
    return markInactivo(block);
  }
  const price = Math.round(result.item.price);
  const originalPrice = result.item.original_price;
  const original =
    originalPrice != null && Number(originalPrice) > price
      ? Math.round(originalPrice)
      : null;

  let next = stripInactivo(block);
  next = setMlId(next, result.id);
  next = setField(next, "price", price);
  if (original != null) {
    next = hasField(next, "originalPrice")
      ? setField(next, "originalPrice", original)
      : insertAfter(next, "price", "originalPrice", original);
  } else {
    next = removeField(next, "originalPrice");
  }

  const discount = computeDiscount(price, original);
  if (discount != null) {
    const anchor = original != null ? "originalPrice" : "price";
    next = hasField(next, "discount")
      ? setField(next, "discount", `"${discount}"`)
      : insertAfter(next, anchor, "discount", `"${discount}"`);
  } else {
    next = removeField(next, "discount");
  }
  return next;
}

function parsePrice(block) {
  const m = block.match(/\n {6}price: ([0-9.]+)/);
  return m ? Number(m[1]) : null;
}

async function main() {
  const source = await readFile(DATA_FILE, "utf8");

  const productBlocks = [];
  const regex = /\{[^{}]*\}/g;
  let match;
  while ((match = regex.exec(source)) !== null) {
    const block = match[0];
    if (block.includes('href: "') && block.includes("name: ")) {
      productBlocks.push({ block, index: match.index });
    }
  }

  if (productBlocks.length === 0) {
    console.error(`No se encontraron productos en ${DATA_FILE}`);
    process.exit(1);
  }

  const cache = new Map();
  const stats = { updated: 0, errors: 0 };
  const parts = [];
  let cursor = 0;
  const total = Math.min(productBlocks.length, LIMIT);

  for (let i = 0; i < total; i++) {
    const { block, index } = productBlocks[i];
    const href = block.match(/href: "([^"]+)"/)?.[1] ?? "";
    const name = block.match(/name: "([^"]*)"/)?.[1] ?? "";

    let result = cache.get(name);
    if (!result) {
      try {
        result = await searchItem(name);
      } catch (err) {
        result = { status: "error", reason: `${err.name}: ${err.message}` };
      }
      cache.set(name, result);
      await sleep(DELAY_MS);
    }

    let next = block;
    if (result.status === "ok" || result.status === "inactive") {
      next = buildUpdatedBlock(block, result);
    }

    const label = `[${i + 1}/${total}] ${truncate(name, 55)}`.padEnd(78, " ");
    if (result.status === "ok") {
      if (next !== block) {
        stats.updated++;
        console.log(`${label} OK price ${formatPrice(parsePrice(block))} -> ${formatPrice(Math.round(result.item.price))} (${result.id})`);
      } else {
        console.log(`${label} OK sin cambios (price ${formatPrice(Math.round(result.item.price))})`);
      }
    } else if (result.status === "inactive") {
      console.log(`${label} INACTIVO (${result.reason ?? "no disponible"})`);
    } else {
      stats.errors++;
      console.log(`${label} ERROR (${truncate(result.reason, 60)})`);
    }

    if (result.status !== "ok" && result.status !== "inactive") {
      console.log(`            href: ${href}`);
    }

    parts.push(source.slice(cursor, index));
    parts.push(next);
    cursor = index + block.length;
  }
  parts.push(source.slice(cursor));
  const newSource = parts.join("");

  if (newSource !== source) {
    if (dryRun) {
      console.log(`\n(dry-run) Hay cambios pendientes pero no se escribió el archivo.`);
    } else {
      await writeFile(DATA_FILE, newSource, "utf8");
      console.log(`\nArchivo actualizado: ${DATA_FILE}`);
    }
  } else {
    console.log(`\nSin cambios en ${DATA_FILE}.`);
  }

  const inactiveTotal = (newSource.match(/\/\/\s*INACTIVO/g) ?? []).length;
  console.log("\nResumen:");
  console.log(`  Precios actualizados: ${stats.updated}`);
  console.log(`  Productos INACTIVO (// INACTIVO): ${inactiveTotal}`);
  console.log(`  Errores (red/API): ${stats.errors}`);
}

if (showHelp) {
  console.log(`Uso: node scripts/update-prices.mjs [opciones]

Lee data/mlProducts.ts, busca cada producto por nombre en la API pública
de MercadoLibre (/sites/MLA/search) y actualiza price, originalPrice,
discount y mlId. Marca con // INACTIVO los productos que no encuentra.

Opciones:
  --dry-run           No escribe el archivo, solo muestra los cambios
  --limit <n>         Procesa solo los primeros n productos
  --file <ruta>       Archivo de datos alternativo (por defecto data/mlProducts.ts)
  -h, --help          Muestra esta ayuda

Variables de entorno (pueden ir en .env.local):
  ML_CLIENT_ID        ID de la aplicación de MercadoLibre (OAuth)
  ML_CLIENT_SECRET    Secret de la aplicación de MercadoLibre (OAuth)
  ML_API_BASE         Base de la API (por defecto https://api.mercadolibre.com)
  ML_DELAY_MS         Demora entre peticiones (por defecto 300)
  ML_TIMEOUT_MS       Timeout por peticion en ms (por defecto 15000)`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});