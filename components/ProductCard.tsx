"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Product, getWhatsAppUrl } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [erroredThumbs, setErroredThumbs] = useState<Record<number, boolean>>({});
  const [viewers, setViewers] = useState(0);
  useEffect(() => setViewers(Math.floor(Math.random() * 10) + 3), []);
  const discount = Math.round(
    ((product.originalPrice - product.currentPrice) / product.originalPrice) * 100
  );

  const currentModel = () => {
    const filename = product.images[imgIndex]?.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "";
    const segments = filename.split("-");
    return segments.slice(1).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  };

  const whatsappMessage = `Hola Shammah Bebe!\n\nMe encanto este producto y quiero pedirlo:\n\n>> *${product.name}*\nModelo: ${currentModel()}\n\nTienen disponible?`;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-[#f0ecf8] overflow-hidden hover:shadow-md transition-all hover:-translate-y-1">
      <div className={`relative bg-[#faf8ff] ${product.category === "muneco" ? "aspect-square" : "aspect-[3/4]"} overflow-hidden`}>
        {product.images.length > 0 && product.images[0] !== "/images/placeholder.jpg" ? (
          <img
            src={product.images[imgIndex]}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: product.category === "muneco" ? "contain" : "cover" }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            {product.category === "baberos" && "🍼"}
            {product.category === "portachupetes" && "🌈"}
            {product.category === "babitas" && "☁️"}
            {product.category === "mantas" && "🧶"}
            {product.category === "muneco" && "🧸"}
          </div>
        )}
        <span className="badge-descuento absolute top-3 right-3">
          -{discount}%
        </span>
        {product.badge && (
          <span className="absolute top-3 left-3 bg-white/80 backdrop-blur rounded-full px-2.5 py-0.5 text-xs font-bold text-[#9b8bb4] shadow-sm">
            {product.badge}
          </span>
        )}
      </div>
      {product.images.length > 1 && (
        <div className="flex gap-1.5 py-2 px-4 bg-[#faf8ff] overflow-x-auto">
          {product.images.map((src, i) => (
            <button key={i} onClick={() => setImgIndex(i)} className="flex-shrink-0">
              {erroredThumbs[i] ? (
                <div className="w-14 h-14 rounded-lg bg-[#f0ecf8]" />
              ) : (
                <Image
                  src={src}
                  alt={`${product.name} ${i + 1}`}
                  width={56}
                  height={56}
                  style={{ width: "56px", height: "56px", minWidth: "56px", objectFit: "cover" }}
                  onError={() =>
                    setErroredThumbs((prev) => ({ ...prev, [i]: true }))
                  }
                  className={`rounded-lg bg-[#f5f5f5] border transition-all ${
                    i === imgIndex
                      ? "border-2 border-[#9b8bb4] scale-110"
                      : "opacity-70 hover:opacity-100 border-gray-200"
                  }`}
                />
              )}
            </button>
          ))}
        </div>
      )}
      <div className="p-4">
        <h3 className="font-bold text-[#4a4a4a] text-base mb-1">{product.name}</h3>
        <p className="text-xs text-[#ff6b6b] font-semibold mb-1">🔥 {viewers} personas viendo esto ahora</p>
        <p className="text-sm text-[#9a9a9a] mb-3">{product.description}</p>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="price-original text-sm">
            ${product.originalPrice.toLocaleString("es-AR")}
          </span>
          <span className="text-2xl font-black text-[#2eab6b]">
            ${product.currentPrice.toLocaleString("es-AR")}
          </span>
        </div>
        
          <a
          href={getWhatsAppUrl(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-[#25d366] hover:bg-[#1ebe5d] text-white font-bold py-2.5 px-4 rounded-full text-sm transition-all hover:scale-105"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.857L.057 23.882a.5.5 0 0 0 .61.61l6.025-1.477A11.955 11.955 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.694-.513-5.228-1.407l-.374-.222-3.88.952.972-3.878-.234-.384A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
          </svg>
          Pedir por WhatsApp
        </a>
      </div>
    </div>
  );
}
