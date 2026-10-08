import Link from "next/link";
import { formatBengaliPrice, getUnitLabel } from "@/lib/format-price";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { dir, pct } = product.change;

  const changeIcon = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";

  const changeColor =
    dir === "up"
      ? "text-[#16A34A]"
      : dir === "down"
        ? "text-[#E53935]"
        : "text-[#6B7280]";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block h-[138px] rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA] p-4 transition hover:border-[#CCD0CC] hover:shadow-sm"
    >
      {/* Top row */}
      <div className="flex h-12 items-center gap-3">
        {/* Product emoji */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0]">
          <span className="text-[24px] leading-none transition-transform duration-200 group-hover:scale-110">
            {product.image || product.categoryIcon}
          </span>
        </div>

        {/* Product name + unit */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[16px] font-semibold leading-6 text-[#1D271F] transition-colors group-hover:text-[#05893E]">
            {product.nameBn}
          </h3>

          <p className="text-[12px] font-normal leading-4 text-[#7A837D]">
            প্রতি {getUnitLabel(product.unit)}
          </p>
        </div>
      </div>

      {/* Bottom row */}
      <div className="mt-3 flex h-11 items-end justify-between gap-3">
        {/* Price */}
        <div className="min-w-0">
          <p className="text-[12px] font-normal leading-4 text-[#7A837D]">
            আজকের দাম
          </p>

          <div className="flex items-baseline gap-1">
            <span className="text-[20px] font-bold leading-7 text-[#1D271F]">
              {formatBengaliPrice(product.today)}
            </span>

            <span className="text-[12px] font-normal leading-4 text-[#5F6962]">
              টাকা
            </span>
          </div>
        </div>

        {/* Change badge */}
        <span className="mb-0.5 flex h-6 shrink-0 items-center gap-1 rounded-xl bg-[#F0F5F0] px-2 text-[12px] font-semibold leading-4">
          <span className={changeColor}>{changeIcon}</span>

          <span className={changeColor}>
            {formatBengaliPrice(Math.abs(pct))}%
          </span>
        </span>
      </div>
    </Link>
  );
}
