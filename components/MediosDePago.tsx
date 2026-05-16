export default function MediosDePago() {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="text-3xl">💳</span>
          <h2 className="font-display text-2xl text-[#9b8bb4]">Medios de Pago</h2>
          <div className="h-px w-16 bg-[#d4b8e0]" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-[#fdfaf7] rounded-2xl border border-[#f0ecf8] p-6 hover:shadow-md transition-all hover:-translate-y-1">
            <div className="w-14 h-14 rounded-full bg-[#d4b8e0]/20 flex items-center justify-center mx-auto mb-4 text-3xl">
              💳
            </div>
            <h3 className="font-bold text-[#4a4a4a] mb-2">Tarjeta de Crédito / Débito</h3>
            <p className="text-sm text-[#9a9a9a]">
              Vía <strong>Mercado Pago</strong>. Todos los medios habilitados.
            </p>
          </div>
          <div className="bg-[#fdfaf7] rounded-2xl border border-[#f0ecf8] p-6 hover:shadow-md transition-all hover:-translate-y-1">
            <div className="w-14 h-14 rounded-full bg-[#a8d8ea]/20 flex items-center justify-center mx-auto mb-4 text-3xl">
              🏦
            </div>
            <h3 className="font-bold text-[#4a4a4a] mb-2">Transferencia Bancaria</h3>
          </div>
          <div className="bg-[#fdfaf7] rounded-2xl border border-[#f0ecf8] p-6 hover:shadow-md transition-all hover:-translate-y-1">
            <div className="w-14 h-14 rounded-full bg-[#ffeaa7]/30 flex items-center justify-center mx-auto mb-4 text-3xl">
              💵
            </div>
            <h3 className="font-bold text-[#4a4a4a] mb-2">Efectivo</h3>
            <p className="text-sm text-[#9a9a9a]">
              Pagá en efectivo al recibir tu pedido. Consultá cobertura.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
