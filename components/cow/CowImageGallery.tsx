"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/theme/theme.config";
import type { CowDetails } from "@/lib/models/productDTO";
import { ImageModal } from "@/components/ui/ImageModal";

interface CowImageGalleryProps {
  cow: CowDetails;
  className?: string;
}

export function CowImageGallery({ cow, className }: CowImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  // Get base URL from environment
  const baseImageUrl = process.env.NEXT_PUBLIC_API_BASE_IMAGE_URL || "";

  // Helper to prepend base URL to image path
  const getImageUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http") || path.startsWith("/")) return path;
    return `${baseImageUrl}${path}`;
  };

  // Check if path is valid image
  const isValidImage = (path: string) => {
    if (!path) return false;
    const invalidValues = ["None", "null", "undefined", ""];
    return !invalidValues.includes(path);
  };

  // Extract all images from cow details
  const images = [
    {
      url: getImageUrl(cow.left_side_image),
      label: "Left Side",
      key: "left_side_image",
    },
    {
      url: getImageUrl(cow.right_side_image),
      label: "Right Side",
      key: "right_side_image",
    },
    {
      url: getImageUrl(cow.image_with_owner),
      label: "With Owner",
      key: "image_with_owner",
    },
    {
      url: getImageUrl(cow.vet_certificate),
      label: "Vet Certificate",
      key: "vet_certificate",
    },
    {
      url: getImageUrl(cow.challan_paper),
      label: "Challan Paper",
      key: "challan_paper",
    },
    {
      url: getImageUrl(cow.chairman_certificate),
      label: "Chairman Certificate",
      key: "chairman_certificate",
    },
  ].filter((img) => isValidImage(img.url));

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // If no images, show fallback message
  if (images.length === 0) {
    return (
      <div className={cn("text-center py-12", className)}>
        <p className="text-slate-500">No images available for this cow.</p>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-4xl font-black text-slate-900 leading-tight mb-8">
        Cattle 
        <span className="text-emerald-600"> Gallery</span>
      </h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={cn(
          "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4",
          className,
        )}
      >
        {images.map((img, index) => (
          <motion.div
            key={img.key}
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedImageIndex(index)}
            className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-slate-100"
          >
            {/* Image */}
            <Image
              src={img.url}
              alt={img.label}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Label Badge */}
            <div className="absolute bottom-3 left-3 right-3">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-slate-700 shadow-sm">
                {img.label}
              </span>
            </div>

            {/* Zoom Icon on Hover */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Fill empty slots for aesthetic grid (optional) */}
        {images.length % 4 !== 0 && images.length > 4 && (
          <div className="hidden lg:block" />
        )}
      </motion.div>

      {/* Image Modal */}
      <ImageModal
        images={images.map((img) => img.url)}
        initialIndex={selectedImageIndex ?? 0}
        isOpen={selectedImageIndex !== null}
        onClose={() => setSelectedImageIndex(null)}
      />
    </>
  );
}
