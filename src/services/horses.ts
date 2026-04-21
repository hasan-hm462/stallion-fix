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
import type { Horse } from "@/types";
import { horses as seedHorses } from "@/data/seed";

const COL = "horses";

export const fetchHorses = async (): Promise<Horse[]> => {
  try {
    const q = query(collection(db, COL), orderBy("displayOrder", "asc"));
    const snap = await getDocs(q);
    const items = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Horse, "id">) }));
    return items.length ? items : seedHorses;
  } catch (err) {
    console.warn("[horses] Firestore fetch failed, using seed:", err);
    return seedHorses;
  }
};

export const createHorse = async (data: Omit<Horse, "id">) => {
  return addDoc(collection(db, COL), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
};

export const updateHorse = async (id: string, data: Partial<Horse>) => {
  return updateDoc(doc(db, COL, id), { ...data, updatedAt: serverTimestamp() });
};

export const deleteHorse = async (id: string) => deleteDoc(doc(db, COL, id));
