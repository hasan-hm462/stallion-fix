import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "@/lib/firebase";

export const uploadFile = (
  file: File,
  folder: string,
  onProgress?: (pct: number) => void
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const safe = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const path = `${folder}/${Date.now()}-${safe}`;
    const r = ref(storage, path);
    // Pass contentType explicitly — without it, Firebase Storage Rules that
    // restrict by request.resource.contentType (e.g. "video/*") reject the upload.
    const contentType = file.type || "application/octet-stream";
    const task = uploadBytesResumable(r, file, { contentType });
    task.on(
      "state_changed",
      (snap) => onProgress?.((snap.bytesTransferred / snap.totalBytes) * 100),
      (err) => {
        // Surface a clearer error message to the caller
        // eslint-disable-next-line no-console
        console.error("[uploadFile] failed", { path, contentType, size: file.size, err });
        reject(err);
      },
      async () => {
        try {
          const url = await getDownloadURL(task.snapshot.ref);
          resolve(url);
        } catch (err) {
          reject(err);
        }
      }
    );
  });
};

export const deleteFileByUrl = async (url: string) => {
  try {
    const r = ref(storage, url);
    await deleteObject(r);
  } catch {
    // ignore — file may already be gone
  }
};
