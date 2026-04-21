import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface SiteSettings {
  whatsappNumber?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  mapUrl?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  aboutText?: string;
  socialInstagram?: string;
  socialFacebook?: string;
  socialYoutube?: string;
}

const REF = doc(db, "settings", "site");

export const fetchSettings = async (): Promise<SiteSettings> => {
  const snap = await getDoc(REF);
  return snap.exists() ? (snap.data() as SiteSettings) : {};
};

export const saveSettings = async (data: SiteSettings) => {
  await setDoc(REF, { ...data, updatedAt: serverTimestamp() }, { merge: true });
};
