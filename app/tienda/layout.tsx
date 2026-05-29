import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tienda | Shammah Bebé",
  description:
    "Comprá cunas, cochecitos, sillas para auto, pañales, baberos artesanales y más productos para bebés. Envíos a todo Argentina.",
};

export default function TiendaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
