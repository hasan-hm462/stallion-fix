import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Festival } from "@/types";
import { festivals as seedFestivals } from "@/data/seed";

const COL = "festivals";

export const fetchFestivals = async (): Promise<Festival[]> => {
  try {
    const q = query(collection(db, COL), orderBy("eventDate", "desc"));
    const snap = await getDocs(q);
    const items = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Festival, "id">) }));
    return items.length ? items : seedFestivals;
  } catch (err) {
    console.warn("[festivals] Firestore fetch failed, using seed:", err);
    return seedFestivals;
  }
};

export const createFestival = async (data: Omit<Festival, "id">) => {
  return addDoc(collection(db, COL), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
};

export const updateFestival = async (id: string, data: Partial<Festival>) => {
  return updateDoc(doc(db, COL, id), { ...data, updatedAt: serverTimestamp() });
};

export const deleteFestival = async (id: string) => deleteDoc(doc(db, COL, id));
