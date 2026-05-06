import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope, Hind_Siliguri } from "next/font/google";
import { ToastProvider } from "@/components/ui/Toast";
import "./globals.css";
import { Navbar } from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { LocalizationProvider } from "@/context/LocalizationContext";
import { cookies } from "next/headers";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import Script from "next/script";
import AnalyticsTracker from "@/components/AnalyticsTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-headline",
  subsets: ["latin"],
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-bangla",
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fresh Buy - Livestock Marketplace",
  description: "Premium livestock commerce platform for the digital age",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read locale from cookie on server
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value === "en" ? "en" : "bn";


  return (
    <html
      lang={locale}
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        ${manrope.variable}
        ${hindSiliguri.variable}
        h-full antialiased
      `}
    >
      <body className="min-h-full flex flex-col">
        {/* Google tag (gtag.js) */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG_KEY}`}
        ></Script>
        <Script id="google-analytics" strategy="afterInteractive">
          {`  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_TAG_KEY}');`}
        </Script>
        <LocalizationProvider>
          <Navbar />
          <ToastProvider>
            {children}
            <AnalyticsTracker />
            <WhatsAppButton />
          </ToastProvider>
          <Footer />
        </LocalizationProvider>
      </body>
    </html>
  );
}
