import { getWhatsAppUrl } from "@/data/products";
import IconoWhatsApp from "./IconoWhatsApp";

export default function WhatsAppFloat() {
  const url = getWhatsAppUrl("Hola Shammah Bebé! Quiero consultar sobre sus productos.");
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 w-14 h-14 flex items-center justify-center bg-[#25d366] hover:bg-[#1ebe5d] text-white rounded-full shadow-lg transition-colors"
      aria-label="Escribir por WhatsApp"
    >
      <IconoWhatsApp size={28} />
    </a>
  );
}
