"use client";
import { useState } from "react";

export type MLProduct = {
  name: string;
  price: number;
  href: string;
  image: string;
  badge?: string;
  originalPrice?: number;
  discount?: string;
  installments?: string;
};

function formatPrice(n: number) {
  return "$" + n.toLocaleString("es-AR");
}

export default function MLProductCard({ product }: { product: MLProduct }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-[#f0ecf8] overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 flex flex-col">
      <div className="relative h-36 sm:h-40 md:h-48 bg-[#f8f8f8] overflow-hidden">
        {imgError ? (
          <div className="w-full h-full flex items-center justify-center text-4xl sm:text-6xl text-[#d4b8e0]">
            🛒
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-2 sm:p-3"
            onError={() => setImgError(true)}
          />
        )}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1">
          {product.discount && (
            <span className="badge-descuento">{product.discount}</span>
          )}
        </div>
        {product.badge && (
          <span className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-[#ff6b6b] text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-sm">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-3 sm:p-4 flex flex-col flex-1 gap-1.5 sm:gap-2">
        <h3 className="font-bold text-[#4a4a4a] text-xs sm:text-sm leading-tight line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
          {product.originalPrice && (
            <span className="price-original text-[10px] sm:text-xs">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          <span className="text-base sm:text-lg md:text-xl font-black text-[#2eab6b]">
            {formatPrice(product.price)}
          </span>
        </div>
        {product.installments && (
          <p className="text-[10px] sm:text-xs font-semibold text-[#9b8bb4]">
            {product.installments}
          </p>
        )}
        <a
          href={product.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-2 w-full bg-[#9b8bb4] hover:bg-[#7b5ea7] text-white font-bold py-2.5 px-3 sm:px-4 rounded-full text-xs sm:text-sm transition-all hover:scale-105 min-h-[44px]"
        >
          Ver producto
        </a>
      </div>
    </div>
  );
}
