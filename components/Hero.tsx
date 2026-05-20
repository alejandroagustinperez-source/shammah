"use client";
import Image from "next/image";
import { getWhatsAppUrl } from "@/data/products";

export default function Hero() {
  const url = getWhatsAppUrl("Hola Shammah Bebé! Quiero ver sus productos 🌈");
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#e8f7fb] to-[#fdfaf7] py-16 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 text-center md:text-left">
          <div className="flex justify-center md:justify-start mb-4">
            <Image
              src="/logo.png"
              alt="Shammah Bebé"
              width={180}
              height={180}
              priority
              className="drop-shadow-md"
            />
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-[#6bbdd4] mb-3 leading-tight">
            Shammah Bebé
          </h1>
          <p className="text-xl text-[#9b8bb4] font-semibold mb-6">
            Todo lo que tu bebé necesita, con amor 🌈
          </p>
          <p className="text-[#7a7a7a] mb-4 text-lg max-w-md">
            Baberos, portachupetes, babitas, mantas y muñecos de tela
            artesanales. Hechos con amor para los momentos más especiales.
          </p>
          <p className="italic text-[#c0614a] mb-8 text-base">
            El regalo perfecto para el bebé más especial
          </p>
          
            <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25d366] hover:bg-[#1ebe5d] text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all hover:scale-105"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.857L.057 23.882a.5.5 0 0 0 .61.61l6.025-1.477A11.955 11.955 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.694-.513-5.228-1.407l-.374-.222-3.88.952.972-3.878-.234-.384A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            Consultar por WhatsApp
          </a>
          <div className="inline-block mt-5 bg-white/80 backdrop-blur rounded-full px-5 py-2 shadow-sm">
            <span className="font-bold text-[#9b8bb4] text-sm">
              ⭐ Más de 100 mamás ya eligieron Shammah Bebé
            </span>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="grid grid-cols-2 gap-3 max-w-xs">
            {["🍼", "🌈", "🧸", "☁️"].map((emoji, i) => (
              <div
                key={i}
                className="w-28 h-28 rounded-3xl flex items-center justify-center text-5xl shadow-sm"
                style={{
                  background: ["#e8f7fb", "#ede0f5", "#fde8e2", "#fff8d6"][i],
                }}
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
