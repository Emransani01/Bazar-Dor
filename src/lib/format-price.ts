const bengaliDigits = "০১২৩৪৫৬৭৮৯";
const englishDigits = "0123456789";

export function toBengaliDigits(value: string | number) {
  return String(value)
    .split("")
    .map((char) => {
      const index = englishDigits.indexOf(char);

      return index !== -1 ? bengaliDigits[index] : char;
    })
    .join("");
}

export function toEnglishDigits(value: string | number) {
  return String(value)
    .split("")
    .map((char) => {
      const index = bengaliDigits.indexOf(char);

      return index !== -1 ? englishDigits[index] : char;
    })
    .join("");
}

export function formatBengaliPrice(value: string | number) {
  const number = Number(toEnglishDigits(value).replace(/,/g, ""));

  if (Number.isNaN(number)) {
    return "০";
  }

  return new Intl.NumberFormat("en-US")
    .format(number)
    .split("")
    .map((char) => {
      const index = englishDigits.indexOf(char);

      return index !== -1 ? bengaliDigits[index] : char;
    })
    .join("");
}

export function getUnitLabel(unit: string) {
  const labels: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };

  return labels[unit] ?? unit;
}
