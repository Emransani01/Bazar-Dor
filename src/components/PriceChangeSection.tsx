import ProductCard from "./ProductCard";
import { fetchProducts } from "@/lib/api";
import type { Product } from "@/types/product";

type PriceChangeSectionProps = {
  direction: "up" | "down";
};

export default async function PriceChangeSection({
  direction,
}: PriceChangeSectionProps) {
  let products: Product[] = [];

  try {
    products = await fetchProducts();
  } catch {
    products = [];
  }

  const changedProducts = products
    .filter((product) => product.change.dir === direction)
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  if (changedProducts.length === 0) {
    return null;
  }

  const isUp = direction === "up";

  return (
    <section className="mx-auto mt-10 w-full max-w-[1120px] px-4 sm:px-0">
      {/* Section header */}
      <div className="mb-5">
        <div className="flex items-center gap-2">
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[13px] font-semibold ${
              isUp
                ? "bg-[#E7F7EE] text-[#16A34A]"
                : "bg-[#FDECEC] text-[#E53935]"
            }`}
          >
            {isUp ? "▲" : "▼"}
          </span>

          <h2 className="text-[20px] font-bold leading-7 text-[#1D271F]">
            {isUp ? "আজ দাম বেড়েছে" : "আজ দাম কমেছে"}
          </h2>
        </div>

        <p className="mt-1 text-[12px] leading-[18px] text-[#7A837D]">
          {isUp
            ? "আজকের বাজারে যেসব পণ্যের দাম সবচেয়ে বেশি বেড়েছে"
            : "আজকের বাজারে যেসব পণ্যের দাম সবচেয়ে বেশি কমেছে"}
        </p>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {changedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
