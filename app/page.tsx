import Hero from "@/components/Hero";
import Categorias from "@/components/Categorias";
import HechoAMano from "@/components/HechoAMano";
import ProductGrid from "@/components/ProductGrid";
import BundleSection from "@/components/BundleSection";
import ComoComprar from "@/components/ComoComprar";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-lino text-hilo">
      <Hero />
      <Categorias />
      <HechoAMano />
      <ProductGrid />
      <BundleSection />
      <ComoComprar />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
