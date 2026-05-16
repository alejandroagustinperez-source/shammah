"use client";
import { categories } from "@/data/products";

export default function CategoryNav() {
  const scroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-[#e8e0f0] py-3 px-4">
      <div className="max-w-5xl mx-auto flex gap-2 overflow-x-auto scrollbar-hide justify-center flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => scroll(cat.id)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#f0ecf8] hover:bg-[#d4b8e0] text-[#7b5ea7] font-semibold text-sm whitespace-nowrap transition-all hover:scale-105"
          >
            <span>{cat.emoji}</span>
            {cat.label}
        </button>
        <a
          href="/combo"
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#e8f7fb] hover:bg-[#a8d8ea] text-[#5b9db3] font-semibold text-sm whitespace-nowrap transition-all hover:scale-105"
        >
          🛒 Combo
        </a>
        ))}
        <button
          onClick={() => scroll("conjuntos")}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#f0ecf8] hover:bg-[#d4b8e0] text-[#7b5ea7] font-semibold text-sm whitespace-nowrap transition-all hover:scale-105"
        >
          🎁 Conjuntos
        </button>
      </div>
    </nav>
  );
}
