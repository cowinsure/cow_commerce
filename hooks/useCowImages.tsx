"use client";

import { useMemo } from "react";
import type { CowDetails } from "@/lib/models/productDTO";

const getBaseImageUrl = () => process.env.NEXT_PUBLIC_API_BASE_IMAGE_URL || "";

const normalizePath = (path: string | null | undefined): string | null => {
  if (!path) return null;

  const trimmed = path.trim();
  const lower = trimmed.toLowerCase();

  if (lower === "null" || lower === "undefined" || lower === "") {
    return null;
  }

  // ⚠️ IMPORTANT: DO NOT reject "None/"
  // your backend uses it as a real folder

  return trimmed;
};

const buildUrl = (path: string): string => {
  if (path.startsWith("http") || path.startsWith("/")) return path;

  const base = getBaseImageUrl().replace(/\/$/, "");
  const clean = path.replace(/^\//, "");

  return `${base}/${clean}`;
};

export interface CowImageItem {
  url: string;
  label: string;
  key: string;
  index: number;
}

export const useCowImages = (cow: CowDetails) => {
  const rawImages = useMemo(
    () => [
      { path: cow.left_side_image, label: "Left Side", key: "left_side_image" },
      {
        path: cow.right_side_image,
        label: "Right Side",
        key: "right_side_image",
      },
      {
        path: cow.image_with_owner,
        label: "With Owner",
        key: "image_with_owner",
      },
      {
        path: cow.vet_certificate,
        label: "Vet Certificate",
        key: "vet_certificate",
      },
      { path: cow.challan_paper, label: "Challan Paper", key: "challan_paper" },
      {
        path: cow.chairman_certificate,
        label: "Chairman Certificate",
        key: "chairman_certificate",
      },
    ],
    [cow],
  );

  const images: CowImageItem[] = useMemo(() => {
    return rawImages
      .map((img, idx) => {
        const normalized = normalizePath(img.path);
        if (!normalized) return null;

        return {
          url: buildUrl(normalized),
          label: img.label,
          key: img.key,
          index: idx,
        };
      })
      .filter(Boolean) as CowImageItem[];
  }, [rawImages]);

  return {
    images,
  };
};
