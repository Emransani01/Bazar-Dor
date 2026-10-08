"use client";

import { useMemo, useState } from "react";

import ProductCard from "./ProductCard";
import type { Product } from "@/types/product";
import { formatBengaliPrice } from "@/lib/format-price";

type CategoryProductsProps = {
  products: Product[];
};

type SortOption = "default" | "asc" | "desc";

export default function CategoryProducts({ products }: CategoryProductsProps) {
  const [sort, setSort] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    if (sort === "default") {
      return products;
    }

    return [...products].sort((a, b) => {
      if (sort === "asc") {
        return a.today - b.today;
      }

      return b.today - a.today;
    });
  }, [products, sort]);

  return (
    <section>
      {/* Toolbar */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Product Count */}
        <p className="text-[14px] leading-5 text-[#5F6962]">
          মোট{" "}
          <span className="font-semibold text-[#1D271F]">
            {formatBengaliPrice(products.length)}
          </span>{" "}
          টি পণ্য দেখানো হচ্ছে
        </p>

        {/* Sort */}
        <div className="flex shrink-0 items-center gap-2">
          <label
            htmlFor="category-sort"
            className="text-[12px] font-medium leading-[18px] text-[#5F6962]"
          >
            সাজান
          </label>

          <select
            id="category-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOption)}
            className="h-8 min-w-[75px] rounded-lg border border-[#E1E8E1] bg-[#FAFCFA] px-2.5 text-[12px] font-medium leading-[18px] text-[#1D271F] outline-none focus:border-[#05893E]"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Products */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA] px-6 py-16 text-center">
          <div className="text-4xl">📦</div>

          <h2 className="mt-4 text-[18px] font-semibold leading-7 text-[#1D271F]">
            কোনো পণ্য পাওয়া যায়নি
          </h2>

          <p className="mt-2 text-[12px] leading-[18px] text-[#7A837D]">
            এই বিভাগে বর্তমানে কোনো পণ্য নেই।
          </p>

          <p className="mt-1 text-[12px] leading-[18px] text-[#7A837D]">
            অন্য কোনো বিভাগ থেকে পণ্য দেখতে পারেন।
          </p>
        </div>
      )}
    </section>
  );
}
