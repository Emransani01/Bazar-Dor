"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AuthButtons() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Google / GitHub login successful হলে toast দেখাবে
  useEffect(() => {
    if (isPending || !session?.user) {
      return;
    }

    const socialLogin = sessionStorage.getItem("social-login");

    if (!socialLogin) {
      return;
    }

    sessionStorage.removeItem("social-login");

    if (socialLogin === "google") {
      toast.success("Google দিয়ে সফলভাবে সাইন ইন হয়েছে।", {
        id: "google-signin-success",
      });
    }

    if (socialLogin === "github") {
      toast.success("GitHub দিয়ে সফলভাবে সাইন ইন হয়েছে।", {
        id: "github-signin-success",
      });
    }
  }, [session, isPending]);

  // Dropdown-এর বাইরে click করলে বন্ধ হবে
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Escape চাপলে dropdown বন্ধ হবে
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSignOut = async () => {
    setOpen(false);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি।", {
          id: "sign-out-error",
        });

        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে।", {
        id: "sign-out-success",
      });

      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করার সময় সমস্যা হয়েছে।", {
        id: "sign-out-catch-error",
      });
    }
  };

  if (isPending) {
    return (
      <div className="h-[50px] w-[145px] animate-pulse rounded-2xl bg-[#F3F4F6] sm:h-[58px] sm:w-[210px]" />
    );
  }

  if (session?.user) {
    const user = session.user;

    const userName = user.name?.trim() || "User";
    const userEmail = user.email || "Email নেই";
    const avatarLetter = userName.charAt(0).toUpperCase() || "U";

    return (
      <div ref={dropdownRef} className="relative shrink-0">
        {/* Account Button */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-haspopup="menu"
          className="group flex h-[50px] w-[145px] items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-2.5 text-left shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200 hover:border-[#00A651]/40 hover:shadow-[0_6px_18px_rgba(0,166,81,0.10)] focus:outline-none focus:ring-2 focus:ring-[#00A651]/15 sm:h-[58px] sm:w-[210px] sm:gap-3 sm:px-3.5"
        >
          {/* Avatar */}
          <div className="relative shrink-0">
            {user.image ? (
              <Image
                src={user.image}
                alt={userName}
                width={42}
                height={42}
                className="h-9 w-9 rounded-full object-cover ring-2 ring-[#E7F7EE] sm:h-[42px] sm:w-[42px]"
                unoptimized
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00A651] text-base font-bold text-white ring-2 ring-[#E7F7EE] sm:h-[42px] sm:w-[42px] sm:text-lg">
                {avatarLetter}
              </div>
            )}

            {/* Online indicator */}
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#22C55E] sm:h-3 sm:w-3" />
          </div>

          {/* User Information */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-bold leading-5 text-[#111827] sm:text-[14px]">
              {userName}
            </p>

            <p className="mt-0.5 hidden truncate text-[12px] leading-5 text-[#6B7280] sm:block">
              {userEmail}
            </p>
          </div>

          {/* Arrow */}
          <span
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] text-[#6B7280] transition-all duration-200 group-hover:bg-[#F3F7F4] group-hover:text-[#00A651] sm:h-7 sm:w-7 sm:text-[10px] ${
              open ? "rotate-180 bg-[#E7F7EE] text-[#00A651]" : ""
            }`}
          >
            ▼
          </span>
        </button>

        {/* Account Dropdown */}
        {open && (
          <div
            role="menu"
            className="absolute right-0 top-[calc(100%+10px)] z-50 w-[min(250px,calc(100vw-32px))] overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_14px_40px_rgba(0,0,0,0.12)]"
          >
            {/* User Header */}
            <div className="px-4 py-4">
              <div className="flex items-center gap-3">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={userName}
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-[#E7F7EE]"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#00A651] text-lg font-bold text-white">
                    {avatarLetter}
                  </div>
                )}

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[#111827]">
                    {userName}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-[#6B7280]">
                    {userEmail}
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#F0F1F2]" />

            {/* Profile */}
            <div className="p-2">
              <Link
                href="/profile"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[#374151] transition-all duration-150 hover:bg-[#E7F7EE] hover:text-[#00A651]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F3F7F4] text-base">
                  👤
                </span>

                <span>প্রোফাইল</span>
              </Link>
            </div>

            {/* Logout */}
            <div className="border-t border-[#F0F1F2] p-2">
              <button
                type="button"
                role="menuitem"
                onClick={handleSignOut}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-[#E53935] transition-all duration-150 hover:bg-[#FEF2F2]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFF5F5] text-base">
                  ↪
                </span>

                <span>সাইন আউট</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Logged out
  return (
    <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
      {/* Sign In */}
      <Link
        href="/signin"
        className="rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-xs font-semibold text-[#374151] transition-all duration-200 hover:border-[#00A651]/40 hover:text-[#00A651] hover:shadow-sm sm:px-4 sm:py-2.5 sm:text-sm"
      >
        সাইন ইন
      </Link>

      {/* Sign Up */}
      <Link
        href="/signup"
        className="rounded-xl bg-green-500 px-3 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-green-600 hover:shadow-md sm:px-4 sm:py-2.5 sm:text-sm"
      >
        সাইন আপ
      </Link>
    </div>
  );
}
