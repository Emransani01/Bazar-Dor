"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type CategoryNavItemProps = {
  href: string;
  icon: string;
  label: string;
};

export default function CategoryNavItem({
  href,
  icon,
  label,
}: CategoryNavItemProps) {
  const pathname = usePathname();

  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`flex h-8 shrink-0 items-center gap-1.5 rounded-lg border px-[13px] text-[12px] font-semibold leading-[18px] transition-colors ${
        isActive
          ? "border-green-600 bg-green-500 text-white"
          : "border-transparent text-[#1D271F] hover:border-[#CCD0CC] hover:bg-[#DADEDA]"
      }`}
    >
      <span className="text-[12px] leading-none">{icon}</span>

      <span>{label}</span>
    </Link>
  );
}