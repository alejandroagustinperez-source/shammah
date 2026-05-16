"use client";
import { useState, useEffect } from "react";

export default function BannerPromo() {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const ms = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();
      setTimeLeft({
        h: Math.floor(ms / 3600000),
        m: Math.floor((ms % 3600000) / 60000),
        s: Math.floor((ms % 60000) / 1000),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="bg-gradient-to-r from-[#ffb6a3] to-[#d4b8e0] text-white text-center py-3 px-4">
      <span className="font-bold text-sm sm:text-base">
        🎁 OFERTA DEL DÍA — 20% OFF en todos los conjuntos &nbsp;
        <span className="inline-block bg-white/20 rounded px-2 py-0.5 tabular-nums">
          {pad(timeLeft.h)}:{pad(timeLeft.m)}:{pad(timeLeft.s)}
        </span>
      </span>
    </div>
  );
}
