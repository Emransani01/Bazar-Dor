import Link from "next/link";

import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import SigninForm from "@/components/SigninForm";
import Footer from "@/components/Footer";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#F0F5F0]">
      <Navbar />

      <PriceTicker />

      <main className="min-h-[628px]">
        <div className="mx-auto w-full max-w-[448px] px-4 pb-12 pt-10">
          {/* Page Heading */}
          <div className="px-0 sm:px-4">
            <h1 className="text-[24px] font-bold leading-8 text-[#1D271F]">
              সাইন ইন
            </h1>

            <p className="mt-1 text-[14px] leading-5 text-[#5F6962]">
              বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
            </p>
          </div>

          {/* Sign In Form */}
          <SigninForm />

          {/* Back Home */}
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
