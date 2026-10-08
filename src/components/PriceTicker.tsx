import { fetchProducts } from "@/lib/api";
import { formatBengaliPrice, getUnitLabel } from "@/lib/format-price";
import type { Product } from "@/types/product";

export default async function PriceTicker() {
  let products: Product[] = [];

  try {
    products = await fetchProducts();
  } catch {
    products = [];
  }

  const tickerProducts = products.slice(0, 6);

  if (tickerProducts.length === 0) {
    return null;
  }

  const items = [...tickerProducts, ...tickerProducts];

  return (
    <section className="h-[37px] overflow-hidden border-b border-[#E1E8E1] bg-[#FAFCFA]">
      <div className="mx-auto flex h-full max-w-[1440px]">
        {/* Latest label */}
        <div className="z-10 flex h-full shrink-0 items-center bg-green-500 px-4 text-[12px] font-semibold leading-4 text-white">
          সর্বশেষ
        </div>

        {/* Scrolling area */}
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="ticker-track flex h-full w-max">
            {items.map((product, index) => {
              const { dir, pct } = product.change;

              const directionIcon =
                dir === "up" ? "▲" : dir === "down" ? "▼" : "—";

              const directionClass =
                dir === "up"
                  ? "text-[#16A34A]"
                  : dir === "down"
                    ? "text-[#E53935]"
                    : "text-[#6B7280]";

              return (
                <div
                  key={`${product.id}-${index}`}
                  className="flex h-full shrink-0 items-center gap-[6px] whitespace-nowrap border-r border-[#E1E8E1] px-4"
                >
                  {/* Category icon */}
                  <span className="text-[14px] leading-none">
                    {product.categoryIcon}
                  </span>

                  {/* Product name */}
                  <span className="text-[14px] font-medium leading-5 text-[#1D271F]">
                    {product.nameBn}
                  </span>

                  {/* Price */}
                  <span className="text-[14px] font-normal leading-5 text-[#1D271F]">
                    {formatBengaliPrice(product.today)} টাকা/
                    {getUnitLabel(product.unit)}
                  </span>

                  {/* Change */}
                  <span
                    className={`text-[14px] font-semibold leading-5 ${directionClass}`}
                  >
                    {directionIcon} {formatBengaliPrice(Math.abs(pct))}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
