"use client";

import { motion } from "framer-motion";
import { useLocalization } from "@/context/LocalizationContext";

const LanguageSwitcher = () => {
  const { locale, setLocale } = useLocalization();
  const isBN = locale === "bn";

  const toggleLocale = () => {
    setLocale(isBN ? "en" : "bn");
  };

  return (
    <button
      onClick={toggleLocale}
      title={isBN ? "Switch to English" : "বাংলায় পরিবর্তন করুন"}
      className="
        relative flex items-center
        h-8 w-22 rounded-full
        bg-emerald-700 hover:bg-gray-200
        transition-colors duration-200
        cursor-pointer
        select-none
      "
    >
      {/* Sliding Pill Background */}
      <motion.div
        className="
          absolute top-0.5 bottom-0.5
          w-10.5 rounded-full
          bg-emerald-950 shadow-sm
        "
        animate={{
          left: isBN ? "calc(100% - 44px)" : "2px",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
      />

      {/* EN Label */}
      <span
        className={`
          relative z-10 flex-1 text-center text-xs font-bold
          transition-colors duration-200
          ${isBN ? "text-emerald-950" : "text-emerald-300"}
        `}
      >
        EN
      </span>

      {/* BN Label */}
      <span
        className={`
          relative z-10 flex-1 text-center text-xs font-bold
          transition-colors duration-200
          ${isBN ? "text-emerald-300" : "text-emerald-950"}
        `}
      >
        BN
      </span>
    </button>
  );
};

export default LanguageSwitcher;