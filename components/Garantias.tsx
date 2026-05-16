export default function Garantias() {
  const items = [
    { icon: "🚚", text: "Envíos a todo el país" },
    { icon: "🔄", text: "Cambios y devoluciones" },
    { icon: "🔒", text: "Pago seguro" },
  ];

  return (
    <section className="bg-[#e8f7fb] py-10 px-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-3xl">{item.icon}</span>
            <span className="text-[#4a4a4a] font-semibold text-sm sm:text-base">
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
