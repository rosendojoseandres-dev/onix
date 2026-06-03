import Navbar from '@/components/Navbar';
import EarbudShowcase from '@/components/EarbudShowcase';
import IphoneShowcase from '@/components/IphoneShowcase';
import ProductMarquee from '@/components/ProductMarquee';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';
import ScrollBackground from '@/components/ScrollBackground';
import PromoShowcase from '@/components/PromoShowcase';
import ProductGrid from '@/components/ProductGrid';
import FeaturedProductsGrid from '@/components/FeaturedProductsGrid';

export default function Home() {
  return (
    <>
      {/* Fixed scroll-driven ambient background — lives outside overflow-x-hidden main */}
      <ScrollBackground />

      <main className="min-h-screen overflow-x-hidden relative">
        <Navbar />

        {/* Flagship product demo (Full width to allow light animations) */}
        <EarbudShowcase>
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[#f4f4f4]">
              Importamos lo Mejor del Mundo.
              <br className="hidden md:block" />
              Lo entregas tú recibes.
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto">
              Tecnología, calzado y moda de primera. Distribución directa al mayor y detal
              en Colombia y Venezuela con garantía de excelencia.
            </p>
          </div>
        </EarbudShowcase>

        <IphoneShowcase />

        {/* Infinite scrolling products */}
        <ProductMarquee />

        {/* Promotional Product Section */}
        <PromoShowcase />

        {/* Featured Products Grid (Vertical Cards) */}
        <FeaturedProductsGrid />

        {/* How It Works — Service Logistics */}
        <HowItWorks />

        {/* Static Product Grid before Footer */}
        <ProductGrid />

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
