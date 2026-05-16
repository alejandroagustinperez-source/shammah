import { getWhatsAppUrl } from "@/data/products";

export default function Footer() {
  return (
    <footer className="bg-[#f0ecf8] py-10 px-4 text-center">
      <div className="max-w-5xl mx-auto">
        <p className="font-display text-2xl text-[#9b8bb4] mb-2">Shammah Bebé</p>
        <p className="text-[#b0a0c0] text-sm mb-4">
          Todo lo que tu bebé necesita, con amor 🌈
        </p>
        
          <a
          href={getWhatsAppUrl("Hola Shammah Bebé!")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#25d366] font-semibold hover:underline"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.857L.057 23.882a.5.5 0 0 0 .61.61l6.025-1.477A11.955 11.955 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.694-.513-5.228-1.407l-.374-.222-3.88.952.972-3.878-.234-.384A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
          </svg>
          +54 9 266 400-3795
        </a>
        <p className="text-[#c8b8d8] text-xs mt-6">
          © {new Date().getFullYear()} Shammah Bebé · Hecho con amor 💜
        </p>
      </div>
    </footer>
  );
}
