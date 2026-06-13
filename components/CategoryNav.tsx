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
      <div className="max-w-5xl mx-auto flex gap-2 overflow-x-auto scrollbar-hide justify-center flex-wrap">
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
    </nav>
  );
}
