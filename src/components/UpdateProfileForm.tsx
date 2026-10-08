"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

type UpdateProfileFormProps = {
  currentName: string;
};

export default function UpdateProfileForm({
  currentName,
}: UpdateProfileFormProps) {
  const router = useRouter();

  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newName = name.trim();

    if (!newName) {
      toast.error("নাম লিখুন।", {
        id: "profile-name-required",
      });
      return;
    }

    if (newName === currentName.trim()) {
      toast.error("নতুন নামটি বর্তমান নামের মতোই।", {
        id: "profile-no-change",
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.updateUser({
        name: newName,
      });

      if (error) {
        toast.error(error.message || "প্রোফাইলের তথ্য আপডেট করা যায়নি।", {
          id: "profile-update-error",
        });
        return;
      }

      if (data) {
        toast.success("প্রোফাইলের তথ্য সফলভাবে আপডেট হয়েছে।", {
          id: "profile-update-success",
        });

        router.push("/profile");
        router.refresh();
      }
    } catch {
      toast.error("তথ্য আপডেট করার সময় সমস্যা হয়েছে।", {
        id: "profile-update-catch-error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Name */}
      <div>
        <label
          htmlFor="profile-name"
          className="mb-2 block text-[14px] font-medium leading-[21px] text-[#1D271F]"
        >
          নাম
        </label>

        <input
          id="profile-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="আপনার নাম লিখুন"
          autoComplete="name"
          disabled={loading}
          className="h-10 w-full rounded-lg border border-[rgba(29,39,31,0.2)] bg-[#FAFCFA] px-3 text-[14px] leading-5 text-[#1D271F] outline-none transition placeholder:text-[#7A837D] focus:border-[#05893E] focus:ring-1 focus:ring-[#05893E] disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      {/* Update Button */}
      <button
        type="submit"
        disabled={loading}
        className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-lg bg-green-500 px-4 text-[14px] font-semibold leading-[21px] text-[#F3FBF4] transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
      </button>
    </form>
  );
}
