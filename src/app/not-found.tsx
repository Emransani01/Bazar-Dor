import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F3F7F4] px-4">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold text-[#00A651]">404</p>

        <h1 className="mt-3 text-3xl font-bold text-[#111827]">
          পেজটি পাওয়া যায়নি
        </h1>

        <p className="mt-3 text-[#6B7280]">
          আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যাচ্ছে না।
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-[#00A651] px-5 py-3 font-semibold text-white transition hover:bg-[#008F46]"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
