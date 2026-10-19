import Link from "next/link";
import { bundles, getWhatsAppUrl } from "@/data/products";

export default function BundleSection() {
  return (
    <section id="conjuntos" className="bg-durazno-suave px-5 py-20 md:py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-9">
        <div className="flex flex-col gap-2">
          <h2 className="font-titulo font-semibold text-ciruela text-[32px] md:text-[42px] leading-tight">
            Conjuntos para regalar
          </h2>
          <p className="text-gris-calido text-[17px]">Listos para un baby shower o para recibir al bebé.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {bundles.map((bundle) => (
            <div
              key={bundle.id}
              className="bg-lino rounded-[28px] p-7 md:p-8 border-2 border-dashed border-costura flex flex-col gap-4"
            >
              <h3 className="font-titulo text-[26px] font-semibold text-ciruela">{bundle.name}</h3>
              <p className="text-gris-calido">{bundle.description}</p>
              <ul className="list-disc pl-5 flex flex-col gap-1 text-hilo">
                {bundle.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="mt-auto pt-2 flex flex-wrap items-center justify-between gap-4">
                <span className="text-[28px] font-bold text-hilo">${bundle.currentPrice.toLocaleString("es-AR")}</span>
                <a
                  href={getWhatsAppUrl(`Hola Shammah Bebé! Me interesa el ${bundle.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[50px] px-6 rounded-full bg-ciruela text-lino font-bold hover:bg-ciruela-claro transition-colors"
                >
                  Pedir este conjunto
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-ciruela text-lino rounded-[28px] p-7 md:p-8 flex flex-wrap items-center justify-between gap-5">
          <div className="flex-[1_1_340px] min-w-0 flex flex-col gap-1.5">
            <h3 className="font-titulo text-[26px] font-semibold">Armá tu propio combo</h3>
            <p className="text-niebla">
              Elegí los productos y las cantidades, mirá el total al instante y mandanos el pedido por WhatsApp.
            </p>
          </div>
          <Link
            href="/combo"
            className="inline-flex items-center min-h-[52px] px-7 rounded-full bg-frambuesa hover:bg-frambuesa-oscuro text-white font-bold transition-colors"
          >
            Armar mi combo
          </Link>
        </div>
      </div>
    </section>
  );
}
