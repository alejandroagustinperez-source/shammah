"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import MLProductCard from "@/components/MLProductCard";
import { mlProductsMap } from "@/data/mlProducts";
import { products as artisanProducts } from "@/data/products";

interface TiendaCategory {
  id: string;
  label: string;
  emoji: string;
  type: "artisan" | "ml";
}

const allCategories: TiendaCategory[] = [
  { id: "baberos", label: "Baberos", emoji: "🍼", type: "artisan" },
  { id: "portachupetes", label: "Portachupetes", emoji: "🌈", type: "artisan" },
  { id: "babitas", label: "Babitas", emoji: "☁️", type: "artisan" },
  { id: "mantas", label: "Mantas", emoji: "🧸", type: "artisan" },
  { id: "muneco", label: "Muñecos de tela", emoji: "🪆", type: "artisan" },
  { id: "cunas", label: "Cunas", emoji: "🛏️", type: "ml" },
  { id: "silla-auto", label: "Silla para el auto", emoji: "🚗", type: "ml" },
  { id: "cochecito", label: "Cochecito de paseo", emoji: "👶", type: "ml" },
  { id: "paniales", label: "Pañales", emoji: "🧷", type: "ml" },
  { id: "chupetes", label: "Chupetes", emoji: "🍭", type: "ml" },
  { id: "biberon", label: "Biberón", emoji: "🍼", type: "ml" },
  { id: "saca-leche", label: "Saca leche", emoji: "🤱", type: "ml" },
  { id: "banadera", label: "Bañadera", emoji: "🛁", type: "ml" },
  { id: "jabon", label: "Jabón", emoji: "🧴", type: "ml" },
  { id: "mochila", label: "Mochila maternal", emoji: "🎒", type: "ml" },
  { id: "corralito", label: "Corralito", emoji: "🛡️", type: "ml" },
  { id: "silla-mecedora", label: "Silla mecedora", emoji: "🪑", type: "ml" },
  { id: "oleo", label: "Óleo calcáreo", emoji: "🧪", type: "ml" },
  { id: "manta-caminadora", label: "Manta caminadora", emoji: "🧶", type: "ml" },
  { id: "aspirador", label: "Aspirador nasal", emoji: "💨", type: "ml" },
  { id: "silla-comer", label: "Silla de comer", emoji: "🍽️", type: "ml" },
  { id: "camara", label: "Cámara", emoji: "📷", type: "ml" },
  { id: "piso", label: "Piso encastrable", emoji: "🧩", type: "ml" },
];



export default function TiendaPage() {
  const [activeCategory, setActiveCategory] = useState("baberos");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-category-id");
            if (id) setActiveCategory(id);
          }
        }
      },
      { rootMargin: "-90px 0px -55% 0px" }
    );

    const sections = document.querySelectorAll("[data-category-id]");
    sections.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    setTimeout(() => scrollToCategory(hash), 800);
  }, []);

  const scrollToCategory = (id: string) => {
    const el = document.querySelector(`[data-category-id="${id}"]`);
    el?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#fdfaf7]">
      {/* Top bar */}
      <div className="bg-[#3d2c4e] py-3 px-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-[#c9b8e8] hover:text-white text-xs sm:text-sm font-semibold transition-colors"
        >
          ← Volver
        </Link>
        <div className="flex flex-col items-center leading-tight">
          <div className="flex items-baseline gap-0.5">
            <span className="font-black text-white tracking-widest text-sm uppercase">Shammah</span>
            <span className="font-bold text-[#f472b6] text-sm italic">Bebé</span>
          </div>
          <span className="text-[#c9b8e8] text-[10px] font-medium tracking-widest uppercase">Tienda</span>
        </div>
        <a
          href="https://wa.me/5492664003795"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[#25D366] hover:text-[#1ebe5d] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.857L.057 23.882a.5.5 0 0 0 .61.61l6.025-1.477A11.955 11.955 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.694-.513-5.228-1.407l-.374-.222-3.88.952.972-3.878-.234-.384A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          <span className="text-xs font-bold">Consultar</span>
        </a>
      </div>

      <div className="max-w-7xl mx-auto lg:flex lg:gap-6 px-3 sm:px-4">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <nav className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto space-y-0.5 scrollbar-hide bg-white border-r border-[#ede8f5] p-3 rounded-xl">
            <div className="text-[#3d2c4e] font-black text-xs tracking-widest mb-3 px-2">
              CATEGORÍAS
            </div>
            {allCategories.map((cat) =>
              cat.type === "ml" ? (
                <Link
                  key={cat.id}
                  href={`/tienda/${cat.id}`}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 text-[#6b5a7a] hover:text-[#3d2c4e]"
                >
                  <span className="flex-shrink-0">{cat.emoji}</span>
                  <span className="truncate">{cat.label}</span>
                </Link>
              ) : (
                <button
                  key={cat.id}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                    activeCategory === cat.id
                      ? "bg-[#f5f0ff] text-[#3d2c4e] font-bold"
                      : "text-[#6b5a7a] hover:text-[#3d2c4e]"
                  }`}
                >
                  <span className="flex-shrink-0">{cat.emoji}</span>
                  <span className="truncate">{cat.label}</span>
                </button>
              )
            )}
          </nav>
        </aside>

        {/* Mobile hamburger + drawer */}
        <div className="lg:hidden sticky top-0 z-20 mb-4 sm:mb-6">
          <div className="bg-[#fdfaf7]/90 backdrop-blur border-b border-[#e8e0f0] px-3 py-2.5 flex items-center justify-between">
            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#f0ecf8] hover:bg-[#e0d4ec] text-[#7b5ea7] font-semibold text-sm transition-all active:scale-95"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
              Categorías
            </button>
            <span className="text-xs text-[#9b8bb4] font-semibold">
              {activeCategory ? allCategories.find(c => c.id === activeCategory)?.label : ""}
            </span>
          </div>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/40 z-30"
                onClick={() => setMenuOpen(false)}
              />
              <div className="fixed top-0 left-0 right-0 z-40 bg-white rounded-b-2xl shadow-xl max-h-[60vh] overflow-y-auto">
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#f0ecf8]">
                  <span className="font-bold text-[#4a4a4a] text-sm">Categorías</span>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[#f0ecf8] text-[#9b8bb4] hover:bg-[#d4b8e0] hover:text-white transition-all"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
                <div className="py-1">
                  {allCategories.map((cat, i) =>
                    cat.type === "ml" ? (
                      <Link
                        key={cat.id}
                        href={`/tienda/${cat.id}`}
                        onClick={() => setMenuOpen(false)}
                        className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-all text-[#4a4a4a] font-semibold hover:bg-[#faf8ff] ${
                          i < allCategories.length - 1 ? "border-b border-[#f0ecf8]" : ""
                        }`}
                      >
                        <span className="text-lg">{cat.emoji}</span>
                        <span className="text-sm">{cat.label}</span>
                        <span className="ml-auto text-[9px] font-bold uppercase tracking-wider text-white bg-[#9b8bb4] px-1.5 py-0.5 rounded-full">ML</span>
                      </Link>
                    ) : (
                      <button
                        key={cat.id}
                        onClick={() => scrollToCategory(cat.id)}
                        className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-all ${
                          activeCategory === cat.id
                            ? "bg-[#f0ecf8] text-[#7b5ea7] font-bold"
                            : "text-[#4a4a4a] font-semibold hover:bg-[#faf8ff]"
                        } ${i < allCategories.length - 1 ? "border-b border-[#f0ecf8]" : ""}`}
                      >
                        <span className="text-lg">{cat.emoji}</span>
                        <span className="text-sm">{cat.label}</span>
                      </button>
                    )
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <main className="flex-1 min-w-0 pb-16">
          {/* Artisan sections */}
            {allCategories
            .filter((c) => c.type === "artisan")
            .map((cat) => {
              const filtered = artisanProducts.filter((p) => p.category === cat.id);
              return (
                <section
                  key={cat.id}
                  id={cat.id}
                  data-category-id={cat.id}
                  className="mb-10 sm:mb-14 scroll-mt-24"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 flex items-center justify-center bg-[#f5f0ff] rounded-full text-lg">
                      {cat.emoji}
                    </span>
                    <h2 className="font-black text-[#3d2c4e] text-xl">
                      {cat.label}
                    </h2>
                    <div className="flex-1 h-px bg-[#ede0f5]" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
                    {filtered.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                </section>
              );
            })}

          {/* ML sections */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 flex items-center justify-center bg-[#f5f0ff] rounded-full text-lg">
                🛒
              </span>
              <h2 className="font-black text-[#3d2c4e] text-xl">
                Productos de Mercado Libre
              </h2>
              <div className="flex-1 h-px bg-[#ede0f5]" />
            </div>
          </div>

          {allCategories
            .filter((c) => c.type === "ml")
            .map((cat) => {
              const products = mlProductsMap[cat.id] || [];
              return (
                <section
                  key={cat.id}
                  id={cat.id}
                  data-category-id={cat.id}
                  className="mb-10 sm:mb-14 scroll-mt-24"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 flex items-center justify-center bg-[#f5f0ff] rounded-full text-lg">
                      {cat.emoji}
                    </span>
                    <h2 className="font-black text-[#3d2c4e] text-xl">
                      {cat.label}
                    </h2>
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white bg-[#9b8bb4] px-1.5 sm:px-2 py-0.5 rounded-full">
                      ML
                    </span>
                    <div className="flex-1 h-px bg-[#ede0f5]" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {products.map((p, i) => (
                      <MLProductCard key={i} product={p} />
                    ))}
                  </div>
                </section>
              );
            })}
        </main>
      </div>
    </div>
  );
}
