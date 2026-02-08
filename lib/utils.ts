// lib/helpers.ts
import { Image } from "./types";
import { MEDIA_BASE_URL } from "./api";

/**
 * Returns the URL of an image, handling both `string[]` and `Image[]`
 */
export function getImageUrl(img: string | Image): string {
  if (typeof img === "string") return img;
  return img.image.startsWith("http") ? img.image : `${MEDIA_BASE_URL}${img.image}`;
}

/**
 * Returns the image at index `idx` or a fallback if not available
 */
export function getImageAt(images: (string | Image)[], idx: number, fallback = "/placeholder.png"): string {
  if (!images || images.length <= idx) return fallback;
  return getImageUrl(images[idx]);
}
