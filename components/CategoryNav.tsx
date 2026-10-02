"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/data/products";

const ITEM_BASE =
  "flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all hover:scale-105";
const ITEM_INACTIVE = "text-[#c9b8e8] hover:text-white hover:bg-[#5a3d70]";
const ITEM_ACTIVE = "bg-[#f472b6] text-white";

const BAR = "fixed top-0 left-0 right-0 z-50 bg-[#3d2c4e] py-3 px-4";
const BAR_INNER = "relative max-w-5xl mx-auto";

const HIDDEN_ROUTES = ["/tienda", "/combo", "/conjuntos"];

function Wordmark() {
  return (
    <span className="flex items-baseline gap-0.5">
      <span className="font-black text-white tracking-widest text-sm uppercase">Shammah</span>
      <span className="font-bold text-[#f472b6] text-sm italic">Bebé</span>
    </span>
  );
}

export default function CategoryNav() {
  const pathname = usePathname();
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const scroll = (id: string) => {
    setActiveCat(id);
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

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

  const navItems = [
    ...categories.map((cat) => ({ id: cat.id, emoji: cat.emoji, label: cat.label })),
    { id: "tienda", emoji: "🛍️", label: "Tienda", href: "/tienda" },
    { id: "combo", emoji: "🛒", label: "Combo", href: "/combo" },
    { id: "conjuntos", emoji: "🎁", label: "Conjuntos" },
  ];

  const isHome = pathname === "/";
  const isHidden = HIDDEN_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isHidden) return null;

  if (!isHome) {
    return (
      <nav className={BAR}>
        <div className={BAR_INNER}>
          <Wordmark />
        </div>
      </nav>
    );
  }

  return (
    <nav className={BAR}>
      <div className={BAR_INNER}>
        <div className="md:hidden flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="category-drawer"
            className={`w-fit ${ITEM_BASE} ${ITEM_INACTIVE}`}
          >
            <span aria-hidden="true">☰</span>
            Categorías
          </button>
          <Wordmark />
        </div>

        <div className="hidden md:flex gap-2 overflow-x-auto overflow-y-hidden scrollbar-hide flex-nowrap h-auto">
          {navItems.map((item) =>
            "href" in item ? (
              <Link key={item.id} href={item.href} className={`${ITEM_BASE} ${ITEM_INACTIVE}`}>
                <span>{item.emoji}</span>
                {item.label}
              </Link>
            ) : (
              <button
                key={item.id}
                onClick={() => scroll(item.id)}
                className={`${ITEM_BASE} ${activeCat === item.id ? ITEM_ACTIVE : ITEM_INACTIVE}`}
              >
                <span>{item.emoji}</span>
                {item.label}
              </button>
            )
          )}
        </div>
        <div className="hidden md:block absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-[#3d2c4e] to-transparent pointer-events-none" />
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Cerrar menú de categorías"
            onClick={() => setOpen(false)}
            className="absolute inset-0 w-full h-full bg-black/60"
          />
          <div
            id="category-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Categorías"
            className="absolute inset-x-0 top-0 bg-[#3d2c4e] shadow-xl max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#5a3d70]">
              <span className="font-black text-[#c9b8e8]">Categorías</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="flex items-center justify-center w-8 h-8 rounded-full text-[#c9b8e8] hover:text-white hover:bg-[#5a3d70] transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col py-2">
              {navItems.map((item) =>
                "href" in item ? (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-left font-semibold text-[#c9b8e8] hover:text-white hover:bg-[#5a3d70] transition-colors"
                  >
                    <span>{item.emoji}</span>
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => scroll(item.id)}
                    className={`flex items-center gap-2 px-4 py-3 text-left font-semibold transition-colors ${
                      activeCat === item.id
                        ? "bg-[#f472b6] text-white"
                        : "text-[#c9b8e8] hover:text-white hover:bg-[#5a3d70]"
                    }`}
                  >
                    <span>{item.emoji}</span>
                    {item.label}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}