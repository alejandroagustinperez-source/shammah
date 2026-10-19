const pasos = [
  {
    titulo: "Elegí tus productos",
    texto: "Mirá los colores y estampados disponibles en cada producto.",
  },
  {
    titulo: "Escribinos por WhatsApp",
    texto: "Te confirmamos la disponibilidad y coordinamos el envío a todo el país.",
  },
  {
    titulo: "Pagá como prefieras",
    texto: "Tarjeta de crédito o débito por Mercado Pago, transferencia bancaria o efectivo al recibir, según la zona.",
  },
];

export default function ComoComprar() {
  return (
    <section id="como-comprar" className="px-5 py-20 md:py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <h2 className="font-titulo font-semibold text-ciruela text-[32px] md:text-[42px] leading-tight">Cómo comprar</h2>
        <ol className="grid gap-9 md:grid-cols-3">
          {pasos.map((p, i) => (
            <li key={p.titulo} className="flex flex-col gap-2.5 pt-5 border-t-2 border-dashed border-costura">
              <span aria-hidden="true" className="font-titulo text-5xl leading-none text-frambuesa">
                {i + 1}
              </span>
              <h3 className="font-titulo text-[23px] font-semibold text-ciruela">{p.titulo}</h3>
              <p className="text-gris-calido leading-relaxed">{p.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
