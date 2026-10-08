import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Hero from "@/components/Hero";
import PriceChangeSection from "@/components/PriceChangeSection";
import AllProducts from "@/components/AllProducts";
import Footer from "@/components/Footer";
import { fetchProducts } from "@/lib/api";
import type { Product } from "@/types/product";

export default async function Home() {
  let products: Product[] = [];

  try {
    products = await fetchProducts();
  } catch {
    products = [];
  }

  return (
    <>
      <Navbar />

      <PriceTicker />

      <main className="min-h-screen bg-[#F0F5F0]">
        <Hero />

        <PriceChangeSection direction="up" />

        <PriceChangeSection direction="down" />

        <AllProducts products={products} />
      </main>

      <Footer />
    </>
  );
}