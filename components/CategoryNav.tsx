"use client";
import { useState } from "react";
import { categories } from "@/data/products";

export default function CategoryNav() {
  const [activeCat, setActiveCat] = useState<string | null>(null);

  const scroll = (id: string) => {
    setActiveCat(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="sticky top-0 z-10 bg-[#3d2c4e] py-3 px-4">
      <div className="relative max-w-5xl mx-auto">
        <div className="flex gap-2 overflow-x-auto overflow-y-hidden scrollbar-hide flex-nowrap h-auto">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => scroll(cat.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all hover:scale-105 ${
              activeCat === cat.id
                ? "bg-[#f472b6] text-white"
                : "text-[#c9b8e8] hover:text-white hover:bg-[#5a3d70]"
            }`}
          >
            <span>{cat.emoji}</span>
            {cat.label}
          </button>
        ))}
        <a
          href="/tienda"
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[#c9b8e8] hover:text-white hover:bg-[#5a3d70] font-semibold text-sm whitespace-nowrap transition-all hover:scale-105"
        >
          🛍️ Tienda
        </a>
        <a
          href="/combo"
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[#c9b8e8] hover:text-white hover:bg-[#5a3d70] font-semibold text-sm whitespace-nowrap transition-all hover:scale-105"
        >
          🛒 Combo
        </a>
        <button
          onClick={() => scroll("conjuntos")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all hover:scale-105 ${
            activeCat === "conjuntos"
              ? "bg-[#f472b6] text-white"
              : "text-[#c9b8e8] hover:text-white hover:bg-[#5a3d70]"
          }`}
        >
          🎁 Conjuntos
        </button>
        </div>
        <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-[#3d2c4e] to-transparent pointer-events-none" />
      </div>
    </nav>
  );
}
