import Image from "next/image";

export default function HechoAMano() {
  return (
    <section className="bg-ciruela text-lino px-5 py-20 md:py-24">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-12 lg:gap-14">
        <div className="flex-[1_1_360px] min-w-0 relative aspect-[4/3] rounded-[28px] overflow-hidden bg-ciruela-claro">
          <Image
            src="/images/peluche-ale.png"
            alt="Muñeco de tela artesanal"
            fill
            sizes="(max-width: 1024px) 100vw, 520px"
            className="object-cover object-[center_30%]"
          />
          <div aria-hidden="true" className="absolute inset-3.5 rounded-[18px] border-2 border-dashed border-lino/90" />
        </div>
        <div className="flex-[1_1_400px] min-w-0 flex flex-col gap-5">
          <h2 className="font-titulo font-semibold text-[32px] md:text-[42px] leading-tight">
            Cada pieza pasa por nuestras manos
          </h2>
          <p className="text-lg leading-relaxed text-niebla max-w-[32em]">
            Cortamos, cosemos y terminamos cada producto a mano en San Luis. Elegimos telas 100% algodón porque van a estar en contacto con la piel del bebé todo el día.
          </p>
          <p className="text-lg leading-relaxed text-niebla max-w-[32em]">
            Los muñecos de tela son piezas únicas: cuando uno se vende, no vuelve a haber otro igual.
          </p>
        </div>
      </div>
    </section>
  );
}
