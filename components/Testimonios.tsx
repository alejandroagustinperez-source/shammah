export default function Testimonios() {
  const testimonios = [
    {
      nombre: "Sofi M.",
      texto: "Los baberos son hermosos, mi bebé los usa todos los días 💕",
      estrellas: 5,
    },
    {
      nombre: "Caro R.",
      texto: "Compré el set recién nacido y quedé enamorada de la calidad ✨",
      estrellas: 5,
    },
    {
      nombre: "Vale G.",
      texto: "Super recomendable, llegaron rápido y muy bien empaquetados 🌈",
      estrellas: 5,
    },
  ];

  return (
    <section className="bg-[#fdfaf7] py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-2xl text-[#9b8bb4] text-center mb-8">
          Lo que dicen nuestras mamás
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonios.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl shadow-sm border border-[#f0ecf8] p-6 text-center"
            >
              <div className="text-yellow-400 text-lg mb-2">
                {"⭐".repeat(t.estrellas)}
              </div>
              <p className="text-[#4a4a4a] text-sm mb-4 leading-relaxed">
                &ldquo;{t.texto}&rdquo;
              </p>
              <p className="font-bold text-[#9b8bb4] text-sm">{t.nombre}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
