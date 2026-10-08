import Link from "next/link";

export default function CategoryNotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#F3F7F4] px-4 py-16">
      <div className="w-full max-w-lg rounded-3xl border border-[#E5E7EB] bg-white p-8 text-center shadow-sm sm:p-10">
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#E7F7EE] text-4xl">
          📦
        </div>

        {/* Error */}
        <p className="mt-6 text-sm font-bold tracking-wider text-[#00A651]">
          ERROR 404
        </p>

        <h1 className="mt-2 text-2xl font-bold text-[#111827] sm:text-3xl">
          বিভাগটি পাওয়া যায়নি
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#6B7280]">
          আপনি যে বিভাগের পেজটি খুঁজছেন সেটি পাওয়া যায়নি। অনুগ্রহ করে সঠিক
          বিভাগ নির্বাচন করুন।
        </p>

        {/* Home Button */}
        <Link
          href="/"
          className="mt-7 inline-flex items-center justify-center rounded-xl bg-[#00A651] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#008F46]"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
