"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

export default function SigninForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  /*
   * Protected route থেকে /signin এ এলে
   * error toast দেখাবে।
   */
  useEffect(() => {
    const error = searchParams.get("error");

    if (error === "auth-required") {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন।", {
        id: "auth-required",
      });
    }
  }, [searchParams]);

  /*
   * Email + Password Sign In
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      toast.error("ইমেইল লিখুন।", {
        id: "signin-email-required",
      });

      return;
    }

    if (!password) {
      toast.error("পাসওয়ার্ড লিখুন।", {
        id: "signin-password-required",
      });

      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email: trimmedEmail,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।", {
          id: "signin-error",
        });

        return;
      }

      if (data) {
        toast.success("সফলভাবে সাইন ইন হয়েছে।", {
          id: "signin-success",
        });

        router.push("/");
        router.refresh();
      }
    } catch {
      toast.error("সাইন ইন করার সময় একটি সমস্যা হয়েছে।", {
        id: "signin-catch-error",
      });
    } finally {
      setLoading(false);
    }
  };

  /*
   * Google / GitHub Sign In
   *
   * AuthButtons.tsx একই sessionStorage key
   * ব্যবহার করে OAuth success toast দেখায়।
   */
  const handleSocialLogin = async (provider: "google" | "github") => {
    setSocialLoading(provider);

    try {
      sessionStorage.setItem("social-login", provider);

      await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch {
      sessionStorage.removeItem("social-login");

      toast.error("সোশ্যাল লগইন করার সময় সমস্যা হয়েছে।", {
        id: "social-login-error",
      });

      setSocialLoading(null);
    }
  };

  const isLoading = loading || socialLoading !== null;

  return (
    <div className="mt-8 rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA] p-6">
      {/* Main Form */}
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div>
          <label
            htmlFor="signin-email"
            className="mb-2 block text-[14px] font-medium leading-[21px] text-[#1D271F]"
          >
            ইমেইল
          </label>

          <input
            id="signin-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            disabled={isLoading}
            className="h-10 w-full rounded-lg border border-[rgba(29,39,31,0.2)] bg-[#FAFCFA] px-3 text-[14px] leading-5 text-[#1D271F] outline-none placeholder:text-[#7A837D] focus:border-[#05893E] focus:ring-1 focus:ring-[#05893E] disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        {/* Password */}
        <div className="mt-4">
          <label
            htmlFor="signin-password"
            className="mb-2 block text-[14px] font-medium leading-[21px] text-[#1D271F]"
          >
            পাসওয়ার্ড
          </label>

          <div className="relative">
            <input
              id="signin-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              autoComplete="current-password"
              disabled={isLoading}
              className="h-10 w-full rounded-lg border border-[rgba(29,39,31,0.2)] bg-[#FAFCFA] px-3 pr-12 text-[14px] leading-5 text-[#1D271F] outline-none placeholder:text-[#7A837D] focus:border-[#05893E] focus:ring-1 focus:ring-[#05893E] disabled:cursor-not-allowed disabled:opacity-60"
            />

            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              disabled={isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] font-medium text-[#5F6962] transition hover:text-[#05893E]"
              aria-label={
                showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
              }
            >
              {showPassword ? "লুকান" : "দেখুন"}
            </button>
          </div>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-lg bg-green-500 px-4 text-[14px] font-semibold leading-[21px] text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
        </button>
      </form>

      {/* Divider */}
      <div className="my-4 flex items-center gap-3">
        <div className="h-px flex-1 bg-[#E1E8E1]" />

        <span className="text-[12px] leading-4 text-[#7A837D]">অথবা</span>

        <div className="h-px flex-1 bg-[#E1E8E1]" />
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-2 gap-3">
        {/* Google */}
        <button
          type="button"
          onClick={() => handleSocialLogin("google")}
          disabled={isLoading}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#E1E8E1] bg-[#FAFCFA] px-3 text-[14px] font-semibold leading-[21px] text-[#1D271F] transition hover:border-[#CCD0CC] hover:bg-[#F0F5F0] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M21.35 12.27c0-.71-.06-1.4-.18-2.06H12v3.9h5.23a4.47 4.47 0 0 1-1.94 2.93v2.44h3.14c1.84-1.69 2.92-4.18 2.92-7.21Z"
            />

            <path
              fill="#34A853"
              d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.52A9.75 9.75 0 0 0 12 21.75Z"
            />

            <path
              fill="#FBBC05"
              d="M6.54 13.84A5.86 5.86 0 0 1 6.23 12c0-.64.11-1.26.31-1.84V7.64H3.3A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.36l3.24-2.52Z"
            />

            <path
              fill="#EA4335"
              d="M12 6.13c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.23 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.7 5.39l3.24 2.52C7.31 7.85 9.46 6.13 12 6.13Z"
            />
          </svg>

          {socialLoading === "google" ? "অপেক্ষা করুন..." : "Google"}
        </button>

        {/* GitHub */}
        <button
          type="button"
          onClick={() => handleSocialLogin("github")}
          disabled={isLoading}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#E1E8E1] bg-[#FAFCFA] px-3 text-[14px] font-semibold leading-[21px] text-[#1D271F] transition hover:border-[#CCD0CC] hover:bg-[#F0F5F0] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.25c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.84 1.23 1.84 1.23 1.07 1.84 2.8 1.31 3.48 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.3 1.23A11.4 11.4 0 0 1 12 5.05c1.02 0 2.04.14 3 .41 2.3-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.76.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
          </svg>

          {socialLoading === "github" ? "অপেক্ষা করুন..." : "GitHub"}
        </button>
      </div>

      {/* Sign Up Link */}
      <p className="mt-5 text-center text-[14px] leading-5 text-[#5F6962]">
        অ্যাকাউন্ট নেই?{" "}
        <Link
          href="/signup"
          className="font-semibold text-[#05893E] hover:underline"
        >
          <span className="text-green-500">সাইন আপ করুন</span>
        </Link>
      </p>
    </div>
  );
}
