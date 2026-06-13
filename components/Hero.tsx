export default function Hero() {
  return (
    <section className="relative h-[600px] flex items-center overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1600&q=80"
        alt="Bebé feliz"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-[#3d2c4e]/55" />
      <div className="relative z-10 max-w-3xl mx-auto px-8 text-center">
        <img
          src="/images/logo.png"
          alt="Shammah Bebé"
          className="w-56 h-56 object-contain mx-auto -mb-4"
        />
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
          Todo lo que tu bebé<br />
          <span className="text-[#f472b6]">necesita, con amor</span>
        </h1>
        <p className="text-white/80 text-lg mb-8">
          Baberos, muñecos y mantitas hechos a mano desde San Luis
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://wa.me/5492664003795"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#3d2c4e] font-black px-8 py-4 rounded-full text-base hover:bg-[#f5f0ff] transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            </svg>
            Consultar por WhatsApp
          </a>
          <a
            href="/tienda"
            className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white font-black px-8 py-4 rounded-full text-base hover:bg-white/20 transition-all"
          >
            Ver productos →
          </a>
        </div>
        <div className="mt-6 flex justify-center gap-6">
          <div className="text-center text-white">
            <div className="text-2xl font-black text-[#f472b6]">+500</div>
            <div className="text-xs text-white/70">Mamás felices</div>
          </div>
          <div className="w-px bg-white/30" />
          <div className="text-center text-white">
            <div className="text-2xl font-black text-[#f472b6]">★ 5.0</div>
            <div className="text-xs text-white/70">Calificación</div>
          </div>
          <div className="w-px bg-white/30" />
          <div className="text-center text-white">
            <div className="text-2xl font-black text-[#f472b6]">100%</div>
            <div className="text-xs text-white/70">Artesanal</div>
          </div>
        </div>
      </div>
    </section>
  );
}
