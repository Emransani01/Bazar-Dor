export default function Footer() {
  return (
    <footer className="border-t border-[#E1E8E1] bg-[#FAFCFA]">
      <div className="mx-auto flex min-h-[69px] max-w-[1152px] flex-col items-start justify-center gap-2 px-4 py-5 text-[12px] leading-[18px] text-[#5F6962] sm:px-5 sm:py-5 md:flex-row md:items-center md:justify-between md:gap-6 lg:px-4">
        <p className="min-w-0">বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>

        <p className="min-w-0 md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}
