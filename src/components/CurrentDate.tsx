"use client";

export default function CurrentDate() {
  const formattedDate = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <span className="block truncate text-[12px] font-normal leading-4 text-[#7A837D]">
      {formattedDate}
    </span>
  );
}