"use client";
import { useState, useMemo } from "react";
import { products, categories, getWhatsAppUrl } from "@/data/products";

export default function ComboPage() {
  const [selected, setSelected] = useState<Record<string, number>>({});

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = 1;
      }
      return next;
    });
  };

  const updateQty = (id: string, delta: number) => {
    setSelected((prev) => {
      const next = { ...prev };
      const current = next[id] || 0;
      if (delta > 0) {
        const p = products.find((pr) => pr.id === id);
        if (p?.category === "muneco" && current >= 1) return prev;
      }
      const qty = current + delta;
      if (qty <= 0) {
        delete next[id];
      } else {
        next[id] = qty;
      }
      return next;
    });
  };

  const total = useMemo(
    () =>
      Object.entries(selected).reduce((sum, [id, qty]) => {
        const p = products.find((pr) => pr.id === id);
        return sum + (p ? p.currentPrice * qty : 0);
      }, 0),
    [selected]
  );

  const whatsappMessage = useMemo(() => {
    const lines = Object.entries(selected)
      .map(([id, qty]) => {
        const p = products.find((pr) => pr.id === id);
        return p ? `- ${p.name} x${qty} = $${(p.currentPrice * qty).toLocaleString("es-AR")}` : "";
      })
      .filter(Boolean);
    return `Hola Shammah Bebe! Quiero armar este combo:\n\n${lines.join("\n")}\n\nTotal: $${total.toLocaleString("es-AR")}\n\nEstan disponibles?`;
  }, [selected, total]);

  const selectedCount = Object.values(selected).reduce((a, b) => a + b, 0);

  return (
    <main className="min-h-screen bg-[#fdfaf7]">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="font-display text-3xl text-[#9b8bb4] text-center mb-2">
          Armá tu combo 🎁
        </h1>
        <p className="text-center text-[#7a7a7a] text-sm mb-8">
          Elegí los productos que quieras y armá tu combo personalizado
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-8">
            {categories.map((cat) => {
              const filtered = products.filter((p) => p.category === cat.id);
              if (filtered.length === 0) return null;
              return (
                <div key={cat.id}>
                  <h2 className="font-display text-xl text-[#9b8bb4] mb-3 flex items-center gap-2">
                    <span>{cat.emoji}</span> {cat.label}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {filtered.map((p) => {
                      const qty = selected[p.id] || 0;
                      const isMuneco = p.category === "muneco";
                      return (
                        <div
                          key={p.id}
                          className={`bg-white rounded-2xl border p-3 text-center transition-all ${
                            qty > 0
                              ? "border-[#9b8bb4] shadow-md"
                              : "border-[#f0ecf8] hover:shadow-sm"
                          }`}
                        >
                          <div className="w-full aspect-square bg-[#faf8ff] rounded-xl flex items-center justify-center text-4xl mb-2 overflow-hidden">
                            {p.images[0] && p.images[0] !== "/images/placeholder.jpg" ? (
                              <img
                                src={p.images[0]}
                                alt={p.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span>{cat.emoji}</span>
                            )}
                          </div>
                          <p className="font-bold text-sm text-[#4a4a4a] mb-1">{p.name}</p>
                          <p className="text-xs text-[#9a9a9a] mb-2 line-clamp-2">{p.description}</p>
                          <p className="text-sm font-black text-[#2eab6b] mb-2">
                            ${p.currentPrice.toLocaleString("es-AR")}
                          </p>
                          {qty > 0 ? (
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => updateQty(p.id, -1)}
                                className="w-7 h-7 rounded-full bg-[#f0ecf8] text-[#9b8bb4] font-bold hover:bg-[#d4b8e0] transition-colors"
                              >
                                −
                              </button>
                              <span className="font-bold text-[#4a4a4a] text-sm min-w-[1rem]">
                                {qty}
                              </span>
                              <button
                                onClick={() => updateQty(p.id, 1)}
                                disabled={isMuneco && qty >= 1}
                                className={`w-7 h-7 rounded-full font-bold transition-colors ${
                                  isMuneco && qty >= 1
                                    ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                                    : "bg-[#d4b8e0] text-white hover:bg-[#b89ac8]"
                                }`}
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => toggle(p.id)}
                              className="w-full py-1.5 rounded-full bg-[#f0ecf8] text-[#7b5ea7] font-semibold text-xs hover:bg-[#d4b8e0] transition-colors"
                            >
                              + Agregar
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:w-80">
            <div className="bg-white rounded-3xl border border-[#f0ecf8] p-5 shadow-sm lg:sticky lg:top-24">
              <h3 className="font-bold text-[#4a4a4a] text-lg mb-1">
                Tu combo 🛒
              </h3>
              <p className="text-xs text-[#9a9a9a] mb-4">
                {selectedCount > 0
                  ? `${selectedCount} producto${selectedCount !== 1 ? "s" : ""} seleccionado${selectedCount !== 1 ? "s" : ""}`
                  : "No hay productos seleccionados"}
              </p>

              {selectedCount > 0 && (
                <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                  {Object.entries(selected).map(([id, qty]) => {
                    const p = products.find((pr) => pr.id === id);
                    if (!p) return null;
                    return (
                      <div
                        key={id}
                        className="flex items-center justify-between text-sm py-1 border-b border-[#f0ecf8] last:border-0"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-[#4a4a4a] truncate">
                            {p.name}
                          </p>
                          <p className="text-xs text-[#9a9a9a]">
                            ${p.currentPrice.toLocaleString("es-AR")} c/u
                          </p>
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          <button
                            onClick={() => updateQty(p.id, -1)}
                            className="w-5 h-5 rounded-full bg-[#f0ecf8] text-[#9b8bb4] text-xs font-bold hover:bg-[#d4b8e0]"
                          >
                            −
                          </button>
                          <span className="font-bold text-xs min-w-[1rem] text-center">
                            {qty}
                          </span>
                          <button
                            onClick={() => updateQty(p.id, 1)}
                            className="w-5 h-5 rounded-full bg-[#d4b8e0] text-white text-xs font-bold hover:bg-[#b89ac8]"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex items-center justify-between mb-4 pt-2 border-t border-[#f0ecf8]">
                <span className="font-bold text-[#4a4a4a]">Total</span>
                <span className="text-xl font-black text-[#2eab6b]">
                  ${total.toLocaleString("es-AR")}
                </span>
              </div>

              <a
                href={getWhatsAppUrl(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 w-full bg-[#25d366] hover:bg-[#1ebe5d] text-white font-bold py-3 px-4 rounded-full transition-all hover:scale-105 text-sm ${
                  selectedCount === 0 ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.857L.057 23.882a.5.5 0 0 0 .61.61l6.025-1.477A11.955 11.955 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.694-.513-5.228-1.407l-.374-.222-3.88.952.972-3.878-.234-.384A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                Pedir combo por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
