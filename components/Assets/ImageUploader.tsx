"use client"

import { Loader } from "lucide-react"
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
  const [fileName, setFileName] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setPreview(URL.createObjectURL(file))
    setError(null)
    setUploading(true)

    try {
      if (onUploading) onUploading(true)

      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/file/upload", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) throw new Error("Upload failed")
      const result = await res.json()

      setUploading(false)
      if (onUploaded) onUploaded(result)
    } catch (err: any) {
      setUploading(false)
      const msg = err?.message || "Failed to upload image. Please try again."
      setError(msg)
      setPreview(null)
      setFileName(null)
      if (onUploadFailed) onUploadFailed(err)
    }
  }

  return (
    <div>
      <label className="bucketlist-form_label">Cover image*</label>
      <p className="mb-2 text-gray-600">
        JPEG, PNG supported with maximum size of 25MB.
      </p>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="cursor-pointer"
      />

      {(!error && preview) && (
        <div className="relative w-32 h-32 mt-2">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover rounded-md border"
          />

          {fileName && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs text-center p-1 truncate rounded-b-md">
              {fileName}
            </div>
          )}

          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-md">
              <Loader className="rotate text-white" />
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="bucketlist-form_error mt-2">{error}</p>
      )}
    </div>
  )
}
