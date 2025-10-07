"use client";

import { useState } from "react";
import { Loader } from "lucide-react";

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
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setFileName(file.name);
    setUploading(true);
    setError(null);

    try {
      if (onUploading) onUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/file/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const result = await res.json();
      setUploading(false);
      if (onUploaded) onUploaded(result);
    } catch (err: any) {
      setUploading(false);
      setPreview(null);
      setFileName(null);
      const msg = err?.message || "Failed to upload image. Please try again.";
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
