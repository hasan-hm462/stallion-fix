import { useState, useRef } from "react";
import { Upload, X, Loader2, Image as ImageIcon, Video } from "lucide-react";
import { uploadFile } from "@/services/storage";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Props {
  value: string | string[];
  onChange: (val: any) => void;
  folder: string;
  multiple?: boolean;
  accept?: string;
  label?: string;
  isVideo?: boolean;
}

export const MediaUploader = ({
  value,
  onChange,
  folder,
  multiple = false,
  accept = "image/*",
  label,
  isVideo = false,
}: Props) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const items = multiple ? (value as string[]) || [] : value ? [value as string] : [];

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    // Friendly client-side validation so users see why an upload failed
    // (Firebase Storage default max is 5GB, but most projects set lower limits in rules)
    const MAX_BYTES = isVideo ? 200 * 1024 * 1024 : 25 * 1024 * 1024;
    for (const f of Array.from(files)) {
      if (f.size > MAX_BYTES) {
        toast.error(
          `${f.name} is ${(f.size / 1024 / 1024).toFixed(1)}MB — max ${
            MAX_BYTES / 1024 / 1024
          }MB${isVideo ? " for videos" : ""}.`
        );
        return;
      }
      if (isVideo && f.type && !f.type.startsWith("video/")) {
        toast.error(`${f.name} is not a video file.`);
        return;
      }
    }

    setUploading(true);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        const url = await uploadFile(file, folder, setProgress);
        urls.push(url);
      }
      if (multiple) {
        onChange([...((value as string[]) || []), ...urls]);
      } else {
        onChange(urls[0]);
      }
      toast.success("Upload complete");
    } catch (err: any) {
      const code = err?.code || "";
      const msg = err?.message || "Upload failed";
      // Map common Firebase Storage errors to readable messages
      let friendly = msg;
      if (code === "storage/unauthorized") {
        friendly =
          "Upload blocked by storage rules. Check that videos/this file type are allowed and that you are signed in as admin.";
      } else if (code === "storage/canceled") {
        friendly = "Upload canceled.";
      } else if (code === "storage/quota-exceeded") {
        friendly = "Storage quota exceeded.";
      } else if (code === "storage/retry-limit-exceeded") {
        friendly = "Network too slow — upload timed out. Try a smaller file or a stronger connection.";
      }
      toast.error(friendly);
      // eslint-disable-next-line no-console
      console.error("[MediaUploader] upload failed", { code, err });
    } finally {
      setUploading(false);
      setProgress(0);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const removeAt = (idx: number) => {
    if (multiple) {
      const next = [...(value as string[])];
      next.splice(idx, 1);
      onChange(next);
    } else {
      onChange("");
    }
  };

  return (
    <div className="space-y-3">
      {label && <p className="text-sm font-medium">{label}</p>}

      {items.length > 0 && (
        <div className={cn("grid gap-3", multiple ? "grid-cols-2 md:grid-cols-4" : "grid-cols-1 max-w-xs")}>
          {items.map((url, i) => (
            <div key={url + i} className="relative group rounded-md overflow-hidden border bg-muted aspect-video">
              {isVideo ? (
                <video src={url} className="h-full w-full object-contain" muted />
              ) : (
                <img src={url} alt="" className="h-full w-full object-contain" />
              )}
              <button
                type="button"
                onClick={() => removeAt(i)}
                className="absolute top-1.5 right-1.5 bg-primary/90 text-primary-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
                aria-label="Remove"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="border-dashed"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {Math.round(progress)}%
            </>
          ) : (
            <>
              {isVideo ? <Video className="h-4 w-4" /> : <ImageIcon className="h-4 w-4" />}
              {multiple ? "Add files" : items.length ? "Replace" : "Upload"}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
