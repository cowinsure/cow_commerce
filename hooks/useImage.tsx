"use client";

import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/theme/theme.config";

/**
 * Get the base URL for images from environment variables
 */
const getBaseImageUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_BASE_IMAGE_URL || "";
};

/**
 * Transform a raw image path to a full URL
 * - Returns empty string for null/undefined/"null"/"undefined"
 * - Returns as-is for absolute URLs (starts with http or /)
 * - Prepends base URL for relative paths
 */
export const getImageUrl = (path: string | null | undefined): string => {
  if (!path || path === "null" || path === "undefined") return "";
  if (path.startsWith("http") || path.startsWith("/")) return path;
  const baseUrl = getBaseImageUrl();
  return `${baseUrl}${path}`;
};

/**
 * Hook to get image URL helper functions
 * Usage:
 *   const { getImageUrl } = useImage();
 *   const imageSrc = getImageUrl(cow.image_with_owner);
 */
export const useImage = () => {
  return {
    getImageUrl,
    baseUrl: getBaseImageUrl(),
  };
};

interface ImageWithUrlProps {
  /** The raw image path from API (will be transformed to full URL) */
  src: string | null | undefined;
  /** Fallback image to show when src is empty */
  fallback?: string;
  /** Alt text for the image */
  alt: string;
  /** Additional className */
  className?: string;
  /** Next.js Image props */
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  loader?: ImageProps["loader"];
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  draggable?: boolean;
  loading?: "lazy" | "eager";
  suppressHydrationWarning?: boolean;
}

/**
 * Ready-to-use Image component that handles URL transformation automatically
 * Usage:
 *   <ImageWithUrl
 *     src={cow.image_with_owner}
 *     alt={cow.breed}
 *     className="w-full h-64 object-cover"
 *   />
 *
 * Or with fallback:
 *   <ImageWithUrl
 *     src={product.image}
 *     alt={product.name}
 *     fallback="/defaults/product.png"
 *   />
 */
export function ImageWithUrl({
  src,
  fallback,
  alt,
  className,
  ...props
}: ImageWithUrlProps) {
  const imageSrc = getImageUrl(src);
  const displaySrc = imageSrc || fallback || "/placeholder.png";

  return (
    <Image
      src={displaySrc}
      alt={alt || "Image"}
      className={cn("bg-emerald-50", className)}
      {...props}
    />
  );
}
