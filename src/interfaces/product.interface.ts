export interface Product {
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  // type: Types;
  gender: ValidCategory;
}

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type Types = "shirts" | "pants" | "hoodies" | "hats";
export type ValidCategory = "men" | "women" | "kid" | "unisex";
