import { bundles, getWhatsAppUrl } from "@/data/products";

export default function BundleSection() {
  return (
    <section id="conjuntos" className="bg-gradient-to-b from-[#fdf0eb] to-[#fdfaf7] py-14 px-4 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-3xl">🎁</span>
          <h2 className="font-display text-2xl text-[#c0614a]">Conjuntos Especiales</h2>
          <div className="flex-1 h-px bg-[#f5c8bb]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bundles.map((bundle) => {
            const discount = Math.round(
              ((bundle.originalPrice - bundle.currentPrice) / bundle.originalPrice) * 100
            );
            return (
              <div
                key={bundle.id}
                className="bg-white rounded-3xl border-2 border-[#ffb6a3] shadow-sm overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="bg-gradient-to-r from-[#fde8e2] to-[#ede0f5] px-6 py-5">
                  <div className="flex items-start justify-between">
                    <h3 className="font-extrabold text-xl text-[#c0614a]">{bundle.name}</h3>
                    <span className="badge-descuento">-{discount}%</span>
                  </div>
                  <p className="text-[#9a7a7a] text-sm mt-1">{bundle.description}</p>
                </div>
                <div className="px-6 py-4">
                  <p className="text-xs font-semibold text-[#b0b0b0] uppercase tracking-wide mb-2">
                    Incluye
                  </p>
                  <ul className="text-sm text-[#7a7a7a] space-y-1 mb-4">
                    {bundle.includes.map((item, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-[#25d366]">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="price-original text-sm">
                      ${bundle.originalPrice.toLocaleString("es-AR")}
                    </span>
                    <span className="text-2xl font-extrabold text-[#c0614a]">
                      ${bundle.currentPrice.toLocaleString("es-AR")}
                    </span>
                  </div>
                  
                    <a
                    href={getWhatsAppUrl(bundle.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-[#25d366] hover:bg-[#1ebe5d] text-white font-bold py-3 px-4 rounded-full transition-all hover:scale-105"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.857L.057 23.882a.5.5 0 0 0 .61.61l6.025-1.477A11.955 11.955 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.694-.513-5.228-1.407l-.374-.222-3.88.952.972-3.878-.234-.384A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                    </svg>
                    Pedir conjunto por WhatsApp
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
