import BannerPromo from "@/components/BannerPromo";
import Hero from "@/components/Hero";
import PorQueElegirnos from "@/components/PorQueElegirnos";
import CategoryNav from "@/components/CategoryNav";
import ProductGrid from "@/components/ProductGrid";
import BundleSection from "@/components/BundleSection";
import Testimonios from "@/components/Testimonios";
import MediosDePago from "@/components/MediosDePago";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fdfaf7]">
      <BannerPromo />
      <Hero />
      <PorQueElegirnos />
      <CategoryNav />
      <ProductGrid />
      <BundleSection />
      <Testimonios />
      <MediosDePago />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
