import Link from "next/link";

import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import SignupForm from "@/components/SignupForm";
import Footer from "@/components/Footer";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#F0F5F0]">
      <Navbar />

      <PriceTicker />

      <main className="min-h-[742px]">
        <div className="mx-auto w-full max-w-[448px] px-4 pb-12 pt-10">
          <div className="px-0 sm:px-4">
            <h1 className="text-[24px] font-bold leading-8 text-[#1D271F]">
              অ্যাকাউন্ট তৈরি করুন
            </h1>

            <p className="mt-1 text-[14px] leading-5 text-[#5F6962]">
              বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
            </p>
          </div>

          <SignupForm />

          <div className="mt-5 text-center">
            <Link
              href="/"
              className="text-[14px] font-medium leading-5 text-[#5F6962] transition hover:text-[#05893E]"
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
