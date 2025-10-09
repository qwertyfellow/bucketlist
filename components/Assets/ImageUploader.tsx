"use client";

import { useState } from "react";
import { Loader } from "lucide-react";
import { generateUploadUrl } from "@/lib/actions/assets/generatePreSignedURL";

export default function ImageUploader({
  onUploaded,
  onUploading,
  onUploadFailed,
}: {
  onUploaded?: (response: any) => void;
  onUploadFailed?: (response: any) => void;
  onUploading?: (response: any) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setFileName(file.name);
    setUploading(true);
    setError(null);

    try {
      if (onUploading) onUploading(true);

      // Step 1: Generate presigned URL
      const { url, filePath } = await generateUploadUrl(file.name, file.type);

      // Step 2: Upload directly to Firebase
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!res.ok) throw new Error("Upload failed");

      // Step 3: Construct public URL
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(filePath)}?alt=media`;

      setUploading(false);
      if (onUploaded) onUploaded({ url: publicUrl });
    } catch (err: any) {
      setUploading(false);
      setPreview(null);
      setFileName(null);
      const msg = err?.message || "Upload failed";
      setError(msg);
      if (onUploadFailed) onUploadFailed(err);
    }
  };

  return (
    <div className="relative w-32">
      {fileName && <p className="text-sm mb-1 font-medium">{fileName}</p>}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="cursor-pointer"
      />

      {preview && (
        <div className="relative w-32 h-32">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover rounded-md border"
          />
          {uploading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-md">
              <Loader className="animate-spin text-white w-6 h-6" />
            </div>
          )}
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
