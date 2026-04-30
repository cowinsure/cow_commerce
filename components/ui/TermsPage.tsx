"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalization } from "@/context/LocalizationContext";
import {
  ChevronDown,
  Beef,
  ShieldCheck,
  MapPin,
  AlertTriangle,
  Thermometer,
  CheckCircle2,
  ScrollText,
  Menu,
  X,
  ArrowUp,
  DollarSign,
  Users,
  Ban,
  HeartPulse,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────
interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

// ─── Animation Variants ──────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
};

// ─── Components ──────────────────────────────────────────

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
      <motion.div
        className="h-full bg-emerald-600"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 p-3 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function Accordion({
  title,
  icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gray-400"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 pt-2 border-t border-gray-100 text-gray-700 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function InfoCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4"
    >
      <div className="p-2.5 bg-amber-50 text-amber-700 rounded-xl shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{text}</p>
      </div>
    </motion.div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 mt-4">
      {items.map((item, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="flex items-start gap-3"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          <span className="text-gray-700 leading-relaxed">{item}</span>
        </motion.li>
      ))}
    </ul>
  );
}

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6">
      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        {title}
      </h4>
      <div className="pl-4">{children}</div>
    </div>
  );
}

function TableBlock({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | React.ReactNode)[][];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 my-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-emerald-50">
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left font-semibold text-emerald-900"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
            >
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-gray-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────
export default function TermsPage({
  hideNavigation = false,
}: {
  hideNavigation?: boolean;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { t } = useLocalization();

  const sections: Section[] = [
    {
      id: "full-service",
      title: "1. QURBANI – FULL SERVICE (PROCESSED CATTLE)",
      icon: <Beef className="w-5 h-5" />,
      content: <FullServiceSection />,
    },
    {
      id: "shared-qurbani",
      title: "2. SHARED QURBANI (PROCESSED CATTLE)",
      icon: <Users className="w-5 h-5" />,
      content: <SharedQurbaniSection />,
    },
    {
      id: "live-cattle",
      title: "3. LIVE CATTLE QURBANI",
      icon: <HeartPulse className="w-5 h-5" />,
      content: <LiveCattleSection />,
    },
    {
      id: "general",
      title: "4. GENERAL TERMS (APPLICABLE TO ALL SERVICES)",
      icon: <ScrollText className="w-5 h-5" />,
      content: <GeneralTermsSection />,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -50% 0px",
        threshold: 0.3,
      },
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 100;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* <ScrollProgress /> */}
      <BackToTop />

      {/* ─── Hero ───────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-linear-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.08]">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <pattern
              id="grid"
              width="12"
              height="12"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 12 0 L 0 0 0 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        {/* Soft glow accents */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-32 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-emerald-100 text-sm font-medium mb-8"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>{t("terms_hero_badge")}</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6"
            >
              {t("terms_hero_title")}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-emerald-100/80 text-lg md:text-xl max-w-2xl leading-relaxed"
            >
              {t("terms_hero_subtitle")}
            </motion.p>

            {/* Optional subtle divider */}
            <motion.div
              variants={itemVariants}
              className="mt-10 w-24 h-[2px] bg-emerald-400/40 rounded-full"
            />
          </motion.div>
        </div>

        {/* Bottom fade */}
        {/* <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent" /> */}
      </header>

      {/* ─── Sticky Nav ─────────────────────────────────── */}
      {!hideNavigation && (
        <nav className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="max-w-screen-2xl mx-auto px-6">
            <div className="flex items-center justify-between h-14">
              <div className="hidden md:flex items-center gap-1 overflow-x-auto w-full">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollToSection(s.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                      activeSection === s.id
                        ? "bg-emerald-100 text-emerald-800"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
              <button
                className="md:hidden p-2 text-gray-600"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden border-t border-gray-200 bg-white overflow-hidden"
              >
                <div className="px-6 py-3 space-y-1">
                  {sections.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => scrollToSection(s.id)}
                      className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        activeSection === s.id
                          ? "bg-emerald-50 text-emerald-800"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      )}

      {/* ─── Main Content ───────────────────────────────── */}
      <main className="max-w-screen-2xl mx-auto px-6 py-12 space-y-16">
        {/* Quick Info Cards */}
        {!hideNavigation && (
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <InfoCard
              icon={<MapPin className="w-5 h-5" />}
              title="সেবার এলাকা"
              text="শুধুমাত্র ঢাকা শহর ও ঢাকা মহানগর এলাকার মধ্যে উপলব্ধ।"
            />
            <InfoCard
              icon={<Thermometer className="w-5 h-5" />}
              title="কোল্ড চেইন"
              text="প্রক্রিয়াজাতকরণ ও ডেলিভারির পুরো সময়জুড়ে মাংস ০°সে থেকে ৪°সে তাপমাত্রায় সংরক্ষিত থাকে।"
            />
            <InfoCard
              icon={<Ban className="w-5 h-5" />}
              title="ফেরতযোগ্য নয়"
              text="একবার নিশ্চিত হওয়ার পর সকল বুকিং সম্পূর্ণরূপে বাতিল অযোগ্য এবং অর্থ ফেরতযোগ্য নয়।"
            />
          </motion.section>
        )}

        {/* Sections */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="space-y-6"
        >
          {sections.map((section) => (
            <div key={section.id} id={section.id}>
              <Accordion
                title={section.title}
                icon={section.icon}
                defaultOpen={section.id === "full-service"}
              >
                {section.content}
              </Accordion>
            </div>
          ))}
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-emerald-900 text-emerald-100 rounded-2xl p-8 text-center"
        >
          <ShieldCheck className="w-10 h-10 mx-auto mb-4 text-emerald-400" />
          <h3 className="text-xl font-semibold text-white mb-2">
            InsureCow নির্বাচন করার জন্য আপনাকে ধন্যবাদ
          </h3>
          <p className="text-emerald-300 max-w-xl mx-auto">
            যেকোনো অর্ডার নিশ্চিত করার মাধ্যমে আপনি এখানে বর্ণিত সকল শর্তাবলি,
            নীতিমালা এবং প্রযোজ্য বিধানসমূহ স্বীকার ও মেনে নিচ্ছেন। সকল কুরবানির
            কার্যক্রম ইসলামী নীতিমালা এবং হালাল প্রক্রিয়াকরণ মানদণ্ড অনুসারে
            পরিচালিত হয়।
          </p>
        </motion.div>
      </main>
    </div>
  );
}

// ─── Section 1: Full Service ─────────────────────────────
function FullServiceSection() {
  return (
    <div className="space-y-6">
      {/* 1.1 Service Area */}
      <SubSection title="১.১ সেবার এলাকা">
        <p>এই সেবাটি শুধুমাত্র ঢাকা শহরের মধ্যে উপলব্ধ।</p>
      </SubSection>

      {/* 1.2 Meat Processing & Delivery */}
      <SubSection title="১.২ মাংস প্রক্রিয়াজাতকরণ ও ডেলিভারি সময়সূচি (খাদ্য নিরাপত্তা মানসম্মত)">
        <BulletList
          items={[
            "সমস্ত প্রক্রিয়াজাত মাংস স্বীকৃত খাদ্য নিরাপত্তা মানদণ্ড অনুসারে হ্যান্ডলিং, প্রক্রিয়াজাতকরণ, সংরক্ষণ এবং পরিবহন করা হবে।",
            "প্রক্রিয়াজাত মাংস ঈদের ২য়, ৩য় এবং ৪র্থ দিনে (Eid Day +2, +3 এবং +4) তাজা ঠান্ডা অবস্থায় (০°সে থেকে ৪°সে তাপমাত্রায় সংরক্ষিত) সরবরাহ করা হবে।",
            "ঈদের ৫ম দিন (Eid Day +5) থেকে পরবর্তী ডেলিভারির ক্ষেত্রে, InsureCow কার্যক্রমগত সক্ষমতার ভিত্তিতে প্রক্রিয়াজাতকরণ, সংরক্ষণ এবং পরিবহনের পুরো সময়জুড়ে মাংসকে নিয়ন্ত্রিত কোল্ড চেইন (০°সে থেকে ৪°সে) এর মধ্যে সংরক্ষণের ব্যবস্থা করবে।",
            "পণ্য নিরাপত্তা, স্বাস্থ্যবিধি এবং গুণগত মান বজায় রাখতে InsureCow ইনসুলেটেড, ফুড-গ্রেড প্যাকেজিং এবং রেফ্রিজারেটেড পরিবহন ব্যবস্থা ব্যবহার করবে।",
            "মাংস গ্রহণের পর এর সতেজতা ও নিরাপত্তা বজায় রাখতে গ্রাহককে অবিলম্বে উপযুক্ত রেফ্রিজারেশন (০°সে থেকে ৪°সে) অথবা ফ্রিজিং অবস্থায় সংরক্ষণের পরামর্শ দেওয়া হচ্ছে।",
          ]}
        />
      </SubSection>

      {/* 1.3 Booking & Payment */}
      <SubSection title="১.৩ বুকিং ও পেমেন্ট">
        <BulletList
          items={[
            "বুকিং সম্পূর্ণরূপে প্রাপ্যতার উপর নির্ভরশীল এবং ঈদুল আযহার ৫ (পাঁচ) দিন পূর্বে বুকিং বন্ধ হয়ে যাবে।",
            "অর্ডার প্রাথমিকভাবে নিশ্চিত করতে ন্যূনতম ৫০% অগ্রিম পেমেন্ট আবশ্যক।",
            "অবশিষ্ট ৫০% অর্থ বুকিংয়ের সময় InsureCow কর্তৃক নির্ধারিত সময়সীমার মধ্যে পরিশোধ করতে হবে।",
            "নির্ধারিত সময়সীমার মধ্যে অবশিষ্ট অর্থ পরিশোধে ব্যর্থ হলে, কোনো পূর্ব নোটিশ ছাড়াই অর্ডার স্বয়ংক্রিয়ভাবে বাতিল হয়ে যাবে।",
            "এক্ষেত্রে অগ্রিম প্রদত্ত অর্থ সম্পূর্ণরূপে অ-ফেরতযোগ্য হিসেবে বাজেয়াপ্ত হবে এবং InsureCow উক্ত গরুটি অন্য গ্রাহকের কাছে পুনরায় বরাদ্দ করার অধিকার সংরক্ষণ করে।",
          ]}
        />

        <div className="mt-6 p-5 bg-amber-50 border border-amber-200 rounded-xl">
          <h5 className="font-semibold text-amber-900 mb-4 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            মূল্য ও পেমেন্ট সুরক্ষা সংক্রান্ত শর্তাবলি
          </h5>
          <div className="space-y-4 text-sm">
            <div>
              <span className="font-semibold text-amber-900">
                মূল্য স্থির থাকার কোনো নিশ্চয়তা নেই:
              </span>{" "}
              <span className="text-amber-800">
                বুকিংয়ের সময় প্রদত্ত প্রাথমিক মূল্য নির্ধারিত সময়সীমার মধ্যে
                সম্পূর্ণ অর্থ পরিশোধ না করা পর্যন্ত নিশ্চিত নয়। InsureCow
                নির্ধারিত পেমেন্ট সময়সীমার পর কোনো মূল্য লক সুবিধা প্রদান করে
                না।
              </span>
            </div>

            <div>
              <span className="font-semibold text-amber-900">
                মূল্য সংশোধনের অধিকার:
              </span>{" "}
              <span className="text-amber-800">
                গ্রাহক নির্ধারিত সময়সীমার মধ্যে অবশিষ্ট অর্থ পরিশোধে ব্যর্থ
                হলে, InsureCow চূড়ান্ত পেমেন্টের সময় প্রচলিত গরুর বাজারদর,
                লজিস্টিক ব্যয় এবং প্রক্রিয়াজাতকরণ খরচ অনুযায়ী মোট পরিশোধযোগ্য
                অর্থ পুনর্নির্ধারণ করার অধিকার সংরক্ষণ করে।
              </span>
            </div>

            <div>
              <span className="font-semibold text-amber-900">
                গতিশীল মূল্য নির্ধারণ ধারা:
              </span>{" "}
              <span className="text-amber-800">
                কুরবানির সময় গরু এবং সংশ্লিষ্ট সেবার মূল্য বাজারের ওঠানামা,
                মৌসুমি চাহিদা, সরবরাহ শৃঙ্খলের অবস্থা এবং পরিচালন ব্যয়ের উপর
                নির্ভরশীল। InsureCow কর্তৃক জানানো যেকোনো সংশোধিত মূল্য চূড়ান্ত
                ও বাধ্যতামূলক হবে, এবং হালনাগাদ অর্থের পূর্ণ পরিশোধ ও গ্রহণের
                পরই অর্ডার কার্যকর হবে।
              </span>
            </div>

            <div>
              <span className="font-semibold text-amber-900">
                নির্ধারিত বা সংশোধিত সময়সীমার মধ্যে সম্পূর্ণ অর্থ গ্রহণের পরই
                একটি অর্ডার সম্পূর্ণরূপে নিশ্চিত বলে গণ্য হবে।
              </span>
            </div>
          </div>
        </div>
      </SubSection>

      {/* 1.4 Processing Charges */}
      <SubSection title="১.৪ প্রক্রিয়াজাতকরণ চার্জ (প্রতি গরু)">
        <p className="text-sm text-gray-600 mb-4">
          ফুল-সার্ভিস কুরবানি প্যাকেজের আওতায় গরু জবাই, স্বাস্থ্যসম্মত
          প্রক্রিয়াজাতকরণ, প্যাকেজিং এবং ডেলিভারির জন্য নিম্নোক্ত চার্জ
          প্রযোজ্য হবে:
        </p>

        <TableBlock
          headers={[
            "গরুর মূল্যসীমা (টাকা)",
            "ঈদের ২য় দিন",
            "ঈদের ৩য় দিন",
            "ঈদের ৪র্থ দিন",
            "ঈদের ৫ম দিন ও পরবর্তী",
          ]}
          rows={[
            [
              "১,৩০,০০০ টাকার নিচে",
              "২৪,০০০",
              "১৫,০০০ (৩,০০০ টাকা ছাড়সহ)",
              "১৩,০০০",
              "১৩,০০০ (তাজা ঠান্ডা)",
            ],
            [
              "১,৩০,০০০ – ১,৮০,০০০",
              "২৫,০০০",
              "১৬,০০০ (৩,০০০ টাকা ছাড়সহ)",
              "১৪,০০০",
              "১৪,০০০ (তাজা ঠান্ডা)",
            ],
            [
              "১,৮০,০০০ টাকার উপরে",
              "২৭,০০০",
              "১৮,০০০ (৩,০০০ টাকা ছাড়সহ)",
              "১৬,০০০",
              "১৬,০০০ (তাজা ঠান্ডা)",
            ],
          ]}
        />

        <BulletList
          items={[
            "উপরোক্ত চার্জের মধ্যে জবাই, মানসম্মত প্রক্রিয়াজাতকরণ, স্বাস্থ্যসম্মত প্যাকেজিং এবং ঢাকা শহরের মধ্যে লাস্ট-মাইল ডেলিভারি অন্তর্ভুক্ত রয়েছে।",
            "ঈদের ৩য় দিনের জন্য প্রযোজ্য ছাড় তালিকাভুক্ত মূল্যের মধ্যেই সমন্বয় করা হয়েছে; এটি নির্দিষ্ট সময়ের জন্য প্রযোজ্য এবং হস্তান্তরযোগ্য নয়।",
            "বিশেষ হ্যান্ডলিং, কাস্টম প্রক্রিয়াজাতকরণ অথবা অনাকাঙ্ক্ষিত পরিচালন ব্যয়ের ক্ষেত্রে, গ্রাহকের পূর্ব সম্মতি সাপেক্ষে চার্জ পরিবর্তিত হতে পারে।",
          ]}
        />
      </SubSection>

      {/* 1.5 Meat Processing Standards */}
      <SubSection title="১.৫ মাংস প্রক্রিয়াজাতকরণের মানদণ্ড">
        <BulletList
          items={[
            "স্বাস্থ্যসম্মত মাংস প্রক্রিয়াজাতকরণ প্রটোকল অনুসারে কারকাসকে সমান ও মানসম্মত কাটে প্রক্রিয়াজাত করা হবে (প্রতি কেজিতে আনুমানিক ১৭–১৮টি অংশ)।",
            "স্বাস্থ্যবিধি, নিরাপত্তা এবং পরিমাণ নিয়ন্ত্রণ নিশ্চিত করতে সমস্ত মাংস ৩ কেজি ওজনের ফুড-গ্রেড, লিক-প্রুফ পলি প্যাকে প্যাক করা হবে।",
            "দক্ষ হ্যান্ডলিং এবং কোল্ড-চেইন ব্যবস্থাপনার জন্য প্রতিটি মাস্টার কার্টনে সর্বোচ্চ ১৫ কেজি (৫ × ৩ কেজি প্যাক) রাখা হবে।",
            "কলিজা, হৃদপিণ্ড, কিডনি, ফুসফুস এবং প্লীহাসহ সমস্ত ভুঁড়ি ও অভ্যন্তরীণ অঙ্গ আলাদাভাবে স্বাস্থ্যসম্মতভাবে প্রক্রিয়াজাত ও প্যাক করা হবে।",
            "মাথার মাংস, মগজ এবং পায়াসহ বিশেষ কাটগুলো পৃথকভাবে প্যাক ও লেবেল করা হবে।",
            "অখাদ্য উপজাত (যেমন অন্ত্র ও অতিরিক্ত চর্বি) গ্রাহক বুকিংয়ের সময় অন্যথা অনুরোধ না করলে, অনুমোদিত স্বাস্থ্যবিধি ও পরিবেশগত মানদণ্ড অনুসারে ব্যবস্থাপনা ও নিষ্পত্তি করা হবে।",
          ]}
        />
      </SubSection>

      {/* 1.6 Optional Bowels Collection */}
      <SubSection title="১.৬ ঐচ্ছিক ভুঁড়ি সংগ্রহ (ব্যাখ্যা)">
        <p className="text-sm text-gray-500 mb-3 italic">
          এই ধারাটি জবাইয়ের পর পশুর ভুঁড়ি (অন্ত্র এবং সংশ্লিষ্ট অখাদ্য
          অভ্যন্তরীণ অংশ) সংগ্রহের ক্ষেত্রে গ্রাহকের একটি ঐচ্ছিক পছন্দ নির্ধারণ
          করে।
        </p>
        <BulletList
          items={[
            "প্রক্রিয়াজাতকরণের পর ভুঁড়ি এবং অখাদ্য অভ্যন্তরীণ উপজাতসমূহ সাধারণত খাদ্য নিরাপত্তা ও পরিবেশগত মানদণ্ড অনুসারে স্বাস্থ্যসম্মতভাবে পৃথক করে অপসারণ করা হয়।",
            "তবে, গ্রাহক অতিরিক্ত সেবা সুবিধা হিসেবে ক্রয়ের সময় ভুঁড়ি সংগ্রহের বিকল্প নির্বাচন করতে পারেন।",
            "এই বিকল্প নির্বাচন করা হলে, ভুঁড়ি আলাদাভাবে সংরক্ষণ, প্যাকেজিং এবং নির্ধারিত InsureCow আউটলেট থেকে সংগ্রহের জন্য উপলব্ধ করা হবে।",
            "ঈদুল আজহার ৫ম দিন বা তার পর থেকে, কার্যক্রমের সময়সূচি ও আউটলেটের প্রাপ্যতা সাপেক্ষে সংগ্রহ করা যাবে।",
            "এই সুবিধাটি সম্পূর্ণরূপে ঐচ্ছিক এবং বুকিংয়ের সময় নিশ্চিত করতে হবে; অর্ডার নিশ্চিত হওয়ার পর করা অনুরোধ গ্রহণযোগ্য নাও হতে পারে।",
          ]}
        />
      </SubSection>

      {/* 1.7 Hide Value & Ownership */}
      <SubSection title="১.৭ চামড়ার মূল্য ও মালিকানা ধারা">
        <p className="mb-4">
          চামড়ার মূল্য বলতে জবাইয়ের ফলে প্রাপ্ত পশুর চামড়ার আনুমানিক ন্যায্য
          বাজারমূল্যকে বোঝায়, যা বুকিংয়ের সময় গরুর নির্ধারিত মূল্যসীমার
          ভিত্তিতে নির্ধারণ করা হয়।
        </p>
        <TableBlock
          headers={["গরুর মূল্যসীমা (টাকা)", "চামড়ার মূল্য (প্রতি গরু)"]}
          rows={[
            ["১,৩০,০০০ টাকার নিচে", "৭০০"],
            ["১,৩০,০০০ – ১,৮০,০০০", "৯১০"],
            ["১,৮০,০০০ টাকার বেশি", "১,১২০"],
          ]}
        />

        <div className="space-y-4 mt-4">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <h6 className="font-semibold text-gray-900 mb-2">
              ১.৭.১ চামড়ার মালিকানা
            </h6>
            <BulletList
              items={[
                "লিখিতভাবে ভিন্ন কোনো চুক্তি না থাকলে, জবাই ও প্রক্রিয়াজাতকরণের পর চামড়া সম্পূর্ণরূপে InsureCow-এর মালিকানাধীন থাকবে।",
                "গ্রাহক স্বীকার করেন যে, চামড়া কুরবানির প্রক্রিয়াজাতকরণ সেবার সামগ্রিক অর্থনৈতিক কাঠামোর একটি অংশ।",
              ]}
            />
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <h6 className="font-semibold text-gray-900 mb-2">
              ১.৭.২ চামড়ার মূল্য সমন্বয়
            </h6>
            <BulletList
              items={[
                "উল্লিখিত চামড়ার মূল্য একটি আনুমানিক রেফারেন্স মূল্য, যা অভ্যন্তরীণ বণ্টন ও মূল্য নির্ধারণ কাঠামোর জন্য ব্যবহৃত হয়।",
                "InsureCow সামগ্রিক সেবামূল্য কাঠামোর অংশ হিসেবে প্রক্রিয়াজাতকরণ, লজিস্টিকস বা অন্যান্য সেবার খরচের সাথে চামড়ার মূল্য সমন্বয়, সমন্বিতকরণ বা অফসেট করার অধিকার সংরক্ষণ করে।",
                "এ ধরনের কোনো সমন্বয় নিশ্চিত অর্ডারের অধীনে নির্ধারিত মাংস সরবরাহের বাধ্যবাধকতাকে প্রভাবিত করবে না।",
              ]}
            />
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <h6 className="font-semibold text-gray-900 mb-2">
              ১.৭.৩ বাজারমূল্য পরিবর্তন ধারা
            </h6>
            <BulletList
              items={[
                "চামড়ার মূল্য চামড়া ও উপজাত শিল্পের বাজার ওঠানামার উপর নির্ভরশীল।",
                "বর্তমান বাজার পরিস্থিতি প্রতিফলিত করতে InsureCow পূর্ব নোটিশ ছাড়াই সময়ে সময়ে চামড়ার মূল্য সংশোধন করতে পারে।",
              ]}
            />
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <h6 className="font-semibold text-gray-900 mb-2">
              ১.৭.৪ পৃথক দাবি অগ্রহণযোগ্য
            </h6>
            <BulletList
              items={[
                "InsureCow কর্তৃক স্বাক্ষরিত লিখিত চুক্তিতে স্পষ্টভাবে উল্লেখ না থাকলে, গ্রাহক চামড়ার মূল্য সম্পর্কিত কোনো পৃথক মালিকানা দাবি, অর্থ ফেরতের দাবি বা আর্থিক অধিকার দাবি করতে পারবেন না।",
              ]}
            />
          </div>
        </div>
      </SubSection>

      {/* 1.8 Delivery Conditions */}
      <SubSection title="১.৮ ডেলিভারি শর্তাবলি">
        <BulletList
          items={[
            "গ্রাহককে ঢাকা শহরের মধ্যে সম্পূর্ণ ও সঠিক ডেলিভারি ঠিকানা প্রদান করতে হবে, যার মধ্যে বৈধ ল্যান্ডমার্ক, বাসা/অ্যাপার্টমেন্টের বিবরণ এবং প্রাপকের সক্রিয় মোবাইল নম্বর অন্তর্ভুক্ত থাকবে।",
            "ডেলিভারি স্থানটি রেফ্রিজারেটেড পরিবহন যানবাহন (চিলার ভ্যান/ট্রাক) প্রবেশ ও নিরাপদে পণ্য খালাসের জন্য সম্পূর্ণ উপযোগী হতে হবে।",
            "রেফ্রিজারেটেড যানবাহনের জন্য প্রবেশপথ অনিরাপদ, সীমাবদ্ধ বা কার্যত অযোগ্য মনে হলে InsureCow সরাসরি বাসায় ডেলিভারি প্রত্যাখ্যান করার অধিকার সংরক্ষণ করে।",
            "এমন ক্ষেত্রে, InsureCow-এর লজিস্টিকস টিমের নির্ধারণ অনুযায়ী ঢাকা শহরের মধ্যে নিকটতম নিরাপদ ও প্রবেশযোগ্য সড়কপথ বা নির্ধারিত ড্রপ-অফ পয়েন্টে ডেলিভারি সম্পন্ন করা হবে।",
          ]}
        />

        <div className="mt-4 p-5 bg-red-50 border border-red-200 rounded-xl">
          <h6 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            ১.৮.১ দায়বদ্ধতা ও ডেলিভারি ব্যর্থতা ধারা
          </h6>
          <div className="space-y-3 text-sm text-red-800">
            <p>
              নিম্নলিখিত কারণসমূহে সৃষ্ট বিলম্ব, ডেলিভারি ব্যর্থতা বা সেবা
              বিঘ্নের জন্য InsureCow দায়ী থাকবে না:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                গ্রাহক কর্তৃক প্রদত্ত ভুল, অসম্পূর্ণ বা বিভ্রান্তিকর ঠিকানা
              </li>
              <li>অকার্যকর বা সংযোগবিহীন যোগাযোগ নম্বর</li>
              <li>ডেলিভারির সময় প্রাপক বা অনুমোদিত প্রতিনিধির অনুপস্থিতি</li>
              <li>
                নির্ধারিত সময় ও স্থানে ডেলিভারি গ্রহণে অস্বীকৃতি বা ব্যর্থতা
              </li>
              <li>
                সীমাবদ্ধ প্রবেশাধিকার, যানজট, নাগরিক বিধিনিষেধ বা ফোর্স মেজর
                পরিস্থিতি
              </li>
            </ul>

            <p className="mt-3">
              উপরোক্ত যেকোনো কারণে ডেলিভারি সম্পন্ন করা সম্ভব না হলে,
              InsureCow-এর অধিকার থাকবে:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>নিজস্ব বিবেচনায় ডেলিভারি পুনঃনির্ধারণ করা, অথবা</li>
              <li>
                নিকটবর্তী অন্য কোনো প্রবেশযোগ্য স্থানে ডেলিভারি সম্পন্ন করা,
                অথবা
              </li>
              <li>
                ডেলিভারির চেষ্টা নিশ্চিত হওয়ার পর অর্ডারকে সফলভাবে ডেলিভারিকৃত
                হিসেবে গণ্য করা
              </li>
            </ul>

            <p className="mt-3">
              পুনরায় ডেলিভারি বা ঠিকানা সংশোধনের ফলে সৃষ্ট অতিরিক্ত খরচ
              গ্রাহকের কাছ থেকে আদায় করা হতে পারে।
            </p>

            <p className="font-semibold mt-3">
              প্রদত্ত নির্দেশনা অনুযায়ী সদিচ্ছার সাথে একবার ডেলিভারির চেষ্টা
              করা হলে, অর্ডার সম্পূর্ণ ও সফলভাবে সম্পন্ন হয়েছে বলে গণ্য হবে এবং
              এ বিষয়ে কোনো দায় দাবি গ্রহণযোগ্য হবে না।
            </p>
          </div>
        </div>
      </SubSection>

      {/* 1.9 Animal Health & Replacement */}
      <SubSection title="১.৯ পশুর স্বাস্থ্য ও প্রতিস্থাপন">
        <BulletList
          items={[
            "নির্বাচিত কোনো গরু যদি অনুপযুক্ত, অসুস্থ, রোগাক্রান্ত বা InsureCow-এর স্বাস্থ্য ও মান নিয়ন্ত্রণ মানদণ্ড পূরণে ব্যর্থ বলে প্রতীয়মান হয়, তবে InsureCow প্রয়োজনীয় সংশোধনমূলক ব্যবস্থা গ্রহণের অধিকার সংরক্ষণ করে।",
            "InsureCow অযৌক্তিক বিলম্ব ছাড়াই গ্রাহককে অবহিত করবে এবং প্রয়োজনে পশুর অবস্থা সম্পর্কিত প্রাসঙ্গিক তথ্য প্রদান করবে।",
            "প্রাপ্যতা ও কার্যগত সক্ষমতা সাপেক্ষে, InsureCow সমমানের গুণগত মান, ওজনসীমা ও মূল্যের একটি বিকল্প পশুর ব্যবস্থা করবে।",
            "পশু প্রতিস্থাপনের সিদ্ধান্ত InsureCow-এর প্রাণিস্বাস্থ্য মূল্যায়ন ও গুণগত নিশ্চয়তা নীতিমালা অনুযায়ী গৃহীত হবে এবং সেবা ধারাবাহিকতার স্বার্থে তা চূড়ান্ত বলে বিবেচিত হবে।",
          ]}
        />
      </SubSection>

      {/* 1.10 Force Majeure */}
      <SubSection title="১.১০ ফোর্স মেজর">
        <BulletList
          items={[
            "InsureCow-এর যৌক্তিক নিয়ন্ত্রণের বাইরে সংঘটিত কোনো ঘটনার (ফোর্স মেজর) কারণে দায়িত্ব পালনে বিলম্ব, বিঘ্ন, স্থগিতাদেশ বা ব্যর্থতার জন্য InsureCow দায়ী থাকবে না।",
            "ফোর্স মেজর ঘটনার মধ্যে অন্তর্ভুক্ত থাকবে, তবে এতে সীমাবদ্ধ নয়: সরকারি বিধিনিষেধ বা নিয়ন্ত্রক পদক্ষেপ, প্রাকৃতিক দুর্যোগ, মহামারি, নাগরিক অস্থিরতা, ধর্মঘট, পরিবহন বিঘ্ন, অবকাঠামোগত ব্যর্থতা বা অন্য যেকোনো অপ্রত্যাশিত কার্যগত প্রতিবন্ধকতা।",
            "ফোর্স মেজর পরিস্থিতিতে InsureCow প্রয়োজন অনুসারে ডেলিভারির সময়সূচি স্থগিত, পুনঃনির্ধারণ বা পরিবর্তন করতে পারে।",
            "ডেলিভারি সময়সূচিতে কোনো গুরুত্বপূর্ণ পরিবর্তন হলে InsureCow যত দ্রুত সম্ভব গ্রাহককে অবহিত করার যুক্তিসঙ্গত প্রচেষ্টা করবে।",
            "এ ধরনের বিলম্ব বা পরিবর্তন চুক্তিভঙ্গ হিসেবে গণ্য হবে না এবং এর ফলে সৃষ্ট ক্ষতি, বিলম্ব বা অসুবিধার জন্য InsureCow কোনো দায় বহন করবে না।",
          ]}
        />
      </SubSection>

      {/* 1.11 Acceptance of Delivery */}
      <SubSection title="১.১১ ডেলিভারি গ্রহণ">
        <BulletList
          items={[
            "ডেলিভারির সময় গ্রাহক (অথবা অনুমোদিত প্রতিনিধি) বৈধ ক্রয় রসিদ প্রদর্শন করবেন এবং পণ্য সফলভাবে হস্তান্তর হয়েছে মর্মে Received Form-এ স্বাক্ষর করবেন।",
            "Received Form-এ স্বাক্ষরের পূর্বে, গ্রাহক ডেলিভারিকৃত পণ্যের অবস্থা, প্যাকেজিংয়ের অখণ্ডতা এবং অর্ডারের সাথে সামঞ্জস্য যাচাইয়ের জন্য যুক্তিসঙ্গত দৃশ্যমান পরিদর্শনের অধিকার রাখেন।",
            "গ্রাহক স্বীকার করেন যে, এই পরিদর্শন শুধুমাত্র বাহ্যিক ও তাৎক্ষণিকভাবে দৃশ্যমান অবস্থার মধ্যে সীমাবদ্ধ; এতে কোনো গভীর পরীক্ষা বা ভোগ-পরবর্তী মূল্যায়ন অন্তর্ভুক্ত নয়।",
            "Received Form-এ স্বাক্ষর বা অন্য যেকোনো সমতুল্য নিশ্চিতকরণ (প্রযোজ্য ক্ষেত্রে ইলেকট্রনিক স্বীকৃতিসহ) প্রদান করা মাত্র ডেলিভারি সম্পূর্ণ, চূড়ান্ত এবং গৃহীত বলে বিবেচিত হবে।",
            "পরিদর্শনের পর ডেলিভারি গ্রহণ করা হলে অর্ডার চূড়ান্ত বলে গণ্য হবে এবং InsureCow কর্তৃক নির্ধারিত প্রমাণিত গুরুতর অবহেলা ব্যতীত কোনো দাবি, বিরোধ, আপত্তি বা ক্ষতিপূরণের অনুরোধ গ্রহণযোগ্য হবে না।",
          ]}
        />
      </SubSection>

      {/* 1.12 Refund Policy */}
      <SubSection title="১.১২ অর্থ ফেরত নীতিমালা">
        <div className="p-5 bg-red-50 border border-red-200 rounded-xl">
          <BulletList
            items={[
              "সকল কুরবানির বুকিং নিশ্চিত হওয়ার পর সম্পূর্ণরূপে বাতিল অযোগ্য, পরিবর্তন অযোগ্য এবং অর্থ ফেরত অযোগ্য।",
              "পেমেন্ট ও অর্ডার নিশ্চিত করার পূর্বে গরুর বিবরণ, মূল্য, সেবার ধরন এবং ডেলিভারি শর্তাবলি পর্যালোচনা ও যাচাই করার সম্পূর্ণ দায়িত্ব গ্রাহকের।",
              "বুকিং নিশ্চিত করার মাধ্যমে গ্রাহক স্পষ্টভাবে স্বীকার করেন যে, তিনি নির্বাচিত পশু ও সংশ্লিষ্ট সেবাসমূহ সম্পূর্ণরূপে পর্যালোচনা, বুঝে গ্রহণ করেছেন এবং কুরবানির উদ্দেশ্যে তা সন্তোষজনক বলে বিবেচনা করেন।",
              "অর্ডার নিশ্চিত হওয়ার পর কোনো অবস্থাতেই অর্থ ফেরত, চার্জব্যাক বা বাতিলের অনুরোধ গ্রহণযোগ্য হবে না, যদি না InsureCow ব্যবস্থাপনা লিখিতভাবে অন্যথা সম্মতি প্রদান করে।",
            ]}
          />
        </div>
      </SubSection>
    </div>
  );
}

// ─── Section 2: Shared Qurbani ───────────────────────────
function SharedQurbaniSection() {
  return (
    <div className="space-y-6">
      <SubSection title="২.১ সেবার এলাকা">
        <p>এই সেবাটি শুধুমাত্র ঢাকা শহরের মধ্যে উপলব্ধ।</p>
      </SubSection>

      <SubSection title="২.২ সেবার কাঠামো">
        <BulletList
          items={[
            "ইসলামী কুরবানির বিধান অনুযায়ী প্রতিটি গরু সর্বোচ্চ ৭ (সাত) জন অংশগ্রহণকারীর মধ্যে ভাগ করা হয়।",
            "প্রদর্শিত মূল্য ১/৭ অংশের জন্য প্রযোজ্য, যার মধ্যে জবাই, প্রক্রিয়াজাতকরণ, প্যাকেজিং এবং ডেলিভারি খরচ অন্তর্ভুক্ত রয়েছে।",
            "শেয়ারভিত্তিক কুরবানি সেবার ক্ষেত্রে কোনো প্রকার প্রচারমূলক অফার, ছাড় বা মূল্য সমন্বয় প্রযোজ্য নয়।",
          ]}
        />
      </SubSection>

      <SubSection title="২.৩ ডেলিভারি ও সংগ্রহ">
        <BulletList
          items={[
            "প্রক্রিয়াজাত মাংস ঈদুল আজহার ৩ দিন পর (অর্থাৎ ঈদের ৪র্থ দিনে) সরবরাহ করা হবে।",
            "গ্রাহককে ঢাকা শহরের মধ্যে নির্ধারিত InsureCow সংগ্রহ কেন্দ্র থেকে তার অংশ সংগ্রহ করতে হবে।",
            "নির্ধারিত সময়ের মধ্যে সংগ্রহ করতে ব্যর্থ হলে সংরক্ষণ সীমাবদ্ধতা বা অতিরিক্ত হ্যান্ডলিং জটিলতা সৃষ্টি হতে পারে।",
          ]}
        />
      </SubSection>

      <SubSection title="২.৪ অর্থ ফেরত নীতিমালা">
        <div className="p-5 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-800 font-medium">
            সকল শেয়ারভিত্তিক কুরবানির বুকিং নিশ্চিত হওয়ার পর সম্পূর্ণরূপে
            বাতিল অযোগ্য এবং অর্থ ফেরত অযোগ্য।
          </p>
        </div>
      </SubSection>
    </div>
  );
}

// ─── Section 3: Live Cattle ──────────────────────────────
function LiveCattleSection() {
  return (
    <div className="space-y-6">
      <SubSection title="৩.১ সেবার এলাকা">
        <p>ডেলিভারি শুধুমাত্র ঢাকা মহানগর এলাকার মধ্যে সীমাবদ্ধ।</p>
      </SubSection>

      <SubSection title="৩.২ ডেলিভারি শর্তাবলি">
        <BulletList
          items={[
            "ঈদুল আজহার ২ থেকে ৪ দিন পূর্বে ডেলিভারি নির্ধারিত হবে।",
            "ডেলিভারির সময় এবং লজিস্টিকস প্রয়োজনীয়তার উপর নির্ভর করে ডেলিভারি চার্জ ৮,০০০ টাকা থেকে ১০,০০০ টাকার মধ্যে হবে।",
            "ঢাকার মধ্যে পশুবাহী পরিবহন যানবাহনের প্রবেশ, অবস্থান এবং পশু নামানোর জন্য পর্যাপ্ত স্থান নিশ্চিত করা গ্রাহকের দায়িত্ব।",
            "প্রবেশপথ সীমাবদ্ধ হলে, InsureCow-এর লজিস্টিকস টিমের সিদ্ধান্ত অনুযায়ী নিকটতম নিরাপদ ও প্রবেশযোগ্য স্থানে ডেলিভারি সম্পন্ন করা হবে।",
          ]}
        />
      </SubSection>

      <SubSection title="৩.৩ পেমেন্ট শর্তাবলি">
        <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl">
          <BulletList
            items={[
              "অর্ডার নিশ্চিত করার জন্য ১০০% অগ্রিম পরিশোধ বাধ্যতামূলক।",
              "আংশিক পেমেন্ট এবং চেক গ্রহণযোগ্য নয়।",
            ]}
          />
        </div>
      </SubSection>

      <SubSection title="৩.৪ অর্থ ফেরত নীতিমালা">
        <div className="p-5 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-800 font-medium">
            সকল লাইভ ক্যাটল কুরবানির অর্ডার নিশ্চিত হওয়ার পর সম্পূর্ণরূপে বাতিল
            অযোগ্য এবং অর্থ ফেরত অযোগ্য।
          </p>
        </div>
      </SubSection>
    </div>
  );
}

// ─── Section 4: General Terms ────────────────────────────
function GeneralTermsSection() {
  return (
    <div className="space-y-4">
      <BulletList
        items={[
          "সকল সেবা শুধুমাত্র ঢাকা শহর এবং ঢাকা মহানগর সীমার মধ্যে পরিচালিত হয়, যদি না বিশেষভাবে অন্যথা উল্লেখ করা হয়।",
          "অপারেশনাল সীমাবদ্ধতা, লজিস্টিক জটিলতা বা বাহ্যিক কারণে ডেলিভারি সময়সূচি পরিবর্তন বা সমন্বয় করার অধিকার InsureCow সংরক্ষণ করে।",
          "সফল সেবা প্রদান নিশ্চিত করার জন্য গ্রাহককে সঠিক এবং সম্পূর্ণ যোগাযোগ ও ডেলিভারি তথ্য প্রদান করতে হবে।",
          "যেকোনো অর্ডার নিশ্চিত করার মাধ্যমে গ্রাহক এখানে উল্লেখিত সকল শর্ত, নীতিমালা ও নিয়মাবলি মেনে নিয়েছেন বলে গণ্য হবে।",
          "সকল কুরবানি কার্যক্রম ইসলামী নীতি এবং হালাল প্রক্রিয়াকরণ মান অনুযায়ী সম্পন্ন করা হয়।",
        ]}
      />
    </div>
  );
}
