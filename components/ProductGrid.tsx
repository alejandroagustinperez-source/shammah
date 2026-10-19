import { products, categories, Product } from "@/data/products";
import ProductCard from "./ProductCard";

type Grupo = { id: string; label: string; items: Product[] };

function Categoria({ grupo, columnas }: { grupo: Grupo; columnas: string }) {
  return (
    <div id={grupo.id} className="scroll-mt-24 flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <h3 className="font-titulo font-semibold text-ciruela text-2xl md:text-[28px]">{grupo.label}</h3>
        <div aria-hidden="true" className="flex-1 border-t-2 border-dashed border-costura" />
      </div>
      <div className={`grid ${columnas} gap-x-4 gap-y-8 md:gap-x-6`}>
        {grupo.items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default function ProductGrid() {
  const grupos: Grupo[] = categories
    .map((cat) => ({ id: cat.id, label: cat.label, items: products.filter((p) => p.category === cat.id) }))
    .filter((g) => g.items.length > 0);

  // Las categorías con pocos productos van de a dos por fila en pantallas grandes.
  const chicas = grupos.filter((g) => g.items.length <= 2);
  const grandes = grupos.filter((g) => g.items.length > 2);

  return (
    <section id="productos" className="px-5 py-20 md:py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-14">
        <h2 className="font-titulo font-semibold text-ciruela text-[32px] md:text-[42px] leading-tight">
          Nuestros productos
        </h2>
        <div className="grid gap-y-14 gap-x-10 lg:grid-cols-2">
          {chicas.map((g) => (
            <Categoria key={g.id} grupo={g} columnas="grid-cols-2" />
          ))}
        </div>
        {grandes.map((g) => (
          <Categoria key={g.id} grupo={g} columnas="grid-cols-2 md:grid-cols-3 lg:grid-cols-4" />
        ))}
      </div>
    </section>
  );
}
