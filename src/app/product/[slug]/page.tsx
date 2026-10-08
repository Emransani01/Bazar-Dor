import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";

import { fetchProduct } from "@/lib/api";
import { formatBengaliPrice, getUnitLabel } from "@/lib/format-price";

import { auth } from "@/lib/auth";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatAverage(value: number) {
  return Number.isInteger(value)
    ? formatBengaliPrice(value)
    : formatBengaliPrice(value.toFixed(2));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  // Login check
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(
      `/signin?error=auth-required&callbackURL=/product/${encodeURIComponent(
        slug,
      )}`,
    );
  }

  let product;

  try {
    product = await fetchProduct(slug);
  } catch {
    notFound();
  }

  const unitLabel = getUnitLabel(product.unit);

  // Price change condition
  const changeIcon =
    product.change.dir === "up"
      ? "▲"
      : product.change.dir === "down"
        ? "▼"
        : "—";

  const changeColor =
    product.change.dir === "up"
      ? "text-[#16A34A]"
      : product.change.dir === "down"
        ? "text-[#E53935]"
        : "text-[#6B7280]";

  const changeDescription =
    product.change.dir === "up"
      ? "গতকালের তুলনায় আজ দাম বেড়েছে"
      : product.change.dir === "down"
        ? "গতকালের তুলনায় আজ দাম কমেছে"
        : "গতকালের তুলনায় আজ দাম অপরিবর্তিত";

  // Market price calculations
  const marketAverages = product.markets.map(
    (market) => (market.min + market.max) / 2,
  );

  const lowestPrice =
    product.markets.length > 0
      ? Math.min(...product.markets.map((market) => market.min))
      : product.today;

  const highestPrice =
    product.markets.length > 0
      ? Math.max(...product.markets.map((market) => market.max))
      : product.today;

  const averagePrice =
    marketAverages.length > 0
      ? marketAverages.reduce((total, value) => total + value, 0) /
        marketAverages.length
      : product.today;

  return (
    <div className="min-h-screen bg-[#F0F5F0]">
      <Navbar />

      <PriceTicker />

      <main className="mx-auto w-full max-w-[1120px] px-4 pb-12 pt-6 sm:pb-14 lg:pb-16">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex h-9 items-center gap-2 overflow-hidden whitespace-nowrap text-[12px] leading-[18px]"
        >
          <Link
            href="/"
            className="text-[#5F6962] transition hover:text-[#05893E]"
          >
            হোম
          </Link>

          <span className="text-[#7A837D]">→</span>

          <Link
            href={`/category/${product.category}`}
            className="text-[#5F6962] transition hover:text-[#05893E]"
          >
            {product.categoryNameBn}
          </Link>

          <span className="text-[#7A837D]">→</span>

          <span className="truncate font-medium text-[#1D271F]">
            {product.nameBn}
          </span>
        </nav>

        {/* Product Header */}
        <section className="rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA] p-5">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Product Information */}
            <div className="flex min-w-0 items-start gap-4">
              {/* Product Emoji */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#F0F5F0]">
                <span className="text-[36px] leading-none">
                  {product.image || product.categoryIcon}
                </span>
              </div>

              {/* Product Details */}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  {/* Category */}
                  <span className="rounded-lg bg-[#F0F5F0] px-2.5 py-1 text-[12px] font-semibold leading-[18px] text-[#1D271F]">
                    {product.categoryIcon} {product.categoryNameBn}
                  </span>

                  {/* Unit */}
                  <span className="rounded-lg bg-[#F0F5F0] px-2.5 py-1 text-[12px] font-medium leading-[18px] text-[#5F6962]">
                    প্রতি {unitLabel}
                  </span>
                </div>

                <h1 className="mt-3 text-[30px] font-bold leading-9 text-[#1D271F]">
                  {product.nameBn}
                </h1>

                <p className="mt-2 text-[14px] leading-5 text-[#5F6962]">
                  {changeDescription} ·{" "}
                  <span className={`font-semibold ${changeColor}`}>
                    {formatBengaliPrice(
                      Math.abs(product.today - product.yesterday),
                    )}{" "}
                    টাকা
                  </span>
                </p>
              </div>
            </div>

            {/* Today Price */}
            <div className="flex w-full shrink-0 flex-col items-start rounded-xl bg-[#F0F5F0] p-4 sm:w-[118px] lg:items-center">
              <p className="text-[12px] leading-[18px] text-[#5F6962]">
                আজকের দাম
              </p>

              <p className="mt-1 text-[30px] font-bold leading-9 text-[#1D271F]">
                {formatBengaliPrice(product.today)}
              </p>

              <p className="text-[12px] leading-[18px] text-[#5F6962]">
                টাকা / {unitLabel}
              </p>

              <span
                className={`mt-2 rounded-xl bg-[#FAFCFA] px-2 py-1 text-[12px] font-semibold leading-4 ${changeColor}`}
              >
                {changeIcon} {formatBengaliPrice(Math.abs(product.change.pct))}%
              </span>
            </div>
          </div>
        </section>

        {/* Price History */}
        <section className="mt-6 rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA] p-5">
          <h2 className="text-[18px] font-semibold leading-7 text-[#1D271F]">
            দামের ইতিহাস
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {/* Yesterday */}
            <div className="rounded-xl border border-[#E1E8E1] bg-[#FAFCFA] p-4">
              <p className="text-[12px] leading-[18px] text-[#7A837D]">গতকাল</p>

              <p className="mt-1 text-[20px] font-bold leading-7 text-[#1D271F]">
                {formatBengaliPrice(product.yesterday)} টাকা
              </p>

              <p className="mt-1 text-[12px] leading-[18px] text-[#7A837D]">
                প্রতি {unitLabel}
              </p>
            </div>

            {/* Last Week */}
            <div className="rounded-xl border border-[#E1E8E1] bg-[#FAFCFA] p-4">
              <p className="text-[12px] leading-[18px] text-[#7A837D]">
                গত সপ্তাহ
              </p>

              <p className="mt-1 text-[20px] font-bold leading-7 text-[#1D271F]">
                {formatBengaliPrice(product.lastWeek)} টাকা
              </p>

              <p className="mt-1 text-[12px] leading-[18px] text-[#7A837D]">
                প্রতি {unitLabel}
              </p>
            </div>

            {/* Last Month */}
            <div className="rounded-xl border border-[#E1E8E1] bg-[#FAFCFA] p-4">
              <p className="text-[12px] leading-[18px] text-[#7A837D]">
                গত মাস
              </p>

              <p className="mt-1 text-[20px] font-bold leading-7 text-[#1D271F]">
                {formatBengaliPrice(product.lastMonth)} টাকা
              </p>

              <p className="mt-1 text-[12px] leading-[18px] text-[#7A837D]">
                প্রতি {unitLabel}
              </p>
            </div>
          </div>
        </section>

        {/* Price Summary */}
        <section className="mt-6 rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA] p-5">
          <h2 className="text-[18px] font-semibold leading-7 text-[#1D271F]">
            দামের সারসংক্ষেপ
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
            {/* Lowest */}
            <div className="rounded-xl border border-[#E1E8E1] bg-[#FAFCFA] p-4">
              <p className="text-[12px] leading-[18px] text-[#7A837D]">
                সর্বনিম্ন দাম
              </p>

              <p className="mt-1 text-[20px] font-bold leading-7 text-[#1A9A51]">
                {formatBengaliPrice(lowestPrice)} টাকা
              </p>

              <p className="mt-1 text-[12px] leading-[18px] text-[#7A837D]">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            {/* Average */}
            <div className="rounded-xl border border-[#E1E8E1] bg-[#FAFCFA] p-4">
              <p className="text-[12px] leading-[18px] text-[#7A837D]">
                গড় দাম
              </p>

              <p className="mt-1 text-[20px] font-bold leading-7 text-[#1D271F]">
                {formatAverage(averagePrice)} টাকা
              </p>

              <p className="mt-1 text-[12px] leading-[18px] text-[#7A837D]">
                প্রতি {unitLabel}-এর হিসাবে
              </p>
            </div>

            {/* Highest */}
            <div className="rounded-xl border border-[#E1E8E1] bg-[#FAFCFA] p-4">
              <p className="text-[12px] leading-[18px] text-[#7A837D]">
                সর্বাধিক দাম
              </p>

              <p className="mt-1 text-[20px] font-bold leading-7 text-[#1D271F]">
                {formatBengaliPrice(highestPrice)} টাকা
              </p>

              <p className="mt-1 text-[12px] leading-[18px] text-[#7A837D]">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>
          </div>

          {/* Market Prices */}
          <div className="mt-7">
            <h2 className="text-[18px] font-semibold leading-7 text-[#1D271F]">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <div className="mt-3 overflow-x-auto rounded-xl border border-[#E1E8E1]">
              <div className="min-w-[850px]">
                {/* Table Header */}
                <div className="grid grid-cols-[1.4fr_0.9fr_0.8fr_0.8fr_1fr] border-b border-[#E1E8E1] bg-[#F0F5F0] px-4 py-3 text-[12px] font-semibold leading-[18px] text-[#5F6962]">
                  <span>বাজার</span>

                  <span>বিভাগ</span>

                  <span>সর্বনিম্ন</span>

                  <span>সর্বাধিক</span>

                  <span>গড়</span>
                </div>

                {/* Table Rows */}
                <div>
                  {product.markets.map((market, index) => {
                    const average = (market.min + market.max) / 2;

                    return (
                      <div
                        key={`${market.market}-${market.division}-${index}`}
                        className="grid grid-cols-[1.4fr_0.9fr_0.8fr_0.8fr_1fr] items-center border-b border-[#F0F5F0] px-4 py-4 text-[14px] leading-5 last:border-b-0"
                      >
                        <span className="font-semibold text-[#1D271F]">
                          {market.market}
                        </span>

                        <span className="text-[#5F6962]">
                          {market.division || "—"}
                        </span>

                        <span className="font-medium text-[#1D271F]">
                          {formatBengaliPrice(market.min)}
                        </span>

                        <span className="font-medium text-[#1D271F]">
                          {formatBengaliPrice(market.max)}
                        </span>

                        <span className="font-semibold text-[#1D271F]">
                          {formatAverage(average)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category CTA */}
        <div className="mt-6">
          <Link
            href={`/category/${product.category}`}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-[#05893E] px-4 text-[14px] font-semibold leading-[21px] text-[#F3FBF4] transition hover:bg-[#048039]"
          >
            {product.categoryNameBn} বিভাগের সব পণ্য দেখুন
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
