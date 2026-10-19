import Image from "next/image";
import { getWhatsAppUrl } from "@/data/products";
import IconoWhatsApp from "./IconoWhatsApp";

export default function Hero() {
  return (
    <section className="px-5 pt-12 pb-20 md:pt-16 md:pb-24">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-12 lg:gap-14">
        <div className="flex-[1_1_420px] min-w-0 flex flex-col gap-6">
          <h1 className="font-titulo font-semibold text-ciruela leading-[1.08] text-[40px] sm:text-5xl lg:text-[60px]">
            Hecho a mano en San Luis, puntada por puntada.
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-gris-calido max-w-[30em]">
            Baberos, babitas, mantas y muñecos de tela cosidos uno por uno, con telas 100% algodón suaves para la piel de tu bebé.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#productos"
              className="inline-flex items-center min-h-[54px] px-8 rounded-full bg-frambuesa hover:bg-frambuesa-oscuro text-white font-bold text-[17px] transition-colors"
            >
              Ver productos
            </a>
            <a
              href={getWhatsAppUrl("Hola Shammah Bebé! Quiero hacer una consulta.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-[54px] px-7 rounded-full border-2 border-ciruela text-ciruela font-bold text-[17px] hover:bg-ciruela hover:text-lino transition-colors"
            >
              <IconoWhatsApp />
              Consultar por WhatsApp
            </a>
          </div>
        </div>

        <div className="flex-[1_1_400px] min-w-0 relative aspect-[5/4] rounded-[32px] overflow-hidden bg-durazno-suave">
          <Image
            src="/images/peluche-caballito.png"
            alt="Caballito de tela hecho a mano"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 560px"
            className="object-cover object-[center_40%]"
          />
          <div aria-hidden="true" className="absolute inset-3.5 rounded-[22px] border-2 border-dashed border-lino/90" />
        </div>
      </div>
    </section>
  );
}
