export interface FAQItems {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const faqData: FAQItems[] = [
  {
    id: "1",
    category: "Delivery & Service Area",
    question: "What are your delivery areas?",
    answer: "Our services are strictly limited to Dhaka City and Dhaka Metropolitan area only. We cannot deliver to areas outside these boundaries.",
  },
  {
    id: "2",
    category: "Delivery & Service Area",
    question: "When will my meat be delivered?",
    answer: "For processed cattle, delivery is scheduled on Eid Day +2, +3, and +4 (2nd, 3rd, and 4th day of Eid-ul-Azha). The exact date will be confirmed by our team after your booking.",
  },
  {
    id: "3",
    category: "Delivery & Service Area",
    question: "What happens if I'm not available during delivery?",
    answer: "If you're unreachable or absent, InsureCow may reschedule delivery, deliver to a nearby accessible location, or treat the order as successfully attempted. Additional redelivery charges may apply.",
  },
  {
    id: "4",
    category: "Payment & Pricing",
    question: "What are the payment terms?",
    answer: "A minimum 50% advance payment is required to confirm your booking. The remaining 50% must be paid before Eid as communicated by InsureCow. Full payment is mandatory for order confirmation.",
  },
  {
    id: "5",
    category: "Payment & Pricing",
    question: "Is there a price guarantee once I book?",
    answer: "The quoted price is only guaranteed if full payment is completed within the specified deadline. Late payment may trigger price revision based on current market rates of cattle and services.",
  },
  {
    id: "6",
    category: "Payment & Pricing",
    question: "Can I get a refund if I cancel my order?",
    answer: "No. All confirmed Qurbani bookings are strictly non-cancellable, non-amendable, and non-refundable under any circumstances once payment is confirmed. The advance payment is non-refundable.",
  },
  {
    id: "7",
    category: "Quality & Health",
    question: "What if the cattle is not healthy or meets quality issues?",
    answer: "If any animal is found unfit or not meeting InsureCow's quality standards, we will arrange a replacement of comparable quality, weight, and value subject to availability and operational feasibility.",
  },
  {
    id: "8",
    category: "Quality & Health",
    question: "How is the meat processed and stored?",
    answer: "All processed meat is handled, stored, and transported in compliance with food safety standards, maintained at 0°C to 4°C throughout processing and delivery using insulated, food-grade packaging.",
  },
  {
    id: "9",
    category: "Policies & Terms",
    question: "Who owns the hide (skin) of the animal?",
    answer: "Unless otherwise agreed in writing, the hide remains the sole property of InsureCow after slaughter. The hide value is used internally for operational economics and pricing structure.",
  },
  {
    id: "10",
    category: "Policies & Terms",
    question: "Can I request special cuts or custom processing?",
    answer: "Special handling requests may incur additional charges and require prior customer consent. Standard cuts follow our hygienic processing protocols into uniform portions.",
  },
  {
    id: "11",
    category: "Booking Process",
    question: "What if I provide wrong delivery address?",
    answer: "Incorrect or incomplete address information may lead to delivery failure. InsureCow is not liable for such issues and may reschedule or deliver to the nearest accessible location. Additional charges may apply.",
  },
];
