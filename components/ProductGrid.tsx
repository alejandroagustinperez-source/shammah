import { products, categories } from "@/data/products";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      {categories.map((cat) => {
        const filtered = products.filter((p) => p.category === cat.id);
        if (filtered.length === 0) return null;
        return (
          <div key={cat.id} id={cat.id} className="mb-14 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{cat.emoji}</span>
              <h2 className="font-display text-2xl text-[#9b8bb4]">{cat.label}</h2>
              <div className="flex-1 h-px bg-[#ede0f5]" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
