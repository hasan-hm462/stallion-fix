import type { Horse, Festival } from "@/types";
import grey from "@/assets/horse-grey-stallion.jpg";
import bay from "@/assets/horse-bay-mare.jpg";
import foal from "@/assets/horse-foal.jpg";
import black from "@/assets/horse-black-stallion.jpg";
import white from "@/assets/horse-white-arabian.jpg";
import chestnut from "@/assets/horse-chestnut-colt.jpg";
import festShow from "@/assets/festival-show.jpg";
import festTrophy from "@/assets/festival-trophy.jpg";
import farmStableInterior from "@/assets/farm-stable-interior.jpg";
import farmBarn from "@/assets/farm-barn-arch.jpg";
import farmRunning from "@/assets/farm-horses-running.jpg";

export const horses: Horse[] = [
  {
    id: "1",
    name: "Najm Al Sahra",
    nameAr: "نجم الصحراء",
    slug: "najm-al-sahra",
    category: "stallions",
    type: "Pure Arabian",
    gender: "male",
    shortDescription: "A grey stallion of refined presence and noble bloodlines.",
    fullDescription:
      "Najm Al Sahra carries the unmistakable elegance of classical Arabian lines — a luminous grey coat, an arched neck, and a temperament shaped by patient handling. He stands as a cornerstone of our breeding program.",
    mainImage: grey,
    galleryImages: [grey, farmStableInterior, farmRunning],
    motherName: "Layla Al Noor",
    fatherName: "Faris Al Asil",
    birthYear: 2018,
    color: "Grey",
    featured: true,
    displayOrder: 1,
  },
  {
    id: "2",
    name: "Layla Al Noor",
    nameAr: "ليلى النور",
    slug: "layla-al-noor",
    category: "mares",
    type: "Pure Arabian",
    gender: "female",
    shortDescription: "A bay mare with quiet intelligence and exceptional movement.",
    fullDescription:
      "Layla embodies the soulful gaze and refined silhouette that define our farm. A foundation mare whose foals consistently inherit her grace and balance.",
    mainImage: bay,
    galleryImages: [bay, farmBarn],
    birthYear: 2015,
    color: "Bay",
    featured: true,
    displayOrder: 2,
  },
  {
    id: "3",
    name: "Amir Al Mazloum",
    nameAr: "أمير المظلوم",
    slug: "amir-al-mazloum",
    category: "farm",
    farmSubcategory: "bred",
    type: "Pure Arabian",
    gender: "foal",
    shortDescription: "A bright young foal of promising lineage, born at the stud.",
    fullDescription:
      "Bred and raised at Al Mazloum Stud, Amir is the embodiment of our vision — a future ambassador for the bloodlines we steward.",
    mainImage: foal,
    galleryImages: [foal, farmRunning],
    motherName: "Layla Al Noor",
    fatherName: "Najm Al Sahra",
    birthYear: 2024,
    color: "Bay",
    featured: true,
    displayOrder: 3,
  },
  {
    id: "4",
    name: "Sultan Al Layl",
    nameAr: "سلطان الليل",
    slug: "sultan-al-layl",
    category: "stallions",
    type: "Pure Arabian",
    gender: "male",
    shortDescription: "A black stallion of fire and presence, a true showman.",
    fullDescription:
      "Sultan Al Layl is power refined into elegance — a spirited stallion whose charisma fills any arena.",
    mainImage: black,
    galleryImages: [black],
    birthYear: 2017,
    color: "Black",
    featured: true,
    displayOrder: 4,
  },
  {
    id: "5",
    name: "Bayan",
    nameAr: "بيان",
    slug: "bayan",
    category: "mares",
    type: "Pure Arabian",
    gender: "female",
    shortDescription: "A pure white mare of luminous beauty and serene temperament.",
    fullDescription:
      "Bayan moves with the quiet authority of a mare who knows her worth. Her descendants carry her unmistakable refinement.",
    mainImage: white,
    galleryImages: [white],
    birthYear: 2014,
    color: "Grey / White",
    displayOrder: 5,
  },
  {
    id: "6",
    name: "Faris Al Saghir",
    nameAr: "فارس الصغير",
    slug: "faris-al-saghir",
    category: "farm",
    farmSubcategory: "bred",
    type: "Pure Arabian",
    gender: "foal",
    shortDescription: "A spirited chestnut colt born and raised at the stud.",
    fullDescription:
      "Faris Al Saghir reflects the joy and vitality of our young generation — bred with care, raised with love.",
    mainImage: chestnut,
    galleryImages: [chestnut],
    motherName: "Bayan",
    fatherName: "Sultan Al Layl",
    birthYear: 2024,
    color: "Chestnut",
    displayOrder: 6,
  },
];

export const festivals: Festival[] = [
  {
    id: "f1",
    title: "International Arabian Horse Show",
    titleAr: "عرض الخيل العربية الدولي",
    slug: "international-arabian-show",
    description:
      "A celebration of bloodline excellence, gathering breeders and admirers from across the region. Al Mazloum Stud proudly presented several of its finest representatives.",
    eventDate: "2025-09-14",
    location: "Damascus, Syria",
    images: [festShow, festTrophy, farmRunning],
    featured: true,
  },
  {
    id: "f2",
    title: "Champion of Champions Cup",
    titleAr: "كأس بطل الأبطال",
    slug: "champion-of-champions-cup",
    description:
      "An evening of triumph and elegance — our stallion Najm Al Sahra brought home a champion title in this prestigious annual gathering.",
    eventDate: "2024-11-22",
    location: "Aleppo, Syria",
    images: [festTrophy, festShow],
    featured: true,
  },
];

export const homepageGallery = [
  farmStableInterior,
  farmBarn,
  farmRunning,
  grey,
];
