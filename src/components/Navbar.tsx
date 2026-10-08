import Link from "next/link";

import CategoryNav from "./CategoryNav";
import AuthButtons from "./AuthButtons";
import CurrentDate from "./CurrentDate";

export default function Navbar() {
  return (
    <header className="border-b border-[#E1E8E1] bg-[#FAFCFA]">
      <div className="mx-auto flex h-[68px] max-w-[1164px] items-center justify-between gap-4 px-4 sm:px-5">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3"
          aria-label="বাজার দর হোম"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500 text-[18px] leading-none text-white">
            🛒
          </span>

          <span className="min-w-0">
            <span className="block truncate text-[20px] font-bold leading-7 text-[#1D271F]">
              বাজার দর
            </span>

            <CurrentDate />
          </span>
        </Link>

        <AuthButtons />
      </div>

      <div className="h-[50px] border-t border-[#F0F5F0]">
        <CategoryNav />
      </div>
    </header>
  );
}
