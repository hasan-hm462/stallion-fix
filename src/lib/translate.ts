/**
 * Lightweight EN → AR translation using Google's public translate endpoint.
 * No API key required. Used only inside the admin to auto-fill Arabic fields.
 * If the request fails (network/quota), returns an empty string and the user
 * can still type the Arabic text manually.
 */
export async function translateToArabic(text: string): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed) return "";
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(
      trimmed
    )}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as unknown;
    // Response shape: [[[ "translated", "original", ... ], ...], ...]
    if (Array.isArray(data) && Array.isArray((data as any)[0])) {
      return (data as any[])[0]
        .map((seg: any[]) => (Array.isArray(seg) ? seg[0] : ""))
        .join("")
        .trim();
    }
    return "";
  } catch (err) {
    console.warn("[translate] fallback empty:", err);
    return "";
  }
}