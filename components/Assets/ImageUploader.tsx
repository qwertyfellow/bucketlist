"use client"

import { uploadImageAction } from "@/lib/actions/assets/uploadAsset"
import { useState } from "react"

export default function ImageUploader({
  onUploaded,
}: {
  onUploaded?: (response: any) => void
}) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setPreview(URL.createObjectURL(file))
    setUploading(true)

    try {
      const result = await uploadImageAction(file)
      setUploading(false)

      if (onUploaded) onUploaded(result)
    } catch (err) {
      console.error("Upload failed", err)
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="cursor-pointer"
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-32 h-32 object-cover rounded-md border"
        />
      )}

      {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
    </div>
  )
}
