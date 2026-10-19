"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getWhatsAppUrl } from "@/data/products";
import IconoWhatsApp from "./IconoWhatsApp";

const HIDDEN_ROUTES = ["/tienda", "/combo", "/conjuntos"];

const links = [
  { href: "/#productos", label: "Productos" },
  { href: "/#conjuntos", label: "Conjuntos" },
  { href: "/combo", label: "Armá tu combo" },
  { href: "/tienda", label: "Tienda" },
  { href: "/#como-comprar", label: "Cómo comprar" },
];

function Marca() {
  return (
    <Link href="/" className="flex flex-col leading-none">
      <span className="font-titulo text-[24px] font-semibold text-ciruela">Shammah</span>
      <span className="font-titulo italic text-[15px] text-frambuesa -mt-0.5">bebé</span>
    </Link>
  );
}

export default function CategoryNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isHidden = HIDDEN_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
  if (isHidden) return null;

  const whatsapp = getWhatsAppUrl("Hola Shammah Bebé! Quiero hacer una consulta.");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-lino/95 backdrop-blur border-b-2 border-dashed border-[#e4c9b8]">
      <nav aria-label="Principal" className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
        <Marca />

        <div className="hidden lg:flex items-center gap-7 font-semibold text-[15px]">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-ciruela hover:text-frambuesa transition-colors">
              {l.label}
            </Link>
          ))}
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 min-h-[44px] px-5 rounded-full bg-ciruela text-lino hover:bg-ciruela-claro transition-colors"
          >
            <IconoWhatsApp />
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label="Abrir menú"
          className="lg:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5"
        >
          <span className="block w-6 h-0.5 rounded bg-ciruela" />
          <span className="block w-6 h-0.5 rounded bg-ciruela" />
          <span className="block w-6 h-0.5 rounded bg-ciruela" />
        </button>
      </nav>

      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
            className="absolute inset-0 w-full h-full bg-ciruela/50"
          />
          <div
            id="menu-movil"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            className="absolute right-0 top-0 h-full w-72 bg-lino shadow-xl flex flex-col p-6 gap-1"
          >
            <div className="flex items-center justify-between mb-4">
              <Marca />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="w-11 h-11 flex items-center justify-center text-ciruela"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-lg font-semibold text-ciruela border-b border-dashed border-costura"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 min-h-[50px] rounded-full bg-ciruela text-lino font-bold"
            >
              <IconoWhatsApp />
              Escribinos por WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
