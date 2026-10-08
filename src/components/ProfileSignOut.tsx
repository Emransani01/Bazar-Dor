"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

export default function ProfileSignOut() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error("সাইন আউট করা যায়নি।", {
          id: "profile-signout-error",
        });
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে।", {
        id: "profile-signout-success",
      });

      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করার সময় সমস্যা হয়েছে।", {
        id: "profile-signout-catch-error",
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="inline-flex h-10 items-center justify-center rounded-lg border border-[#D03739] bg-transparent px-4 text-[14px] font-semibold leading-[21px] text-[#D03739] transition hover:bg-[#FBE8E8]"
    >
      ↩ সাইন আউট
    </button>
  );
}