"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/theme/theme.config";
import Image from "next/image";
import { Beef, Flame, Droplets, Info, ChevronRight } from "lucide-react";
import SectionMiniHeading from "../ui/SectionMiniHeading";
import { useLocalization } from "@/context/LocalizationContext";

// Accurate beef cut data based on standard butcher charts
const bodyPartsKeys = [
  {
    id: "neck",
    nameKey: "cowDiagram.bodyParts.neck.name",
    subtitleKey: "cowDiagram.bodyParts.neck.subtitle",
    descriptionKey: "cowDiagram.bodyParts.neck.description",
    meatQualityKey: "cowDiagram.bodyParts.neck.meatQuality",
    marblingKey: "cowDiagram.bodyParts.neck.marbling",
    culinaryKeys: [
      "cowDiagram.bodyParts.neck.culinary.0",
      "cowDiagram.bodyParts.neck.culinary.1",
      "cowDiagram.bodyParts.neck.culinary.2",
    ],
    bestMethodKey: "cowDiagram.bodyParts.neck.bestMethod",
    position: { top: "30%", left: "22%" },
    cutsKeys: [
      "cowDiagram.bodyParts.neck.cuts.0",
      "cowDiagram.bodyParts.neck.cuts.1",
      "cowDiagram.bodyParts.neck.cuts.2",
      "cowDiagram.bodyParts.neck.cuts.3",
    ],
  },
  {
    id: "chuck",
    nameKey: "cowDiagram.bodyParts.chuck.name",
    subtitleKey: "cowDiagram.bodyParts.chuck.subtitle",
    descriptionKey: "cowDiagram.bodyParts.chuck.description",
    meatQualityKey: "cowDiagram.bodyParts.chuck.meatQuality",
    marblingKey: "cowDiagram.bodyParts.chuck.marbling",
    culinaryKeys: [
      "cowDiagram.bodyParts.chuck.culinary.0",
      "cowDiagram.bodyParts.chuck.culinary.1",
      "cowDiagram.bodyParts.chuck.culinary.2",
    ],
    bestMethodKey: "cowDiagram.bodyParts.chuck.bestMethod",
    position: { top: "28%", left: "32%" },
    cutsKeys: [
      "cowDiagram.bodyParts.chuck.cuts.0",
      "cowDiagram.bodyParts.chuck.cuts.1",
      "cowDiagram.bodyParts.chuck.cuts.2",
    ],
  },
  {
    id: "rib",
    nameKey: "cowDiagram.bodyParts.rib.name",
    subtitleKey: "cowDiagram.bodyParts.rib.subtitle",
    descriptionKey: "cowDiagram.bodyParts.rib.description",
    meatQualityKey: "cowDiagram.bodyParts.rib.meatQuality",
    marblingKey: "cowDiagram.bodyParts.rib.marbling",
    culinaryKeys: [
      "cowDiagram.bodyParts.rib.culinary.0",
      "cowDiagram.bodyParts.rib.culinary.1",
      "cowDiagram.bodyParts.rib.culinary.2",
    ],
    bestMethodKey: "cowDiagram.bodyParts.rib.bestMethod",
    position: { top: "25%", left: "48%" },
    cutsKeys: [
      "cowDiagram.bodyParts.rib.cuts.0",
      "cowDiagram.bodyParts.rib.cuts.1",
      "cowDiagram.bodyParts.rib.cuts.2",
    ],
  },
  {
    id: "brisket",
    nameKey: "cowDiagram.bodyParts.brisket.name",
    subtitleKey: "cowDiagram.bodyParts.brisket.subtitle",
    descriptionKey: "cowDiagram.bodyParts.brisket.description",
    meatQualityKey: "cowDiagram.bodyParts.brisket.meatQuality",
    marblingKey: "cowDiagram.bodyParts.brisket.marbling",
    culinaryKeys: [
      "cowDiagram.bodyParts.brisket.culinary.0",
      "cowDiagram.bodyParts.brisket.culinary.1",
      "cowDiagram.bodyParts.brisket.culinary.2",
    ],
    bestMethodKey: "cowDiagram.bodyParts.brisket.bestMethod",
    position: { top: "52%", left: "28%" },
    cutsKeys: [
      "cowDiagram.bodyParts.brisket.cuts.0",
      "cowDiagram.bodyParts.brisket.cuts.1",
      "cowDiagram.bodyParts.brisket.cuts.2",
    ],
  },
  {
    id: "plate",
    nameKey: "cowDiagram.bodyParts.plate.name",
    subtitleKey: "cowDiagram.bodyParts.plate.subtitle",
    descriptionKey: "cowDiagram.bodyParts.plate.description",
    meatQualityKey: "cowDiagram.bodyParts.plate.meatQuality",
    marblingKey: "cowDiagram.bodyParts.plate.marbling",
    culinaryKeys: [
      "cowDiagram.bodyParts.plate.culinary.0",
      "cowDiagram.bodyParts.plate.culinary.1",
      "cowDiagram.bodyParts.plate.culinary.2",
    ],
    bestMethodKey: "cowDiagram.bodyParts.plate.bestMethod",
    position: { top: "45%", left: "45%" },
    cutsKeys: [
      "cowDiagram.bodyParts.plate.cuts.0",
      "cowDiagram.bodyParts.plate.cuts.1",
      "cowDiagram.bodyParts.plate.cuts.2",
    ],
  },
  {
    id: "loin",
    nameKey: "cowDiagram.bodyParts.loin.name",
    subtitleKey: "cowDiagram.bodyParts.loin.subtitle",
    descriptionKey: "cowDiagram.bodyParts.loin.description",
    meatQualityKey: "cowDiagram.bodyParts.loin.meatQuality",
    marblingKey: "cowDiagram.bodyParts.loin.marbling",
    culinaryKeys: [
      "cowDiagram.bodyParts.loin.culinary.0",
      "cowDiagram.bodyParts.loin.culinary.1",
      "cowDiagram.bodyParts.loin.culinary.2",
    ],
    bestMethodKey: "cowDiagram.bodyParts.loin.bestMethod",
    position: { top: "30%", left: "58%" },
    cutsKeys: [
      "cowDiagram.bodyParts.loin.cuts.0",
      "cowDiagram.bodyParts.loin.cuts.1",
      "cowDiagram.bodyParts.loin.cuts.2",
    ],
  },
  {
    id: "sirloin",
    nameKey: "cowDiagram.bodyParts.sirloin.name",
    subtitleKey: "cowDiagram.bodyParts.sirloin.subtitle",
    descriptionKey: "cowDiagram.bodyParts.sirloin.description",
    meatQualityKey: "cowDiagram.bodyParts.sirloin.meatQuality",
    marblingKey: "cowDiagram.bodyParts.sirloin.marbling",
    culinaryKeys: [
      "cowDiagram.bodyParts.sirloin.culinary.0",
      "cowDiagram.bodyParts.sirloin.culinary.1",
      "cowDiagram.bodyParts.sirloin.culinary.2",
    ],
    bestMethodKey: "cowDiagram.bodyParts.sirloin.bestMethod",
    position: { top: "18%", left: "68%" },
    cutsKeys: [
      "cowDiagram.bodyParts.sirloin.cuts.0",
      "cowDiagram.bodyParts.sirloin.cuts.1",
      "cowDiagram.bodyParts.sirloin.cuts.2",
    ],
  },
  {
    id: "round",
    nameKey: "cowDiagram.bodyParts.round.name",
    subtitleKey: "cowDiagram.bodyParts.round.subtitle",
    descriptionKey: "cowDiagram.bodyParts.round.description",
    meatQualityKey: "cowDiagram.bodyParts.round.meatQuality",
    marblingKey: "cowDiagram.bodyParts.round.marbling",
    culinaryKeys: [
      "cowDiagram.bodyParts.round.culinary.0",
      "cowDiagram.bodyParts.round.culinary.1",
      "cowDiagram.bodyParts.round.culinary.2",
    ],
    bestMethodKey: "cowDiagram.bodyParts.round.bestMethod",
    position: { top: "35%", left: "72%" },
    cutsKeys: [
      "cowDiagram.bodyParts.round.cuts.0",
      "cowDiagram.bodyParts.round.cuts.1",
      "cowDiagram.bodyParts.round.cuts.2",
    ],
  },
  {
    id: "flank",
    nameKey: "cowDiagram.bodyParts.flank.name",
    subtitleKey: "cowDiagram.bodyParts.flank.subtitle",
    descriptionKey: "cowDiagram.bodyParts.flank.description",
    meatQualityKey: "cowDiagram.bodyParts.flank.meatQuality",
    marblingKey: "cowDiagram.bodyParts.flank.marbling",
    culinaryKeys: [
      "cowDiagram.bodyParts.flank.culinary.0",
      "cowDiagram.bodyParts.flank.culinary.1",
      "cowDiagram.bodyParts.flank.culinary.2",
    ],
    bestMethodKey: "cowDiagram.bodyParts.flank.bestMethod",
    position: { top: "46%", left: "58%" },
    cutsKeys: [
      "cowDiagram.bodyParts.flank.cuts.0",
      "cowDiagram.bodyParts.flank.cuts.1",
      "cowDiagram.bodyParts.flank.cuts.2",
    ],
  },
  {
    id: "shank",
    nameKey: "cowDiagram.bodyParts.shank.name",
    subtitleKey: "cowDiagram.bodyParts.shank.subtitle",
    descriptionKey: "cowDiagram.bodyParts.shank.description",
    meatQualityKey: "cowDiagram.bodyParts.shank.meatQuality",
    marblingKey: "cowDiagram.bodyParts.shank.marbling",
    culinaryKeys: [
      "cowDiagram.bodyParts.shank.culinary.0",
      "cowDiagram.bodyParts.shank.culinary.1",
      "cowDiagram.bodyParts.shank.culinary.2",
    ],
    bestMethodKey: "cowDiagram.bodyParts.shank.bestMethod",
    position: { top: "49%", left: "36%" },
    cutsKeys: [
      "cowDiagram.bodyParts.shank.cuts.0",
      "cowDiagram.bodyParts.shank.cuts.1",
      "cowDiagram.bodyParts.shank.cuts.2",
    ],
  },
];

interface CowBodyDiagramProps {
  className?: string;
}

export function CowBodyDiagram({ className }: CowBodyDiagramProps) {
  const [activePart, setActivePart] = useState<string | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { t } = useLocalization();
  const fallbackImage = "/placeholder/no-image.jpg";

  // Localize body parts data
  const bodyParts = bodyPartsKeys.map((part) => ({
    ...part,
    name: t(part.nameKey),
    subtitle: t(part.subtitleKey),
    description: t(part.descriptionKey),
    meatQuality: t(part.meatQualityKey),
    marbling: t(part.marblingKey),
    culinary: part.culinaryKeys.map((key) => t(key)),
    bestMethod: t(part.bestMethodKey),
    cuts: part.cutsKeys.map((key) => t(key)),
  }));

  const activePartData = bodyParts.find((p) => p.id === activePart);

  return (
    <section
      className={cn("py-24 px-4 sm:px-8 max-w-screen-2xl mx-auto", className)}
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-16"
      >
        <SectionMiniHeading heading={t("cowDiagram.sectionHeading")} />
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
          {t("cowDiagram.title")}
        </h2>
        <p className="text-on-surface-variant text-lg max-w-2xl mx-auto leading-relaxed">
          {t("cowDiagram.description")}
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Interactive Cow Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 relative"
        >
          <div className="relative aspect-4/3 bg-linear-to-br from-surface-container to-surface-container-low rounded-3xl overflow-hidden shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_2px_2px,currentColor_1px,transparent_0)] bg-size-[24px_24px]" />

            {/* Cow Body Image - RECOMMENDATION: Use a butcher's diagram silhouette */}
            <div className="absolute inset-0 p-8 sm:p-12">
              <Image
                alt="Beef Cuts Diagram"
                src={imgError ? fallbackImage : "/cow-body.png"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={cn(
                  "object-contain transition-opacity duration-500",
                  isImageLoaded ? "opacity-100" : "opacity-0",
                  imgError && "scale-50",
                )}
                onLoad={() => setIsImageLoaded(true)}
                onError={() => setImgError(true)}
                priority
              />

              {/* Overlay hint if using pastoral image */}
              {!isImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant">
                  <span className="text-sm">{t("cowDiagram.loading")}</span>
                </div>
              )}
            </div>

            {/* Interactive Hotspots */}
            <div className="absolute inset-0 p-8 sm:p-12">
              {bodyParts.map((part) => (
                <motion.div
                  key={part.id}
                  className="absolute"
                  style={{
                    top: part.position.top,
                    left: part.position.left,
                    transform: "translate(-50%, -50%)",
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + bodyParts.indexOf(part) * 0.05 }}
                >
                  <motion.button
                    className={cn(
                      "relative w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all duration-300",
                      activePart === part.id
                        ? "bg-primary-fixed text-on-primary-fixed scale-110"
                        : "bg-white/90 text-primary hover:bg-primary-fixed hover:text-on-primary-fixed hover:scale-110",
                    )}
                    onMouseEnter={() => setActivePart(part.id)}
                    onMouseLeave={() => setActivePart(null)}
                    onClick={() =>
                      setActivePart(activePart === part.id ? null : part.id)
                    }
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Beef className="w-5 h-5" />

                    {/* Pulsing ring animation */}
                    {activePart === part.id && (
                      <>
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-primary-fixed"
                          initial={{ scale: 1, opacity: 0.8 }}
                          animate={{ scale: 2.2, opacity: 0 }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeOut",
                          }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full border border-primary-fixed/50"
                          initial={{ scale: 1, opacity: 0.5 }}
                          animate={{ scale: 1.8, opacity: 0 }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeOut",
                            delay: 0.2,
                          }}
                        />
                      </>
                    )}
                  </motion.button>

                  {/* Tooltip on hover */}
                  <AnimatePresence>
                    {activePart === part.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.9 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-3 pointer-events-none z-20"
                      >
                        <div className="bg-surface-container-high px-3 py-1.5 rounded-lg shadow-lg border border-outline-variant/20 whitespace-nowrap">
                          <span className="text-xs font-bold text-on-surface">
                            {part.name}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Decorative corner accents */}
            <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-primary-fixed/20 rounded-tl-2xl" />
            <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-primary-fixed/20 rounded-br-2xl" />
          </div>

          {/* Mobile Quick Select */}
          <div className="lg:hidden mt-6 flex flex-wrap gap-2">
            {bodyParts.map((part) => (
              <button
                key={part.id}
                onClick={() =>
                  setActivePart(activePart === part.id ? null : part.id)
                }
                className={cn(
                  "px-3 py-2 rounded-full text-xs font-semibold transition-all",
                  activePart === part.id
                    ? "bg-primary-fixed text-on-primary-fixed"
                    : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high",
                )}
              >
                {part.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Details Panel */}
        <div className="lg:col-span-5 space-y-4">
          <AnimatePresence mode="wait">
            {activePartData ? (
              <motion.div
                key={activePartData.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="bg-surface-container rounded-3xl p-6 sm:p-8 border border-outline-variant/10 shadow-xl"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <motion.h3
                      className="text-3xl font-bold mb-1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {activePartData.name}
                    </motion.h3>
                    <motion.span
                      className="text-primary font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {activePartData.subtitle}
                    </motion.span>
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-12 h-12 rounded-2xl bg-primary-fixed/10 flex items-center justify-center"
                  >
                    <Beef className="w-6 h-6 text-primary-fixed" />
                  </motion.div>
                </div>

                {/* Description */}
                <motion.p
                  className="text-on-surface-variant leading-relaxed mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  {activePartData.description}
                </motion.p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <motion.div
                    className="bg-surface-container-low rounded-2xl p-4 border border-outline-variant/5"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center gap-2 text-outline mb-1">
                      <Info className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        {t("cowDiagram.stats.quality")}
                      </span>
                    </div>
                    <span className="text-lg font-bold text-on-surface">
                      {activePartData.meatQuality}
                    </span>
                  </motion.div>

                  <motion.div
                    className="bg-surface-container-low rounded-2xl p-4 border border-outline-variant/5"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <div className="flex items-center gap-2 text-outline mb-1">
                      <Droplets className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        {t("cowDiagram.stats.marbling")}
                      </span>
                    </div>
                    <span className="text-lg font-bold text-on-surface">
                      {activePartData.marbling}
                    </span>
                  </motion.div>
                </div>

                {/* Best Method */}
                <motion.div
                  className="bg-primary-fixed/10 rounded-2xl p-4 mb-6 border border-primary-fixed/20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-2 text-primary-fixed mb-2">
                    <Flame className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {t("cowDiagram.bestMethod")}
                    </span>
                  </div>
                  <span className="text-xl font-bold text-on-surface">
                    {activePartData.bestMethod}
                  </span>
                </motion.div>

                {/* Popular Cuts */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                >
                  <h4 className="text-sm font-bold text-outline uppercase tracking-wider mb-3">
                    {t("cowDiagram.popularCuts")}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activePartData.cuts.map((cut, idx) => (
                      <motion.span
                        key={cut}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + idx * 0.05 }}
                        className="px-3 py-1.5 bg-surface-container-high rounded-full text-sm font-medium text-on-surface border border-outline-variant/10"
                      >
                        {cut}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Culinary Uses */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                  className="mt-6 pt-6 border-t border-outline-variant/10"
                >
                  <h4 className="text-sm font-bold text-outline uppercase tracking-wider mb-3">
                    {t("cowDiagram.perfectFor")}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activePartData.culinary.map((dish) => (
                      <span
                        key={dish}
                        className="inline-flex items-center gap-1 text-sm text-on-surface-variant"
                      >
                        <ChevronRight className="w-4 h-4 text-primary-fixed" />
                        {dish}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-surface-container/50 rounded-3xl p-8 sm:p-12 text-center border border-dashed border-outline-variant min-h-100 flex flex-col items-center justify-center"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-20 h-20 rounded-3xl bg-surface-container-high flex items-center justify-center mb-6"
                >
                  <Beef className="w-10 h-10 text-primary-fixed/50" />
                </motion.div>
                <h3 className="text-xl font-bold text-on-surface mb-2">
                  {t("cowDiagram.empty.title")}
                </h3>
                <p className="text-on-surface-variant max-w-xs leading-relaxed">
                  {t("cowDiagram.empty.description")}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Legend for Desktop */}
          <div className="hidden lg:block">
            <h4 className="text-xs font-bold text-outline uppercase tracking-wider mb-3 px-2">
              {t("cowDiagram.quickNav")}
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {bodyParts.map((part) => (
                <motion.button
                  key={part.id}
                  onMouseEnter={() => setActivePart(part.id)}
                  onMouseLeave={() => setActivePart(null)}
                  onClick={() =>
                    setActivePart(activePart === part.id ? null : part.id)
                  }
                  className={cn(
                    "text-left p-3 rounded-xl transition-all duration-200",
                    activePart === part.id
                      ? "bg-primary-fixed text-on-primary-fixed shadow-lg shadow-primary-fixed/20"
                      : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface",
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="block text-xs font-bold mb-0.5 opacity-70">
                    {part.subtitle}
                  </span>
                  <span className="block text-sm font-bold">{part.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
