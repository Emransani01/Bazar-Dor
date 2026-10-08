import Image from "next/image";
import { connection } from "next/server";

export default async function Hero() {
  await connection();

  const date = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <section className="px-4 pt-6 sm:px-6 lg:px-4">
      <div className="mx-auto flex max-w-[1120px] flex-col overflow-hidden rounded-[24px] border border-[#E1E8E1] bg-[#FAFCFA] sm:min-h-[283px] lg:flex-row">
        {/* Hero content */}
        <div className="flex min-w-0 flex-1 flex-col justify-center px-5 py-7 sm:px-8 sm:py-8 lg:px-10">
          {/* Date */}
          <div className="w-fit rounded-full bg-[#F0F5F0] px-3 py-1 text-[12px] font-medium leading-[18px] text-green-600">
            {date}
          </div>

          {/* Heading */}
          <h1 className="mt-4 max-w-[620px] text-[30px] font-bold leading-[38px] tracking-[-0.3px] text-[#1D271F] sm:text-[36px] sm:leading-[45px]">
            আজকের বাজারের দাম
            <br />
            এক নজরে
          </h1>

          {/* Description */}
          <p className="mt-3 max-w-[625px] text-[14px] font-normal leading-5 text-[#5F6962] sm:text-[16px] sm:leading-6">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজারদর, দামের
            পরিবর্তন এবং বাজারভিত্তিক তথ্য এক জায়গায় দেখুন।
          </p>

          {/* CTA */}
          <a
            href="#সব-পণ্য"
            className="btn btn-sm mt-5 w-fit rounded-lg border-0 bg-green-500 px-4 text-[14px] font-semibold leading-[21px] text-white transition hover:bg-green-600 sm:btn-md"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        {/* Hero image */}
        <div className="relative h-[220px] w-full shrink-0 sm:h-[260px] lg:h-auto lg:w-[315px]">
          <Image
            src="/hero.png"
            alt="আজকের বাজারের পণ্য"
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 315px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
