"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import MLProductCard, { MLProduct } from "@/components/MLProductCard";
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
  { id: "manta-sensorial", label: "Manta sensorial", emoji: "🎨", type: "ml" },
  { id: "aspirador", label: "Aspirador nasal", emoji: "💨", type: "ml" },
  { id: "silla-comer", label: "Silla de comer", emoji: "🍽️", type: "ml" },
  { id: "camara", label: "Cámara", emoji: "📷", type: "ml" },
  { id: "piso", label: "Piso encastrable", emoji: "🧩", type: "ml" },
];

const mlProductsMap: Record<string, MLProduct[]> = {
  cunas: [
    {
      name: "Cuna Colecho Con Colchon Baranda Desmontable Escritorio 5en1 Blanco",
      price: 178186,
      originalPrice: 217300,
      discount: "18% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_795214-MLA96242570891_102025-F.webp",
      href: "https://meli.la/1HDPjJC",
      installments: "6 cuotas de $39.557",
    },
    {
      name: "Cuna De Bebé Estrella Mega Baby De Madera Eléctrica Mecedora Color Grey",
      price: 199471,
      originalPrice: 219199,
      discount: "9% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_870504-MLA99504562938_112025-F.webp",
      href: "https://meli.la/1YFWoab",
      installments: "6 cuotas de $44.282",
    },
    {
      name: "Cuna Colecho Convertible 6en1 | Incluye Colchón - 100x50 Cm Blanco",
      price: 191905,
      originalPrice: 230205,
      discount: "16% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_669731-MLA95625301714_102025-F.webp",
      href: "https://meli.la/2LU8B6m",
      installments: "6 cuotas de $31.984",
    },
    {
      name: "Cuna Con Colchon Ruedas Con Freno Colecho Escritorio 5 En 1 Blanco",
      price: 193356,
      originalPrice: 235800,
      discount: "18% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_924820-MLA109857297762_042026-F.webp",
      href: "https://meli.la/1yYQHrx",
      installments: "6 cuotas de $42.925",
    },
  ],
  "silla-auto": [
    {
      name: "Butaca Silla Para Auto Bebé Avanti Homologada 0-25 Kgs Color Plateado",
      price: 129097,
      originalPrice: 220339,
      discount: "41% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_664026-MLA84555801344_052025-F.webp",
      href: "https://meli.la/2v7JSKc",
      installments: "6 cuotas de $28.659",
    },
    {
      name: "Butaca Auto Bebé Last Ayrton Mega Baby Convertible 0-25 Kg",
      price: 132511,
      originalPrice: 155896,
      discount: "15% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_820679-MLA108877259217_032026-F.webp",
      href: "https://meli.la/2JyaEjZ",
      installments: "6 cuotas de $29.417",
    },
    {
      name: "Butaca Booster Auto Bebé Mega Baby Daytona I-size 9 A 36 Kg Color Gris",
      price: 121579,
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_993247-MLA111275265241_052026-F.webp",
      href: "https://meli.la/2aBa7aN",
      installments: "6 cuotas de $26.990",
    },
    {
      name: "Booster Auto Bebe Mega Baby Silverstone 3 En 1 De 9 A 36 Kg Color Negro",
      price: 94502,
      originalPrice: 111179,
      discount: "15% OFF",
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_907210-MLA109740334113_032026-F.webp",
      href: "https://meli.la/1zcXW65",
      installments: "6 cuotas de $20.979",
    },
    {
      name: "Butaca Booster Elevador Mega Baby Silverstone Gris De 9-6 Kg",
      price: 111179,
      badge: "Más vendido",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_708726-MLA108034619534_032026-F.webp",
      href: "https://meli.la/2YXSr4F",
      installments: "6 cuotas de $24.681",
    },
  ],
  cochecito: [
    { name: "Cochecito de Paseo Reclinable", price: 55000, href: "#", image: "https://placehold.co/300x300/e2d8f0/9b8bb4?text=Cochecito" },
    { name: "Cochecito Travel System", price: 72000, href: "#", image: "https://placehold.co/300x300/e2d8f0/9b8bb4?text=Travel+System" },
  ],
  paniales: [
    { name: "Pañales Premium X80", price: 8500, href: "#", image: "https://placehold.co/300x300/e2d8f0/9b8bb4?text=Pañales" },
    { name: "Pañales Ecológicos X60", price: 10200, href: "#", image: "https://placehold.co/300x300/e2d8f0/9b8bb4?text=Pañales+Eco", badge: "Más vendido" },
  ],
  chupetes: [
    { name: "Chupete Silicona 0-6m", price: 2500, href: "#", image: "https://placehold.co/300x300/e2d8f0/9b8bb4?text=Chupete" },
    { name: "Chupete Ortopédico Noche", price: 3200, href: "#", image: "https://placehold.co/300x300/e2d8f0/9b8bb4?text=Chupete+Ortho" },
  ],
  biberon: [
    { name: "Biberón Anti-cólicos 240ml", price: 4800, href: "#", image: "https://placehold.co/300x300/e2d8f0/9b8bb4?text=Biberon" },
    { name: "Biberón de Vidrio 150ml", price: 3600, href: "#", image: "https://placehold.co/300x300/e2d8f0/9b8bb4?text=Biberon+Vidrio", badge: "Más vendido" },
  ],
  "saca-leche": [
    { name: "Saca Leche Eléctrico Doble", price: 38000, href: "#", image: "https://placehold.co/300x300/e2d8f0/9b8bb4?text=Saca+Leche" },
    { name: "Saca Leche Manual", price: 12500, href: "#", image: "https://placehold.co/300x300/e2d8f0/9b8bb4?text=Saca+Leche+Manual" },
  ],
  banadera: [
    { name: "Bañadera Plegable con Termómetro", price: 15000, href: "#", image: "https://placehold.co/300x300/e2d8f0/9b8bb4?text=Bañadera" },
    { name: "Bañadera Anatómica Bebé", price: 11200, href: "#", image: "https://placehold.co/300x300/e2d8f0/9b8bb4?text=Bañadera+Anatomica" },
  ],
  jabon: [
    { name: "Jabón pH Neutro Bebé 500ml", price: 3800, href: "#", image: "https://placehold.co/300x300/e2d8f0/9b8bb4?text=Jabon+Bebe" },
    { name: "Set Regalo Jabón + Crema", price: 5800, href: "#", image: "https://placehold.co/300x300/e2d8f0/9b8bb4?text=Set+Jabon", badge: "Más vendido" },
  ],
  mochila: [
    { name: "Mochila Maternal Tipo Bandolera", price: 18000, href: "#", image: "https://placehold.co/300x300/e2d8f0/9b8bb4?text=Mochila" },
    { name: "Mochila Maternal con Cambiador", price: 22500, href: "#", image: "https://placehold.co/300x300/e2d8f0/9b8bb4?text=Mochila+Cambiador" },
  ],
  corralito: [
    { name: "Corralito de Madera Plegable", price: 48000, href: "#", image: "https://placehold.co/300x300/e2d8f0/9b8bb4?text=Corralito" },
    { name: "Corralito de Tela con Mosquitero", price: 28000, href: "#", image: "https://placehold.co/300x300/e2d8f0/9b8bb4?text=Corralito+Tela", badge: "Más vendido" },
  ],
  "silla-mecedora": [
    { name: "Silla Mecedora Eléctrica", price: 35000, href: "#", image: "https://placehold.co/300x300/e2d8f0/9b8bb4?text=Mecedora" },
    { name: "Silla Mecedora Manual con Juguetes", price: 18500, href: "#", image: "https://placehold.co/300x300/e2d8f0/9b8bb4?text=Mecedora+Manual" },
  ],
  oleo: [
    { name: "Óleo Calcáreo Crema X50g", price: 4200, href: "#", image: "https://placehold.co/300x300/e2d8f0/9b8bb4?text=Oleo+Calcareo" },
    { name: "Óleo Calcáreo Aceite 100ml", price: 3500, href: "#", image: "https://placehold.co/300x300/e2d8f0/9b8bb4?text=Oleo+Aceite" },
  ],
  "manta-caminadora": [
    { name: "Manta Caminadora Antideslizante", price: 12500, href: "#", image: "https://placehold.co/300x300/e2d8f0/9b8bb4?text=Manta+Caminadora" },
    { name: "Manta Caminadora con Arco Musical", price: 16500, href: "#", image: "https://placehold.co/300x300/e2d8f0/9b8bb4?text=Manta+Musical", badge: "Más vendido" },
  ],
  "manta-sensorial": [
    { name: "Manta Sensorial Texturas", price: 9800, href: "#", image: "https://placehold.co/300x300/e2d8f0/9b8bb4?text=Manta+Sensorial" },
    { name: "Manta Sensorial Plegable con Sonidos", price: 13200, href: "#", image: "https://placehold.co/300x300/e2d8f0/9b8bb4?text=Manta+Sensorial+2" },
  ],
  aspirador: [
    { name: "Aspirador Nasal Eléctrico", price: 8500, href: "#", image: "https://placehold.co/300x300/e2d8f0/9b8bb4?text=Aspirador" },
    { name: "Aspirador Nasal Manual Perilla", price: 2800, href: "#", image: "https://placehold.co/300x300/e2d8f0/9b8bb4?text=Aspirador+Manual" },
  ],
  "silla-comer": [
    { name: "Silla de Comer Plegable", price: 24000, href: "#", image: "https://placehold.co/300x300/e2d8f0/9b8bb4?text=Silla+Comer" },
    { name: "Silla de Comer de Madera", price: 32000, href: "#", image: "https://placehold.co/300x300/e2d8f0/9b8bb4?text=Silla+Madera", badge: "Más vendido" },
  ],
  camara: [
    { name: "Cámara de Vigilancia WiFi Bebé", price: 22000, href: "#", image: "https://placehold.co/300x300/e2d8f0/9b8bb4?text=Camara" },
    { name: "Cámara de Vigilancia con Sensor", price: 29000, href: "#", image: "https://placehold.co/300x300/e2d8f0/9b8bb4?text=Camara+Sensor" },
  ],
  piso: [
    { name: "Piso Encastrable 60x60 6uds", price: 18000, href: "#", image: "https://placehold.co/300x300/e2d8f0/9b8bb4?text=Piso" },
    { name: "Piso Encastrable de Letras", price: 14500, href: "#", image: "https://placehold.co/300x300/e2d8f0/9b8bb4?text=Piso+Letras", badge: "Más vendido" },
  ],
};

export default function TiendaPage() {
  const [activeCategory, setActiveCategory] = useState("baberos");

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

  const scrollToCategory = (id: string) => {
    const el = document.querySelector(`[data-category-id="${id}"]`);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#fdfaf7]">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-[#9b8bb4] hover:text-[#7b5ea7] text-sm font-semibold transition-colors"
        >
          ← Volver al inicio
        </Link>
        <h1 className="font-display text-2xl text-[#9b8bb4]">Tienda</h1>
        <div className="w-28" />
      </div>

      <div className="max-w-7xl mx-auto lg:flex lg:gap-6 px-4">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <nav className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto space-y-0.5 scrollbar-hide">
            <div className="text-xs font-bold uppercase tracking-wider text-[#b8a8cc] mb-3 pl-3">
              Categorías
            </div>
            {allCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? "bg-[#d4b8e0] text-white shadow-sm"
                    : "text-[#7b5ea7] hover:bg-[#f0ecf8]"
                }`}
              >
                <span className="flex-shrink-0">{cat.emoji}</span>
                <span className="truncate">{cat.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile nav */}
        <nav className="lg:hidden -mx-4 px-4 sticky top-0 z-10 bg-[#fdfaf7]/90 backdrop-blur border-b border-[#e8e0f0] py-3 mb-6 overflow-x-auto">
          <div className="flex gap-2 scrollbar-hide">
            {allCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full whitespace-nowrap text-sm font-semibold transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#d4b8e0] text-white shadow-sm"
                    : "bg-[#f0ecf8] text-[#7b5ea7] hover:bg-[#e0d4ec]"
                }`}
              >
                <span>{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </nav>

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
                  data-category-id={cat.id}
                  className="mb-14 scroll-mt-24"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">{cat.emoji}</span>
                    <h2 className="font-display text-2xl text-[#9b8bb4]">
                      {cat.label}
                    </h2>
                    <div className="flex-1 h-px bg-[#ede0f5]" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {filtered.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                </section>
              );
            })}

          {/* ML sections */}
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🛒</span>
              <h2 className="font-display text-2xl text-[#9b8bb4]">
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
                  data-category-id={cat.id}
                  className="mb-14 scroll-mt-24"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">{cat.emoji}</span>
                    <h2 className="font-display text-2xl text-[#9b8bb4]">
                      {cat.label}
                    </h2>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#9b8bb4] px-2 py-0.5 rounded-full">
                      ML
                    </span>
                    <div className="flex-1 h-px bg-[#ede0f5]" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
