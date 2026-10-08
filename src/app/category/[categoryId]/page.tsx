import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import CategoryProducts from "@/components/CategoryProducts";

import {
  fetchCategory,
  fetchCategoryById,
} from "@/lib/api";

import { formatBengaliPrice } from "@/lib/format-price";

type CategoryPageProps = {
  params: Promise<{
    categoryId: string;
  }>;
};

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { categoryId } = await params;

  let category;
  let products;

  try {
    [category, products] = await Promise.all([
      fetchCategoryById(categoryId),
      fetchCategory(categoryId),
    ]);
  } catch {
    notFound();
  }

  if (!category || products.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F0F5F0]">
      <Navbar />

      <PriceTicker />

      <main className="min-h-[620px]">
        <div className="mx-auto w-full max-w-[1120px] px-4 pb-12 pt-6 sm:pb-14 lg:pb-16">
          {/* Category Header */}
          <section className="rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA] px-5 py-5">
            <div className="flex items-center gap-4">
              {/* Category Icon */}
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0]">
                <span className="text-[20px] leading-none">
                  {category.icon}
                </span>
              </div>

              {/* Category Title */}
              <div className="min-w-0">
                <h1 className="text-[24px] font-bold leading-8 text-[#1D271F]">
                  {category.nameBn}
                </h1>

                <p className="mt-0.5 text-[12px] leading-[18px] text-[#7A837D]">
                  {formatBengaliPrice(products.length)}টি পণ্যের
                  আজকের দাম ও পরিবর্তন
                </p>
              </div>
            </div>
          </section>

          {/* Products */}
          <div className="mt-6">
            <CategoryProducts products={products} />
          </div>

          {/* Back Home */}
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-[#E1E8E1] bg-[#FAFCFA] px-4 text-[14px] font-semibold leading-[21px] text-[#5F6962] transition hover:border-[#05893E] hover:text-[#05893E]"
            >
              ← হোম পেজে ফিরে যান
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}