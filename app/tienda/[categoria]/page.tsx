import { notFound } from "next/navigation";
import Link from "next/link";
import MLProductCard from "@/components/MLProductCard";
import { mlProductsMap, mlCategoryLabels } from "@/data/mlProducts";

function getRandomCategories(exclude: string, count: number) {
  const keys = Object.keys(mlCategoryLabels).filter((k) => k !== exclude);
  const shuffled = keys.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = await params;
  const info = mlCategoryLabels[categoria];
  const products = mlProductsMap[categoria];

  if (!info || !products) {
    notFound();
  }

  const relatedCategories = getRandomCategories(categoria, 4);

  return (
    <div className="min-h-screen bg-[#fdfaf7]">
      <div className="bg-[#3d2c4e] py-3 px-4 flex items-center justify-between">
        <Link
          href="/tienda"
          className="text-[#c9b8e8] hover:text-white text-xs sm:text-sm font-semibold transition-colors"
        >
          ← Tienda
        </Link>
        <div className="flex items-baseline gap-0.5">
          <span className="font-black text-white tracking-widest text-sm uppercase">Shammah</span>
          <span className="font-bold text-[#f472b6] text-sm" style={{ fontStyle: "italic" }}>Bebé</span>
        </div>
        <a
          href="https://wa.me/5492664003795"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[#25D366] hover:text-[#1ebe5d] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.857L.057 23.882a.5.5 0 0 0 .61.61l6.025-1.477A11.955 11.955 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.694-.513-5.228-1.407l-.374-.222-3.88.952.972-3.878-.234-.384A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          <span className="text-xs font-bold">Consultar</span>
        </a>
      </div>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <nav className="mb-6 text-sm text-[#9b8bb4]">
          <Link href="/" className="hover:text-[#7b5ea7] transition-colors">
            Inicio
          </Link>
          <span className="mx-2">/</span>
          <Link href="/tienda" className="hover:text-[#7b5ea7] transition-colors">
            Tienda
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#3d2c4e] font-semibold">{info.label}</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-black text-[#3d2c4e] mb-8">
          {info.emoji} {info.label}
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {products.map((product, i) => (
            <MLProductCard key={i} product={product} />
          ))}
        </div>

        <section className="mt-12 sm:mt-16">
          <h2 className="font-bold text-[#3d2c4e] text-lg mb-4">
            ¿Por qué comprar en Mercado Libre?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white rounded-xl border border-[#ede8f5] p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#f5f0ff] flex items-center justify-center text-lg shrink-0">
                🚚
              </div>
              <div>
                <p className="font-bold text-[#3d2c4e] text-sm">Envío gratis</p>
                <p className="text-[#9b8bb4] text-xs">En miles de productos a todo el país</p>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-[#ede8f5] p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#f5f0ff] flex items-center justify-center text-lg shrink-0">
                💳
              </div>
              <div>
                <p className="font-bold text-[#3d2c4e] text-sm">Hasta 12 cuotas sin interés</p>
                <p className="text-[#9b8bb4] text-xs">Con todas las tarjetas de crédito</p>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-[#ede8f5] p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#f5f0ff] flex items-center justify-center text-lg shrink-0">
                🛡️
              </div>
              <div>
                <p className="font-bold text-[#3d2c4e] text-sm">Compra protegida</p>
                <p className="text-[#9b8bb4] text-xs">Si no llega, te devolvemos el dinero</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 sm:mt-16">
          <h2 className="text-xl sm:text-2xl font-black text-[#3d2c4e] mb-6">
            También te puede interesar
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {relatedCategories.map((id) => {
              const cat = mlCategoryLabels[id];
              return (
                <Link
                  key={id}
                  href={`/tienda/${id}`}
                  className="bg-white rounded-xl border border-[#ede8f5] overflow-hidden hover:border-[#3d2c4e] hover:-translate-y-1 transition-all group"
                >
                  <div className="h-20 bg-[#f5f0ff] flex items-center justify-center text-4xl">
                    {cat.emoji}
                  </div>
                  <div className="p-3">
                    <p className="font-bold text-[#3d2c4e] text-sm">{cat.label}</p>
                    <p className="text-xs text-[#9b8bb4] mt-0.5">Ver productos →</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <div className="flex justify-center mt-10 sm:mt-12">
          <Link
            href="/tienda"
            className="inline-flex items-center justify-center bg-[#3d2c4e] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#5a3d70] transition-all text-sm sm:text-base"
          >
            Ver todas las categorías
          </Link>
        </div>
      </div>
    </div>
  );
}
