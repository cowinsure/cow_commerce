"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/theme/theme.config";
import type { CowDetails } from "@/lib/models/productDTO";

interface CowGalleryProps {
  cow: CowDetails;
  className?: string;
}

export function CowGallery({ cow, className }: CowGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Get base URL from environment
  const baseImageUrl = process.env.NEXT_PUBLIC_API_BASE_IMAGE_URL || "";

  // Helper to prepend base URL to image path
  const getImageUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http") || path.startsWith("/")) return path;
    return `${baseImageUrl}${path}`;
  };

  // Map CowDetails to component-compatible format
  const cowName = cow.name || `${cow.breed} #${cow.id}`;
  const images = [
    getImageUrl(cow.left_side_image),
    getImageUrl(cow.right_side_image),
    getImageUrl(cow.image_with_owner),
  ].filter(Boolean);
  const mainImage =
    images[activeImage] ||
    getImageUrl(cow.left_side_image) ||
    "/cowImg/WhatsApp Image 2026-04-01 at 3.57.13 PM (1).jpeg";
  const tag = cow.vet_certificate ? "Premium" : "Standard";
  const tagColor = cow.vet_certificate ? "primary-fixed" : "primary";

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: cowName,
        text: `Check out this ${cow.breed} - ${cowName}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* Main Image Container */}
      <div className="relative">
        <div
          className="aspect-[4/3] rounded-2xl overflow-hidden bg-surface-container relative cursor-zoom-in"
          onClick={() => setIsZoomed(!isZoomed)}
        >
          {/* Image wrapper with proper stacking context */}
          <div className="absolute inset-0 z-0">
            <Image
              alt={cow.name}
              className={cn(
                "w-full h-full object-cover transition-transform duration-300",
                isZoomed ? "scale-125" : "hover:scale-105",
              )}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              src={images[activeImage] || mainImage}
              priority
              style={{ position: "absolute" }}
            />
          </div>

          {/* Grade Tag - above image */}
          {/* <div className="absolute top-6 left-6 z-20">
            <span
              className={cn(
                "text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg",
                tagColor === "primary-fixed"
                  ? "bg-primary-fixed text-on-primary-fixed"
                  : "bg-primary text-on-primary",
              )}
            >
              {tag} Grade
            </span>
          </div> */}

          {/* Action Buttons - above image */}
          <div className="absolute top-6 right-6 z-20 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
            {/* <button
              onClick={(e) => {
                e.stopPropagation();
                handleShare();
              }}
              className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg"
              aria-label="Share"
            >
              <svg
                className="w-5 h-5 text-on-surface"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </button> */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(!isZoomed);
              }}
              className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg"
              aria-label="Zoom"
            >
              <svg
                className="w-5 h-5 text-on-surface"
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
            </button>
          </div>

          {/* Navigation Arrows - above image */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImage((prev) =>
                    prev === 0 ? images.length - 1 : prev - 1,
                  );
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <svg
                  className="w-5 h-5 text-on-surface"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImage((prev) =>
                    prev === images.length - 1 ? 0 : prev + 1,
                  );
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <svg
                  className="w-5 h-5 text-on-surface"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Image Counter - above image */}
          <div className="absolute bottom-6 right-6 z-20 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm font-medium">
            {activeImage + 1} / {images.length}
          </div>
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex gap-4 overflow-x-auto pb-2 px-2">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(index)}
            className={cn(
              "shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all",
              activeImage === index
                ? "border-emerald-400"
                : "border-transparent hover:border-primary/40 bg-surface-container",
            )}
          >
            <div className="relative w-full h-full">
              {activeImage === index && (
                <div className="bg-emerald-950/50 inset-0 absolute w-full h-full z-50"></div>
              )}
              <Image
                alt={`View ${index + 1}`}
                className="w-full h-full object-cover"
                fill
                sizes="96px"
                src={img}
              />
            </div>
          </button>
        ))}

        {/* Video Button */}
        {/* <button className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 border-transparent hover:border-primary/40 transition-all bg-surface-container flex items-center justify-center">
          <div className="flex flex-col items-center gap-1">
            <svg
              className="w-6 h-6 text-on-surface-variant"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-xs text-on-surface-variant">Video</span>
          </div>
        </button> */}

        {/* 360° View Button */}
        {/* <button className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 border-transparent hover:border-primary/40 transition-all bg-surface-container flex items-center justify-center">
          <div className="flex flex-col items-center gap-1">
            <svg
              className="w-6 h-6 text-on-surface-variant"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span className="text-xs text-on-surface-variant">360°</span>
          </div>
        </button> */}
      </div>
    </div>
  );
}
