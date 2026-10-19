import Image from "next/image";
import { categories, products } from "@/data/products";

const fotos: Record<string, string> = {
  baberos: "/images/babero-animalitos-azul.png",
  babitas: "/images/babita-pintitas-celeste.png",
  portachupetes: "/images/portachupete-animalitos-azul.png",
  mantas: "/images/manta-conejos-blanca.png",
  muneco: "/images/peluche-unicornio.png",
};

export default function Categorias() {
  return (
    <section className="px-5 pb-20 md:pb-24">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <h2 className="font-titulo font-semibold text-ciruela text-[32px] md:text-[42px] leading-tight">
          Elegí por categoría
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {categories.map((cat) => {
            const precios = products.filter((p) => p.category === cat.id).map((p) => p.currentPrice);
            const desde = precios.length ? Math.min(...precios) : null;
            return (
              <a key={cat.id} href={`#${cat.id}`} className="group flex flex-col gap-2.5">
                <div className="relative aspect-square rounded-3xl overflow-hidden bg-durazno-suave">
                  <Image
                    src={fotos[cat.id]}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div aria-hidden="true" className="absolute inset-2.5 rounded-2xl border-2 border-dashed border-lino/90" />
                </div>
                <span className="font-titulo text-xl md:text-[22px] font-semibold text-ciruela">{cat.label}</span>
                {desde !== null && (
                  <span className="text-[15px] text-gris-calido -mt-1">Desde ${desde.toLocaleString("es-AR")}</span>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
