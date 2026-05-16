export default function PorQueElegirnos() {
  const items = [
    {
      icon: "🧵",
      title: "Materiales de calidad",
      desc: "Telas 100% algodón, suaves y seguras para la piel del bebé",
    },
    {
      icon: "🤍",
      title: "Hecho con amor",
      desc: "Cada producto es elaborado artesanalmente con dedicación",
    },
    {
      icon: "🚚",
      title: "Envíos a todo el país",
      desc: "Despachamos rápido para que llegue cuando lo necesitás",
    },
    {
      icon: "💬",
      title: "Atención personalizada",
      desc: "Te asesoramos por WhatsApp para encontrar el producto ideal",
    },
  ];

  return (
    <section className="bg-[#fdf0eb] py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-2xl text-[#c0614a] text-center mb-8">
          ¿Por qué elegirnos?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl shadow-sm border border-[#ffb6a3] p-6 text-center hover:shadow-md transition-all"
            >
              <span className="text-4xl block mb-3">{item.icon}</span>
              <h3 className="font-bold text-[#c0614a] text-sm mb-1">{item.title}</h3>
              <p className="text-[#7a7a7a] text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
