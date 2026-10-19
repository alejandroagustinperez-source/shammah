import { products, categories } from "@/data/products";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  return (
    <section id="productos" className="px-5 py-20 md:py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-14">
        <h2 className="font-titulo font-semibold text-ciruela text-[32px] md:text-[42px] leading-tight">
          Nuestros productos
        </h2>
        {categories.map((cat) => {
          const filtered = products.filter((p) => p.category === cat.id);
          if (filtered.length === 0) return null;
          return (
            <div key={cat.id} id={cat.id} className="scroll-mt-24 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <h3 className="font-titulo font-semibold text-ciruela text-2xl md:text-[28px]">{cat.label}</h3>
                <div aria-hidden="true" className="flex-1 border-t-2 border-dashed border-costura" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
