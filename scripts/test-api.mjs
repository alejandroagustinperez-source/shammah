#!/usr/bin/env node
import { readFileSync } from "node:fs";
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
    if (!(match[1] in process.env)) process.env[match[1]] = match[2];
  }
}

loadEnvFile(join(PROJECT_DIR, ".env.local"));

const CLIENT_ID = process.env.ML_CLIENT_ID;
const CLIENT_SECRET = process.env.ML_CLIENT_SECRET;
const API_BASE = process.env.ML_API_BASE ?? "https://api.mercadolibre.com";
const ITEM_ID = process.argv[2] ?? "MLA3222235936";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("Faltan ML_CLIENT_ID y/o ML_CLIENT_SECRET en .env.local");
  process.exit(1);
}

async function getToken() {
  const res = await fetch(`${API_BASE}/oauth/token`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }).toString(),
  });
  const body = await res.json();
  if (!res.ok || !body.access_token) {
    throw new Error(`No se pudo obtener el token (${res.status}: ${body.error_description ?? body.message ?? JSON.stringify(body)})`);
  }
  return body.access_token;
}

async function main() {
  const token = await getToken();
  console.log("Token obtenido OK");

  const res = await fetch(`${API_BASE}/items/${ITEM_ID}`, {
    headers: { authorization: `Bearer ${token}`, accept: "application/json" },
  });
  const body = await res.json();
  if (!res.ok) {
    console.error(`GET /items/${ITEM_ID} -> ${res.status}: ${body.message ?? JSON.stringify(body)}`);
    process.exit(1);
  }

  console.log(`ID: ${body.id}`);
  console.log(`Título: ${body.title}`);
  console.log(`Status: ${body.status}`);
  console.log(`Price: ${body.price}`);
  console.log(`OriginalPrice: ${body.original_price ?? "(null)"}`);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});