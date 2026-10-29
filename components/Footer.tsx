import Link from "next/link";
import { getWhatsAppUrl } from "@/data/products";

export default function Footer() {
  return (
    <footer className="bg-ciruela text-[#d9c8de] px-5 pt-14 pb-24 md:pb-14">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="flex flex-col gap-2 max-w-[360px]">
            <span className="font-titulo text-[26px] font-semibold text-lino">
              Shammah <span className="italic text-[#f2b8c9]">bebé</span>
            </span>
            <span className="text-[15px]">Productos para bebé hechos a mano en San Luis, Argentina.</span>
          </div>
          <div className="flex flex-col gap-2 text-[15px]">
            <span className="font-bold text-lino">Contacto</span>
            <a
              href={getWhatsAppUrl("Hola Shammah Bebé!")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-niebla hover:text-white"
            >
              WhatsApp +54 9 266 400-3795
            </a>
          </div>
          <div className="flex flex-col gap-2 text-[15px]">
            <span className="font-bold text-lino">Tienda</span>
            <Link href="/#productos" className="text-niebla hover:text-white">Productos artesanales</Link>
            <Link href="/combo" className="text-niebla hover:text-white">Armá tu combo</Link>
            <Link href="/tienda" className="text-niebla hover:text-white">Más productos para bebé</Link>
          </div>
          <div className="flex flex-col gap-2 text-[15px]">
            <span className="font-bold text-lino">Envíos y pagos</span>
            <span>Envíos a todo el país</span>
            <span>Mercado Pago, transferencia o efectivo</span>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-3 text-sm text-[#b9a6c0] border-t border-white/10 pt-6">
          <p>&copy; {new Date().getFullYear()} Shammah Bebé.</p>
          <p>
            Sitio hecho por{" "}
            <a
              href="https://ap-cm.vercel.app/"
              target="_blank"
              rel="noopener"
              title="Diseño de páginas web en San Luis"
              className="text-niebla hover:text-white underline underline-offset-2"
            >
              AP Community Manager
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
