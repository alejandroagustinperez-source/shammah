"use client";
import { useState } from "react";

export type MLProduct = {
  name: string;
  price: number;
  href: string;
  image: string;
  badge?: string;
};

export default function MLProductCard({ product }: { product: MLProduct }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-[#f0ecf8] overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 flex flex-col">
      <div className="relative aspect-square bg-[#faf8ff] overflow-hidden">
        {imgError ? (
          <div className="w-full h-full flex items-center justify-center text-6xl text-[#d4b8e0]">
            🛒
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        )}
        {product.badge && (
          <span className="absolute top-3 right-3 bg-[#ff6b6b] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1 gap-2">
        <h3 className="font-bold text-[#4a4a4a] text-sm leading-tight line-clamp-2">
          {product.name}
        </h3>
        <div className="text-xl font-black text-[#2eab6b]">
          ${product.price.toLocaleString("es-AR")}
        </div>
        <a
          href={product.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-2 w-full bg-[#9b8bb4] hover:bg-[#7b5ea7] text-white font-bold py-2.5 px-4 rounded-full text-sm transition-all hover:scale-105"
        >
          Ver producto
        </a>
      </div>
    </div>
  );
}
