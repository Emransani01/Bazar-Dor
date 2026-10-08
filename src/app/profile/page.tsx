import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import ProfileSignOut from "@/components/ProfileSignOut";

import { auth } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(
      "/signin?error=auth-required&callbackURL=/profile",
    );
  }

  const user = session.user;

  const userName = user.name || "ব্যবহারকারী";
  const userEmail = user.email || "";

  return (
    <div className="min-h-screen bg-[#F0F5F0]">
      <Navbar />

      <PriceTicker />

      <main className="min-h-[775px]">
        <div className="mx-auto w-full max-w-[768px] px-4 pb-12 pt-6 sm:pb-14 lg:pb-16">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-[24px] font-bold leading-8 text-[#1D271F]">
              আমার প্রোফাইল
            </h1>

            <p className="mt-1 text-[14px] leading-5 text-[#5F6962]">
              আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
            </p>
          </div>

          {/* User Identity */}
          <section className="rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA] p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              {/* User Info */}
              <div className="flex min-w-0 items-center gap-4">
                {/* Avatar */}
                <div className="flex h-[70px] w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#05893E] text-[24px] font-bold text-[#F3FBF4]">
                  {userName
                    .trim()
                    .charAt(0)
                    .toUpperCase()}
                </div>

                {/* Name + Email */}
                <div className="min-w-0">
                  <h2 className="truncate text-[18px] font-semibold leading-7 text-[#1D271F]">
                    {userName}
                  </h2>

                  <p className="mt-1 truncate text-[14px] leading-5 text-[#5F6962]">
                    {userEmail}
                  </p>
                </div>
              </div>

              {/* Sign Out */}
              <ProfileSignOut />
            </div>
          </section>

          {/* Information */}
          <section className="mt-6 rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA] p-6">
            <h2 className="text-[18px] font-semibold leading-7 text-[#1D271F]">
              তথ্য
            </h2>

            <div className="mt-5">
              <UpdateProfileForm
                currentName={userName}
              />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}