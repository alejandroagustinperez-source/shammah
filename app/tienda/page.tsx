"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products as artisanProducts } from "@/data/products";

interface TiendaCategory {
  id: string;
  label: string;
  emoji: string;
}

const allCategories: TiendaCategory[] = [
  { id: "baberos", label: "Baberos", emoji: "🍼" },
  { id: "portachupetes", label: "Portachupetes", emoji: "🌈" },
  { id: "babitas", label: "Babitas", emoji: "☁️" },
  { id: "mantas", label: "Mantas", emoji: "🧸" },
  { id: "muneco", label: "Muñecos de tela", emoji: "🪆" },
];

export default function TiendaPage() {
  const [activeCategory, setActiveCategory] = useState<string>("baberos");
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToCategory = (id: string) => {
    const el = document.querySelector(`[data-category-id="${id}"]`);
    el?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

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
          className="text-[#25D366] text-sm font-bold flex items-center gap-1"
        >
          <span>💬</span> Consultar
        </a>
      </div>

      <div className="max-w-7xl mx-auto lg:flex lg:gap-6 px-3 sm:px-4">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <nav className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto space-y-0.5 scrollbar-hide">
            <div className="text-[#3d2c4e] font-black text-xs tracking-widest mb-3 px-2">
              CATEGORÍAS
            </div>
            {allCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? "bg-[#f0ecf8] text-[#3d2c4e] font-bold"
                    : "text-[#6b5a7a] hover:text-[#3d2c4e]"
                }`}
              >
                <span className="flex-shrink-0">{cat.emoji}</span>
                <span className="truncate">{cat.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile hamburger + drawer */}
        <div className="lg:hidden sticky top-0 z-20 mb-4 sm:mb-6">
          <button
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#f0ecf8] hover:bg-[#e0d4ec] text-[#7b5ea7] font-semibold text-sm transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            Categorías
          </button>
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
                  ✕
                </button>
              </div>
              <div className="py-1">
                {allCategories.map((cat, i) => (
                  <button
                    key={cat.id}
                    onClick={() => scrollToCategory(cat.id)}
                    className={`w-full text-left px-4 py-3 flex items-center gap-2 font-semibold ${
                      activeCategory === cat.id ? "text-[#7b5ea7] font-bold" : "text-[#4a4a4a]"
                    } ${i < allCategories.length - 1 ? "border-b border-[#f0ecf8]" : ""}`}
                  >
                    <span className="flex-shrink-0">{cat.emoji}</span>
                    <span className="truncate">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Content */}
        <main className="flex-1 min-w-0 pb-16">
          {allCategories.map((cat) => {
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
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {filtered.map((p) => (
                    <ProductCard key={p.id} product={p} />
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
