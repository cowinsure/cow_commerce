/**
 * Mock Cow Data for Marketplace and Cow Details
 */

export type Cow = {
  id: string;
  name: string;
  breed: string;
  price: number;
  weight: number;
  age: number;
  availableUnits: number;
  tag: 'Elite' | 'Premium' | 'Growth';
  tagColor: 'primary' | 'primary-fixed' | 'tertiary';
  image: string;
  images: string[];
  certification: string;
  description: string;
  genetics: {
    genotype: string;
    bloodline: string;
    heritability: string;
  };
  health: {
    vaccinations: string;
    diet: string;
    checkup: string;
  };
  logistics: {
    location: string;
    transit: string;
    handling: string;
  };
  marketInsight?: string;
};

export const cows: Cow[] = [
  {
    id: 'cow-001',
    name: 'Black Onyx V2',
    breed: 'Angus Reserve',
    price: 12400,
    weight: 780,
    age: 24,
    availableUnits: 12,
    tag: 'Elite',
    tagColor: 'primary',
    image: 'https://images.unsplash.com/photo-1583468323330-9032ad490fed?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1583468323330-9032ad490fed?w=800&q=80',
      'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?w=800&q=80',
      'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&q=80',
    ],
    certification: 'DNA Cert',
    description: `The Black Onyx V2 represents the pinnacle of our Angus Reserve line. Bred with precision genetics focused on superior marbling and growth efficiency, this specimen stands as a prime example of modern agrarian excellence. This particular bull exhibits exceptional skeletal structure and a calm temperament, making it an ideal foundational asset for high-yield operations.

Our verification process ensures that every unit of Black Onyx V2 comes with full DNA certification, metabolic health reports, and a verified pedigree tracing back three generations of elite ancestry. The current unit availability reflects the exclusive nature of this genetic bfarm.`,
    genetics: {
      genotype: 'AA-Prime',
      bloodline: 'Onyx Legacy',
      heritability: '0.82 Score',
    },
    health: {
      vaccinations: 'Up-to-date',
      diet: 'Pasture Base',
      checkup: 'Oct 2023',
    },
    logistics: {
      location: 'Queensland',
      transit: 'Climate Ctrl',
      handling: 'Low Stress',
    },
    marketInsight: 'This asset has seen a 4.2% value appreciation in the last 30 days due to high demand in Angus Reserve.',
  },
  {
    id: 'cow-002',
    name: 'Golden Meadow',
    breed: 'Hereford Gold',
    price: 8950,
    weight: 640,
    age: 18,
    availableUnits: 45,
    tag: 'Growth',
    tagColor: 'primary-fixed',
    image: '/cowImg/WhatsApp Image 2026-04-01 at 3.57.13 PM (1).jpeg',
    images: [
      '/cowImg/WhatsApp Image 2026-04-01 at 3.57.13 PM (1).jpeg',
      '/cowImg/WhatsApp Image 2026-04-01 at 3.57.13 PM.jpeg',
      '/cowImg/WhatsApp Image 2026-04-01 at 3.57.20 PM.jpeg',
      '/cowImg/WhatsApp Image 2026-04-01 at 3.57.31 PM.jpeg',
    ],
    certification: 'Certified Bio',
    description: `The Golden Meadow specimen showcases exceptional growth potential with a golden-hued coat that signifies premium genetics. Bred from our elite Hereford Gold line, this animal demonstrates superior feed conversion efficiency and gentle temperament ideal for both breeding and finishing operations.

Each unit undergoes rigorous health screening and comes with full traceability documentation. The Golden Meadow line has consistently outperformed market benchmarks for weight gain and meat quality scores.`,
    genetics: {
      genotype: 'AA-Select',
      bloodline: 'Golden Heritage',
      heritability: '0.78 Score',
    },
    health: {
      vaccinations: 'Up-to-date',
      diet: 'Grain Enhanced',
      checkup: 'Nov 2023',
    },
    logistics: {
      location: 'Victoria',
      transit: 'Climate Ctrl',
      handling: 'Low Stress',
    },
    marketInsight: 'Hereford Gold assets have shown consistent 3.8% annual appreciation.',
  },
  {
    id: 'cow-003',
    name: 'Empire Wagyu',
    breed: 'A5 Genetics Line',
    price: 18200,
    weight: 810,
    age: 32,
    availableUnits: 8,
    tag: 'Premium',
    tagColor: 'tertiary',
    image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&q=80',
      'https://images.unsplash.com/photo-1504222490345-c075b6a1a0a6?w=800&q=80',
    ],
    certification: 'Grade 12 MS',
    description: `The Empire Wagyu represents the apex of our premium genetic portfolio. This A5-grade specimen embodies centuries of selective breeding refined to produce exceptional intramuscular fat distribution - the hallmark of world-renowned Wagyu beef quality.

Every Empire Wagyu unit comes with full lineage documentation, grading certificates from Japanese-style assessment protocols, and comprehensive genetic profiling ensuring authentic heritage markers.`,
    genetics: {
      genotype: 'A5-Marbling',
      bloodline: 'Imperial Dynasty',
      heritability: '0.91 Score',
    },
    health: {
      vaccinations: 'Up-to-date',
      diet: 'Premium Blend',
      checkup: 'Sep 2023',
    },
    logistics: {
      location: 'Tokyo Prefecture',
      transit: 'VIP Climate',
      handling: 'Expert Only',
    },
    marketInsight: 'Wagyu pricing has increased by 12% this quarter, making this an exceptional investment opportunity.',
  },
  {
    id: 'cow-004',
    name: 'Shadow Angus',
    breed: 'Black Angus Premium',
    price: 14500,
    weight: 850,
    age: 28,
    availableUnits: 15,
    tag: 'Elite',
    tagColor: 'primary',
    image: 'https://images.unsplash.com/photo-1504222490345-c075b6a1a0a6?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1504222490345-c075b6a1a0a6?w=800&q=80',
      'https://images.unsplash.com/photo-1527156120564-92a6e40a6e5e?w=800&q=80',
    ],
    certification: 'USDA Certified',
    description: `The Shadow Angus represents our darkest-marbled bloodline, producing offspring with exceptional meat quality consistency. This bull combines the robust frame of traditional Angus with modern genetic optimization for superior feed efficiency.

With a documented history of producing offspring that consistently grade Prime on USDA assessment scales, the Shadow Angus offers breeders an unparalleled opportunity to enhance their genetic portfolio.`,
    genetics: {
      genotype: 'A-Prime',
      bloodline: 'Shadow Elite',
      heritability: '0.85 Score',
    },
    health: {
      vaccinations: 'Up-to-date',
      diet: 'Mixed Forage',
      checkup: 'Dec 2023',
    },
    logistics: {
      location: 'Texas',
      transit: 'Standard Ctrl',
      handling: 'Professional',
    },
    marketInsight: 'Premium Angus genetics have seen 5.1% value increase year-over-year.',
  },
  {
    id: 'cow-005',
    name: 'Ruby Hereford',
    breed: 'Red Hereford Classic',
    price: 9900,
    weight: 720,
    age: 20,
    availableUnits: 28,
    tag: 'Growth',
    tagColor: 'primary-fixed',
    image: 'https://images.unsplash.com/photo-1527156120564-92a6e40a6e5e?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1527156120564-92a6e40a6e5e?w=800&q=80',
      'https://images.unsplash.com/photo-1574068468668-a05a11f871da?w=800&q=80',
    ],
    certification: 'Health Certified',
    description: `The Ruby Hereford line embodies the classic red-and-white markings that have made Hereford cattle a staple of premium beef production worldwide. This specimen demonstrates excellent maternal qualities and strong growth rates, making it ideal for both breeding programs and direct finishing operations.

Each Ruby Hereford unit includes full health documentation, breeding soundness evaluation, and compatibility assessment for various management systems.`,
    genetics: {
      genotype: 'AB-Choice',
      bloodline: 'Ruby Classic',
      heritability: '0.75 Score',
    },
    health: {
      vaccinations: 'Up-to-date',
      diet: 'Pasture Base',
      checkup: 'Jan 2024',
    },
    logistics: {
      location: 'Kentucky',
      transit: 'Climate Ctrl',
      handling: 'Standard',
    },
    marketInsight: 'Classic Hereford assets maintaining stable 2.3% appreciation.',
  },
  {
    id: 'cow-006',
    name: 'Platinum Wagyu',
    breed: 'Japanese Cross',
    price: 22500,
    weight: 920,
    age: 36,
    availableUnits: 5,
    tag: 'Premium',
    tagColor: 'tertiary',
    image: 'https://images.unsplash.com/photo-1574068468668-a05a11f871da?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1574068468668-a05a11f871da?w=800&q=80',
      'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&q=80',
    ],
    certification: 'Grade A5+',
    description: `The Platinum Wagyu represents our most exclusive genetic offering, combining traditional Japanese Wagyu breeding techniques with modern genomic optimization. This A5+ graded specimen produces marble scores exceeding 9 on the BMS scale, delivering the exceptional eating experience demanded by premium markets.

Every Platinum Wagyu unit undergoes rigorous quality control including ultrasound marbling assessment, DNA verification of bloodline purity, and temperament evaluation ensuring optimal handling characteristics.`,
    genetics: {
      genotype: 'A5+-Elite',
      bloodline: 'Platinum Heritage',
      heritability: '0.93 Score',
    },
    health: {
      vaccinations: 'Up-to-date',
      diet: 'Premium Japanese',
      checkup: 'Aug 2023',
    },
    logistics: {
      location: 'Kobe Region',
      transit: 'VIP Climate',
      handling: 'Expert Only',
    },
    marketInsight: 'Limited availability: only 5 units remaining at current pricing.',
  },
];

export const totalAssets = 152;

export const filters = {
  breeds: [
    { id: 'angus', name: 'Angus Onyx', checked: true },
    { id: 'wagyu', name: 'Wagyu Heritage', checked: false },
    { id: 'hereford', name: 'Hereford Prime', checked: false },
  ],
  ageRange: {
    min: 12,
    max: 36,
  },
  weightClasses: [
    { id: '400-600', label: '400 - 600', active: false },
    { id: '600-800', label: '600 - 800', active: true },
    { id: '800-1000', label: '800 - 1000', active: false },
    { id: '1000+', label: '1000+', active: false },
  ],
};

// Helper function to get cow by ID
export function getCowById(id: string): Cow | undefined {
  return cows.find((cow) => cow.id === id);
}