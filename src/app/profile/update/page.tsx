import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import UpdateProfileForm from "@/components/UpdateProfileForm";

import { auth } from "@/lib/auth";

export default async function ProfileUpdatePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(
      "/signin?error=auth-required&callbackURL=/profile/update",
    );
  }

  const currentName = session.user.name || "";

  return (
    <div className="min-h-screen bg-[#F0F5F0]">
      <Navbar />

      <PriceTicker />

      <main className="min-h-[775px]">
        <div className="mx-auto w-full max-w-[768px] px-4 pb-12 pt-6 sm:pb-14 lg:pb-16">
          {/* Page heading */}
          <div className="mb-6">
            <h1 className="text-[24px] font-bold leading-8 text-[#1D271F]">
              তথ্য আপডেট করুন
            </h1>

            <p className="mt-1 text-[14px] leading-5 text-[#5F6962]">
              আপনার প্রোফাইলের নাম পরিবর্তন করুন।
            </p>
          </div>

          {/* Update card */}
          <section className="rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA] p-6">
            <h2 className="text-[18px] font-semibold leading-7 text-[#1D271F]">
              তথ্য
            </h2>

            <div className="mt-5">
              <UpdateProfileForm currentName={currentName} />
            </div>
          </section>

          {/* Back to profile */}
          <div className="mt-6">
            <Link
              href="/profile"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-[#E1E8E1] bg-[#FAFCFA] px-4 text-[14px] font-semibold leading-[21px] text-[#1D271F] transition hover:border-[#CCD0CC] hover:bg-[#DADEDA]"
            >
              ← প্রোফাইলে ফিরে যান
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}