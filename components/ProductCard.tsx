"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Product, getWhatsAppUrl } from "@/data/products";
import IconoWhatsApp from "./IconoWhatsApp";

export default function ProductCard({ product }: { product: Product }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!lightboxOpen) return;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxOpen]);

  const unica = product.category === "muneco";
  const hasImage = product.images.length > 0 && product.images[0] !== "/images/placeholder.jpg";

  const currentModel = () => {
    const filename = product.images[imgIndex]?.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "";
    const segments = filename.split("-");
    return segments.slice(1).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  };

  const sizeQuestion = product.category === "baberos" ? "\n\n¿De cuántos meses es tu bebé?" : "";
  const whatsappMessage = `Hola Shammah Bebé!\n\nMe encantó este producto y quiero pedirlo:\n\n>> *${product.name}*\nModelo: ${currentModel()}\n\n¿Tienen disponible?${sizeQuestion}`;

  return (
    <article className="flex flex-col gap-3">
      <div className="relative aspect-[4/5] rounded-[22px] overflow-hidden bg-durazno-suave">
        {hasImage ? (
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label={`Ampliar foto de ${product.name}`}
            className="w-full h-full cursor-zoom-in"
          >
            <Image
              src={product.images[imgIndex]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 270px"
              className="object-cover"
            />
          </button>
        ) : (
          <div className="w-full h-full" />
        )}
        {unica && (
          <span className="absolute top-3 left-3 bg-lino text-ciruela text-[13px] font-bold rounded-full px-3 py-1">
            Pieza única
          </span>
        )}
      </div>

      {product.images.length > 1 && (
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide -mx-0.5 px-0.5 pb-0.5" role="group" aria-label="Modelos disponibles">
          {product.images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setImgIndex(i)}
              aria-label={`Ver modelo ${i + 1}`}
              aria-pressed={i === imgIndex}
              className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                i === imgIndex ? "border-ciruela" : "border-transparent opacity-75 hover:opacity-100"
              }`}
            >
              <Image src={src} alt="" width={88} height={88} quality={60} loading="lazy" className="w-11 h-11 object-cover" />
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <h4 className="font-titulo text-lg md:text-xl font-semibold text-ciruela leading-snug">{product.name}</h4>
        <p className="text-sm text-gris-calido leading-relaxed">{product.description}</p>
        {product.category === "baberos" && <p className="text-sm text-gris-calido">Talle: 0 a 12 meses</p>}
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
        <span className="text-lg md:text-xl font-bold text-hilo">${product.currentPrice.toLocaleString("es-AR")}</span>
        <a
          href={getWhatsAppUrl(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 min-h-[44px] px-4 rounded-full border-2 border-ciruela text-ciruela font-bold text-[15px] hover:bg-ciruela hover:text-lino transition-colors"
        >
          <IconoWhatsApp size={16} />
          Pedir
        </a>
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={product.name}
        >
          <div className="relative max-w-[90vw] max-h-[90vh] w-full h-full">
            <Image
              src={product.images[imgIndex]}
              alt={product.name}
              fill
              sizes="90vw"
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Cerrar"
            className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white text-xl transition-colors"
          >
            ✕
          </button>
        </div>
      )}
    </article>
  );
}
