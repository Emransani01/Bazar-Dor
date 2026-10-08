"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import type { Product } from "@/types/product";
import { formatBengaliPrice } from "@/lib/format-price";

type AllProductsProps = {
  products: Product[];
};

export default function AllProducts({ products }: AllProductsProps) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    let result = products.filter((product) =>
      product.nameBn.toLowerCase().includes(keyword),
    );

    if (sort === "low") {
      result = [...result].sort((a, b) => a.today - b.today);
    }

    if (sort === "high") {
      result = [...result].sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, search, sort]);

  return (
    <section
      id="সব-পণ্য"
      className="mx-auto w-full max-w-[1120px] px-4 pb-12 pt-10 sm:pb-14 sm:pt-12 lg:pb-16"
    >
      {/* Heading */}
      <div className="mb-5">
        <h2 className="text-[20px] font-bold leading-7 text-[#1D271F]">
          সব পণ্য
        </h2>

        <p className="mt-1 text-[12px] leading-[18px] text-[#7A837D]">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজারদর
        </p>
      </div>

      {/* Search + Sort */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative w-full sm:w-[220px]">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="পণ্যের নাম লিখুন…"
            aria-label="পণ্যের নাম দিয়ে খুঁজুন"
            className="h-10 w-full rounded-lg border border-[rgba(29,39,31,0.2)] bg-[#FAFCFA] px-3 text-[14px] leading-5 text-[#1D271F] outline-none placeholder:text-[#7A837D] focus:border-[#05893E] focus:ring-1 focus:ring-[#05893E]"
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="all-products-sort"
            className="shrink-0 text-[12px] font-medium leading-[18px] text-[#5F6962]"
          >
            সাজান
          </label>

          <select
            id="all-products-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="h-8 min-w-[150px] rounded-lg border border-[#E1E8E1] bg-[#FAFCFA] px-3 text-[12px] font-medium leading-[18px] text-[#1D271F] outline-none focus:border-[#05893E]"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Product count */}
      <p className="mb-4 text-[14px] leading-5 text-[#5F6962]">
        মোট{" "}
        <span className="font-semibold text-[#1D271F]">
          {formatBengaliNumber(filteredProducts.length)}
        </span>{" "}
        টি পণ্য দেখানো হচ্ছে
      </p>

      {/* Products */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA] px-5 py-12 text-center">
          <p className="text-[14px] leading-5 text-[#5F6962]">
            কোনো পণ্য পাওয়া যায়নি।
          </p>
        </div>
      )}
    </section>
  );
}

function formatBengaliNumber(value: number) {
  return formatBengaliPrice(value);
}
