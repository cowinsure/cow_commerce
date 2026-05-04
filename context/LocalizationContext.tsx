// core/context/LocalizationContext.tsx
"use client";
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

// Import your translation files
import en from "../locales/en.json";
import bn from "../locales/bn.json";

type Locale = "en" | "bn";

type TranslationKey = string;

interface LocalizationContextProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (
    key: TranslationKey,
    variables?: Record<string, string | number>,
  ) => string;
}

const LocalizationContext = createContext<LocalizationContextProps | undefined>(
  undefined,
);

export const LocalizationProvider = ({ children }: { children: ReactNode }) => {
  // Initialize from localStorage or default to 'bn' using lazy initialization
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== "undefined") {
      const savedLocale = localStorage.getItem("locale") as Locale | null;
      if (savedLocale && (savedLocale === "en" || savedLocale === "bn")) {
        return savedLocale;
      }
    }
    return "bn";
  });

  // Save locale to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  // Memoize the translation function to maintain stable reference
  const t = useCallback(
    (
      key: TranslationKey,
      variables?: Record<string, string | number>,
    ): string => {
      const dict = locale === "en" ? en : bn;
      let text = dict[key as keyof typeof dict] || key;

      if (variables) {
        Object.entries(variables).forEach(([variable, value]) => {
          text = text.replace(new RegExp(`{${variable}}`, "g"), String(value));
        });
      }

      return text;
    },
    [locale],
  );

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
  };

  return (
    <LocalizationContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export function useLocalization() {
  const context = useContext(LocalizationContext);
  if (!context)
    throw new Error("useLocalization must be used within LocalizationProvider");
  return context;
}
