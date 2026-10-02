import { supabase } from "../client";

const STORAGE_BUCKET =
  process.env.REACT_APP_SUPABASE_STORAGE_BUCKET || "assests";

export const getStorageImageUrl = (image) => {
  if (typeof image !== "string") return image;

  const objectPath = image.trim();
  if (!objectPath || /^(https?:\/\/|data:|blob:)/i.test(objectPath)) {
    return image;
  }

  return supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(objectPath.replace(/^\/+/, "")).data.publicUrl;
};

export const resolveProductImage = getStorageImageUrl;

export const resolveProduct = (product) =>
  product && typeof product === "object"
    ? { ...product, image: resolveProductImage(product.image) }
    : product;

export const resolveProductImages = (products) =>
  Array.isArray(products) ? products.map(resolveProduct) : [];
