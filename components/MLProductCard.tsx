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
    <div className="bg-white rounded-2xl border border-[#ede8f5] overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:border-[#c9b8e8] hover:shadow-lg">
      <div className="relative h-36 sm:h-40 md:h-48 bg-[#fafafa] overflow-hidden">
        {imgError ? (
          <div className="w-full h-full flex items-center justify-center text-4xl text-[#d4b8e0]">
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

        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.discount && (
            <span className="bg-[#f43f5e] text-white text-[10px] font-black px-2 py-0.5 rounded-md tracking-wide">
              {product.discount}
            </span>
          )}
        </div>

        {product.badge && (
          <span className="absolute top-2 right-2 bg-[#3d2c4e] text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
            {product.badge}
          </span>
        )}
      </div>

      <div className="p-3 sm:p-4 flex flex-col flex-1 gap-2">
        <h3 className="font-bold text-[#3d2c4e] text-xs sm:text-sm leading-snug line-clamp-2">
          {product.name}
        </h3>

        <div className="flex flex-col gap-0.5">
          {product.originalPrice && (
            <span className="text-[11px] text-[#bbb] line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          <span className="text-lg sm:text-xl font-black text-[#3d2c4e]">
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
          className="mt-auto flex items-center justify-center gap-2 w-full bg-[#3d2c4e] hover:bg-[#5a3d70] text-white font-bold py-2.5 px-3 rounded-xl text-xs sm:text-sm transition-all min-h-[44px]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          ¡Lo quiero!
        </a>
      </div>
    </div>
  );
}
