export type HorseCategory = "farm" | "mares" | "stallions";
export type FarmSubcategory = "mares" | "bred" | "other";

export interface Horse {
  id: string;
  name: string;
  nameAr?: string;
  slug: string;
  category: HorseCategory;
  /** Only meaningful when category === "farm". Groups horses inside the Farm Horses page. */
  farmSubcategory?: FarmSubcategory;
  type: string;
  gender: "male" | "female" | "foal";
  shortDescription: string;
  shortDescriptionAr?: string;
  fullDescription: string;
  fullDescriptionAr?: string;
  mainImage: string;
  galleryImages?: string[];
  videoUrl?: string;
  motherName?: string;
  fatherName?: string;
  birthYear?: number;
  color?: string;
  featured?: boolean;
  displayOrder?: number;
}

export interface Festival {
  id: string;
  title: string;
  titleAr?: string;
  slug: string;
  description: string;
  descriptionAr?: string;
  eventDate: string; // ISO
  location: string;
  images: string[];
  videoUrl?: string;
  featured?: boolean;
}
