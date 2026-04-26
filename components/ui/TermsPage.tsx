"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
export default function TermsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

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
      { rootMargin: "-20% 0px -60% 0px" },
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
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <ScrollProgress />
      <BackToTop />

      {/* ─── Hero ───────────────────────────────────────── */}
      <header className="relative bg-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <pattern
              id="grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-28">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-800/50 rounded-full text-emerald-200 text-sm font-medium mb-6 border border-emerald-700/50"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Official Terms & Conditions</span>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
            >
              INSURECOW QURBANI 2026
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-emerald-200 text-lg md:text-xl max-w-2xl leading-relaxed"
            >
              Please read these terms carefully before booking. All policies are
              designed to ensure transparency, food safety, and a seamless
              Qurbani experience.
            </motion.p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-gray-50 to-transparent" />
      </header>

      {/* ─── Sticky Nav ─────────────────────────────────── */}
      <nav className="sticky top-1 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between h-14">
            <div className="hidden md:flex items-center gap-1 overflow-x-auto">
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
                  {s.title.split(" ").slice(0, 3).join(" ")}...
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

      {/* ─── Main Content ───────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {/* Quick Info Cards */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <InfoCard
            icon={<MapPin className="w-5 h-5" />}
            title="Service Area"
            text="Strictly available within Dhaka City & Dhaka Metropolitan limits only."
          />
          <InfoCard
            icon={<Thermometer className="w-5 h-5" />}
            title="Cold Chain"
            text="Meat maintained at 0°C to 4°C throughout processing and delivery."
          />
          <InfoCard
            icon={<Ban className="w-5 h-5" />}
            title="Non-Refundable"
            text="All bookings are strictly non-cancellable and non-refundable once confirmed."
          />
        </motion.section>

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
            Thank you for choosing InsureCow
          </h3>
          <p className="text-emerald-300 max-w-xl mx-auto">
            By confirming any order, you acknowledge and agree to all terms,
            conditions, and policies stated herein. All Qurbani operations are
            conducted in compliance with Islamic principles and halal processing
            standards.
          </p>
        </motion.div>
      </main>

      {/* ─── Footer ─────────────────────────────────────── */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-5xl mx-auto px-6 text-center text-gray-500 text-sm">
          <p>© 2026 InsureCow. All rights reserved.</p>
          <p className="mt-1">Terms & Conditions for Qurbani Services</p>
        </div>
      </footer>
    </div>
  );
}

// ─── Section 1: Full Service ─────────────────────────────
function FullServiceSection() {
  return (
    <div className="space-y-6">
      {/* 1.1 Service Area */}
      <SubSection title="1.1 Service Area">
        <p>This service is strictly available within Dhaka City only.</p>
      </SubSection>

      {/* 1.2 Meat Processing & Delivery */}
      <SubSection title="1.2 Meat Processing & Delivery Schedule (Food Safety Compliant)">
        <BulletList
          items={[
            "All processed meat will be handled, processed, stored, and transported in accordance with recognized food safety standards.",
            "Processed meat will be delivered in fresh chilled condition (maintained between 0°C to 4°C) on Eid Day +2, +3, and +4 (2nd, 3rd, and 4th day of Eid-ul-Azha).",
            "For deliveries from Eid Day +5 onward, InsureCow will ensure that meat is maintained under a controlled cold chain (0°C to 4°C) throughout processing, storage, and transportation, subject to operational feasibility.",
            "InsureCow will use insulated, food-grade packaging and refrigerated transport systems to preserve product safety, hygiene, and quality until delivery.",
            "The customer is advised to immediately transfer the meat to appropriate refrigeration (0°C to 4°C) or freezing conditions upon receipt to maintain freshness and safety.",
          ]}
        />
      </SubSection>

      {/* 1.3 Booking & Payment */}
      <SubSection title="1.3 Booking & Payment">
        <BulletList
          items={[
            "Booking is strictly subject to availability and will close 5 (five) days prior to Eid-ul-Azha.",
            "A minimum of 50% advance payment is required to provisionally confirm the order.",
            "The remaining 50% balance must be paid within the deadline communicated by InsureCow at the time of booking.",
            "Failure to pay the remaining balance within the specified deadline will result in automatic cancellation of the order without prior notice.",
            "In such cases, the advance payment shall be strictly non-refundable and will be forfeited, and InsureCow reserves the right to reallocate the cattle to another customer.",
          ]}
        />

        <div className="mt-6 p-5 bg-amber-50 border border-amber-200 rounded-xl">
          <h5 className="font-semibold text-amber-900 mb-4 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Price & Payment Protection Clauses
          </h5>
          <div className="space-y-4 text-sm">
            <div>
              <span className="font-semibold text-amber-900">
                No Price Lock Guarantee:
              </span>{" "}
              <span className="text-amber-800">
                The initial price quoted at the time of booking is not
                guaranteed unless full payment is completed within the specified
                timeline. InsureCow does not provide any price lock facility
                beyond the communicated payment deadline.
              </span>
            </div>
            <div>
              <span className="font-semibold text-amber-900">
                Price Revision Protection:
              </span>{" "}
              <span className="text-amber-800">
                If the customer fails to clear the remaining balance within the
                stipulated deadline, InsureCow reserves the right to revise the
                total payable amount in line with prevailing market rates of
                cattle, logistics, and processing costs at the time of final
                payment.
              </span>
            </div>
            <div>
              <span className="font-semibold text-amber-900">
                Dynamic Pricing Clause:
              </span>{" "}
              <span className="text-amber-800">
                Prices of cattle and related services are subject to market
                fluctuations, seasonal demand, supply chain conditions, and
                operational costs during the Qurbani period. Any revised price
                communicated by InsureCow shall be final and binding, and the
                order will only proceed upon acceptance and full settlement of
                the updated amount.
              </span>
            </div>
            <div>
              <span className="font-semibold text-amber-900">
                An order shall be considered fully confirmed only upon receipt
                of the complete payment within the stipulated or revised
                timeline.
              </span>
            </div>
          </div>
        </div>
      </SubSection>

      {/* 1.4 Processing Charges */}
      <SubSection title="1.4 Processing Charges (Per Cattle)">
        <p className="text-sm text-gray-600 mb-4">
          The following charges shall apply for slaughtering, hygienic
          processing, packaging, and delivery of cattle under the Full-Service
          Qurbani package:
        </p>
        <TableBlock
          headers={[
            "Cattle Price Range (BDT)",
            "Eid Day +1 (2nd Day)",
            "Eid Day +2 (3rd Day)",
            "Eid Day +3 (4th Day)",
            "Eid Day +4 & Beyond",
          ]}
          rows={[
            [
              "Below 130,000",
              "24,000",
              "15,000 (inclusive of BDT 3,000 discount)",
              "13,000",
              "13,000 (fresh chilled)",
            ],
            [
              "130,000 – 180,000",
              "25,000",
              "16,000 (inclusive of BDT 3,000 discount)",
              "14,000",
              "14,000 (fresh chilled)",
            ],
            [
              "Above 180,000",
              "27,000",
              "18,000 (inclusive of BDT 3,000 discount)",
              "16,000",
              "16,000 (fresh chilled)",
            ],
          ]}
        />
        <BulletList
          items={[
            "The above charges are inclusive of slaughtering, standard processing, hygienic packaging, and last-mile delivery within Dhaka City.",
            "The discount applicable on Eid Day +2 (3rd Day) is already adjusted in the listed price and is time-specific and non-transferable.",
            "Charges may vary in case of special handling requirements, custom processing requests, or unforeseen operational costs, subject to prior customer consent.",
          ]}
        />
      </SubSection>

      {/* 1.5 Meat Processing Standards */}
      <SubSection title="1.5 Meat Processing Standards">
        <BulletList
          items={[
            "Carcass will be processed into uniform, standardized cuts (approximately 17–18 portions per kg basis) in accordance with hygienic meat processing protocols.",
            "All meat will be packed in food-grade, leak-proof 3 kg poly packs to ensure hygiene, safety, and portion control.",
            "Each master carton will contain a maximum of 15 kg (5 × 3 kg packs) for efficient handling and cold-chain management.",
            "Offal items (including liver, heart, kidney, lungs, and spleen) will be processed and packaged separately under hygienic conditions.",
            "Special cuts, including head meat, brain, and legs (paya), will be individually packed and labeled separately.",
            "All inedible by-products (including bowels and excess fat) will be handled and disposed of in accordance with approved hygienic and environmental standards, unless otherwise requested by the customer at the time of booking.",
          ]}
        />
      </SubSection>

      {/* 1.6 Optional Bowels Collection */}
      <SubSection title="1.6 Optional Bowels Collection (Explanation)">
        <p className="text-sm text-gray-500 mb-3 italic">
          This clause defines an optional customer choice regarding the
          collection of animal bowels (intestines and related inedible internal
          parts) after slaughter.
        </p>
        <BulletList
          items={[
            "After processing, bowels and inedible internal by-products are normally segregated and disposed of hygienically in accordance with food safety and environmental standards.",
            "However, the customer may opt to collect bowels at the time of purchase as an additional service preference.",
            "If selected, the bowels will be separately preserved, packed, and made available for collection from designated InsureCow outlets.",
            "Collection will be permitted on or after the 5th day following Eid-ul-Azha, subject to operational scheduling and outlet availability.",
            "This option is strictly optional and must be confirmed during the booking process; requests made after order confirmation may not be accommodated.",
          ]}
        />
      </SubSection>

      {/* 1.7 Hide Value & Ownership */}
      <SubSection title="1.7 Hide (Skin) Value & Ownership Clause">
        <p className="mb-4">
          The Hide (Skin) Value represents the estimated fair market value of
          the animal skin generated from slaughter, determined based on the
          cattle’s categorized price range at the time of booking.
        </p>
        <TableBlock
          headers={["Cattle Price Range (BDT)", "Hide Value (BDT per cattle)"]}
          rows={[
            ["Below 130,000", "700"],
            ["130,000 – 180,000", "910"],
            ["Above 180,000", "1,120"],
          ]}
        />

        <div className="space-y-4 mt-4">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <h6 className="font-semibold text-gray-900 mb-2">
              1.7.1 Ownership of Hide
            </h6>
            <BulletList
              items={[
                "Unless otherwise expressly agreed in writing, the hide (skin) shall remain the sole property of InsureCow after slaughter and processing.",
                "The customer acknowledges that the hide forms part of the overall operational economics of Qurbani processing services.",
              ]}
            />
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <h6 className="font-semibold text-gray-900 mb-2">
              1.7.2 Adjustment of Hide Value
            </h6>
            <BulletList
              items={[
                "The stated Hide Value is an estimated reference value used for internal allocation and pricing structure.",
                "InsureCow reserves the right to adjust, offset, or incorporate the hide value against processing, logistics, or service costs as part of the overall service pricing model.",
                "Any such adjustment shall not affect the agreed meat delivery obligations under the confirmed order.",
              ]}
            />
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <h6 className="font-semibold text-gray-900 mb-2">
              1.7.3 Market Variation Clause
            </h6>
            <BulletList
              items={[
                "Hide values are subject to market fluctuations in the leather and by-product industry.",
                "InsureCow may revise the hide valuation from time to time without prior notice to reflect prevailing market conditions.",
              ]}
            />
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <h6 className="font-semibold text-gray-900 mb-2">
              1.7.4 No Separate Claim
            </h6>
            <BulletList
              items={[
                "The customer shall have no separate ownership claim, refund claim, or monetary entitlement over the hide value unless explicitly agreed in a written contract signed by InsureCow.",
              ]}
            />
          </div>
        </div>
      </SubSection>

      {/* 1.8 Delivery Conditions */}
      <SubSection title="1.8 Delivery Conditions">
        <BulletList
          items={[
            "The customer shall provide a complete and accurate delivery address within Dhaka City, including valid landmarks, apartment/house details, and active mobile contact numbers of the recipient(s).",
            "The delivery location must be fully accessible for refrigerated transport vehicles (chiller vans/trucks), ensuring safe unloading and handling of goods.",
            "InsureCow reserves the right to decline doorstep delivery if the access route is deemed unsafe, restricted, or operationally unfeasible for refrigerated vehicles.",
            "In such cases, delivery will be completed at the nearest accessible and safe roadside or designated drop-off point within Dhaka City, as determined by InsureCow logistics personnel.",
          ]}
        />

        <div className="mt-4 p-5 bg-red-50 border border-red-200 rounded-xl">
          <h6 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            1.8.1 Liability & Delivery Failure Clause
          </h6>
          <div className="space-y-3 text-sm text-red-800">
            <p>
              InsureCow shall not be held liable for any delay, delivery
              failure, or service disruption arising due to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Incorrect, incomplete, or misleading address information
                provided by the customer
              </li>
              <li>Unreachable or inactive contact numbers</li>
              <li>
                Absence of the recipient or authorized representative at the
                time of delivery
              </li>
              <li>
                Refusal or failure to accept delivery at the scheduled time and
                location
              </li>
              <li>
                Restricted access, traffic congestion, civic restrictions, or
                force majeure conditions
              </li>
            </ul>
            <p className="mt-3">
              If delivery cannot be completed due to any of the above reasons,
              InsureCow reserves the right to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Reschedule delivery at its discretion, or</li>
              <li>Deliver to an alternative nearby accessible location, or</li>
              <li>
                Treat the order as successfully delivered upon attempted
                delivery confirmation
              </li>
            </ul>
            <p className="mt-3">
              Any additional costs arising from redelivery attempts or address
              corrections may be charged to the customer.
            </p>
            <p className="font-semibold mt-3">
              In all cases, once delivery is attempted in good faith as per
              provided instructions, the order shall be considered fulfilled and
              completed, and no liability claims shall be entertained.
            </p>
          </div>
        </div>
      </SubSection>

      {/* 1.9 Animal Health & Replacement */}
      <SubSection title="1.9 Animal Health & Replacement">
        <BulletList
          items={[
            "In the event any selected cattle is found to be unfit, clinically unwell, diseased, or otherwise not meeting InsureCow’s quality and health standards, InsureCow shall reserve the right to take appropriate corrective action.",
            "InsureCow will notify the customer without undue delay and, where necessary, provide relevant information regarding the condition of the animal.",
            "InsureCow shall arrange a replacement animal of comparable quality, weight range, and value, subject to availability and operational feasibility.",
            "The replacement decision shall be made by InsureCow in accordance with its livestock health assessment and quality assurance protocols, and shall be deemed final for service continuity purposes.",
          ]}
        />
      </SubSection>

      {/* 1.10 Force Majeure */}
      <SubSection title="1.10 Force Majeure">
        <BulletList
          items={[
            "InsureCow shall not be held liable for any delay, disruption, suspension, or failure in performance of its obligations where such delay or failure arises from events beyond its reasonable control (Force Majeure Events).",
            "Force Majeure Events shall include, but are not limited to: government restrictions or regulatory actions, natural disasters, epidemic or pandemic situations, civil unrest, strikes, transportation disruptions, infrastructure failure, or any other unforeseen operational constraints.",
            "In the occurrence of a Force Majeure Event, InsureCow may suspend, reschedule, or modify delivery timelines as reasonably required under the circumstances.",
            "InsureCow will make reasonable efforts to notify customers as soon as practicable regarding any material changes to delivery schedules.",
            "Any such delay or modification shall not constitute a breach of contract, and InsureCow shall bear no liability for resulting losses, delays, or inconveniences.",
          ]}
        />
      </SubSection>

      {/* 1.11 Acceptance of Delivery */}
      <SubSection title="1.11 Acceptance of Delivery">
        <BulletList
          items={[
            "The customer (or authorized representative) must present a valid purchase receipt at the time of delivery and duly sign the Received Form acknowledging successful handover of the products.",
            "Prior to signing the Received Form, the customer is entitled to perform a reasonable visual inspection of the delivered goods to verify the condition, packaging integrity, and general compliance with the order specification.",
            "The customer acknowledges that inspection is limited to external and immediate observable conditions only, and does not include invasive testing or post-consumption evaluation.",
            "Delivery shall be deemed complete, final, and fully accepted upon signing of the Received Form or any equivalent confirmation (including electronic acknowledgment, where applicable).",
            "Once delivery has been accepted after inspection, the order shall be considered finalized, and no claims, disputes, objections, or compensation requests shall be entertained, except in cases of proven gross negligence as determined solely by InsureCow.",
          ]}
        />
      </SubSection>

      {/* 1.12 Refund Policy */}
      <SubSection title="1.12 Refund Policy">
        <div className="p-5 bg-red-50 border border-red-200 rounded-xl">
          <BulletList
            items={[
              "All Qurbani bookings are strictly non-cancellable, non-amendable, and non-refundable once confirmed, regardless of circumstances.",
              "Customers are solely responsible for reviewing and verifying all cattle details, pricing, service type, and delivery terms prior to making payment and confirming the order.",
              "By confirming a booking, the customer expressly acknowledges that they have fully reviewed, understood, and accepted the selected animal and associated services, and are satisfied with the same for the purpose of Qurbani compliance.",
              "No refund claims, chargeback requests, or cancellation requests shall be entertained under any circumstances once the order is confirmed, except where explicitly agreed in writing by InsureCow management.",
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
      <SubSection title="2.1 Service Area">
        <p>This service is strictly available within Dhaka City only.</p>
      </SubSection>

      <SubSection title="2.2 Service Structure">
        <BulletList
          items={[
            "Each cattle is shared among a maximum of 7 (seven) participants, in accordance with Islamic Qurbani guidelines.",
            "The displayed price represents 1/7th share, inclusive of slaughtering, processing, packaging, and delivery charges.",
            "No promotional offers, discounts, or price adjustments are applicable to shared Qurbani services.",
          ]}
        />
      </SubSection>

      <SubSection title="2.3 Delivery & Collection">
        <BulletList
          items={[
            "Processed meat will be delivered on Eid Day +3 (4th day of Eid-ul-Azha).",
            "Customers must collect their share from designated InsureCow pickup points within Dhaka City.",
            "Failure to collect within the specified timeframe may result in storage limitations or additional handling constraints.",
          ]}
        />
      </SubSection>

      <SubSection title="2.4 Refund Policy">
        <div className="p-5 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-800 font-medium">
            All shared Qurbani bookings are strictly non-cancellable and
            non-refundable once confirmed.
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
      <SubSection title="3.1 Service Area">
        <p>Delivery is strictly limited to the Dhaka Metropolitan Area only.</p>
      </SubSection>

      <SubSection title="3.2 Delivery Conditions">
        <BulletList
          items={[
            "Delivery will be scheduled 2–4 days prior to Eid-ul-Azha.",
            "Delivery charges range from BDT 8,000 to BDT 10,000, depending on delivery timing and logistics requirements.",
            "The customer must ensure adequate access and unloading space for livestock transport vehicles within Dhaka.",
            "Where access is restricted, delivery will be made to the nearest safe and accessible location, as determined by InsureCow logistics team.",
          ]}
        />
      </SubSection>

      <SubSection title="3.3 Payment Terms">
        <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl">
          <BulletList
            items={[
              "100% advance payment is mandatory for order confirmation.",
              "Partial payments and cheques are strictly not accepted.",
            ]}
          />
        </div>
      </SubSection>

      <SubSection title="3.4 Refund Policy">
        <div className="p-5 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-800 font-medium">
            All Live Cattle Qurbani orders are strictly non-cancellable and
            non-refundable once confirmed.
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
          "All services are strictly operated within Dhaka City and Dhaka Metropolitan limits, unless explicitly stated otherwise.",
          "InsureCow reserves the right to modify or adjust delivery schedules due to operational constraints, logistical challenges, or external factors.",
          "Customers must provide accurate and complete contact and delivery information to ensure successful fulfillment.",
          "By confirming any order, the customer acknowledges and agrees to all terms, conditions, and policies stated herein.",
          "All Qurbani operations are conducted in compliance with Islamic principles and halal processing standards.",
        ]}
      />
    </div>
  );
}
