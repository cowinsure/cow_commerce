// components/LanguageSwitcher.tsx
"use client";

import { useLocalization } from "@/context/LocalizationContext";

const LanguageSwitcher = () => {
  const { locale, setLocale } = useLocalization();
  const isBN = locale === "bn"; // Changed from "ar" to "bn"

  const toggleLocale = () => {
    setLocale(isBN ? "en" : "bn"); // Changed from "ar" to "bn"
  };

  return (
    <button
      title="Change language"
      onClick={toggleLocale}
      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
    >
      <span
        className={`text-sm font-medium ${isBN ? "text-gray-400" : "text-blue-600 font-bold"}`}
      >
        EN
      </span>
      <span className="text-gray-300">|</span>
      <span
        className={`text-sm font-medium ${isBN ? "text-blue-600 font-bold" : "text-gray-400"}`}
      >
        BN
      </span>
    </button>
  );
};

export default LanguageSwitcher;
