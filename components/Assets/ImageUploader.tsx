"use client"

import { uploadImage } from "@/lib/actions/assets/uploadAsset"
import { useState } from "react"

export default function ImageUploader({
  onUploaded,
  onUploading,
  onUploadFailed,
}: {
  onUploaded?: (response: any) => void
  onUploadFailed?: (response: any) => void
  onUploading?: (response: any) => void
}) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setPreview(URL.createObjectURL(file))
    setUploading(true)
    setError(null)

    try {
      if(onUploading) onUploading(true)
      const result = await uploadImage(file)
      setUploading(false)
      if (onUploaded) onUploaded(result)
    } catch (err: any) {
      setUploading(false)
      const msg = err?.message || "Failed to upload image. Please try again."
      setError(msg)
      if (onUploadFailed) onUploadFailed(err)
    }
  }

  return (
    <div className="">
      <label className="bucketlist-form_label">Cover image*</label>
      <p className="mb-2 text-gray-600">JPEG, PNG supported with maximum size of 25MB.</p>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="cursor-pointer"
      />

      {(!error && preview) && (
        <img
          src={preview}
          alt="Preview"
          className="w-32 h-32 object-cover rounded-md border"
        />
      )}

      {uploading && <p className="text-sm text-gray-500">Uploading...</p>}

      {error && (
        <p className="bucketlist-form_error">{error}</p>
      )}
    </div>
  )
}
