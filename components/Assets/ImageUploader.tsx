"use client"

import { useState } from "react"
import { Loader } from "lucide-react"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage } from "@/lib/firebase/firebase"

export default function ImageUploader({ onUploaded, onUploading, onUploadFailed }: {
  onUploaded?: (res: any) => void
  onUploadFailed?: (err: any) => void
  onUploading?: (uploading: boolean) => void
}) {

  // Variable states
  const [fileName, setFileName] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Action states
  const [uploading, setUploading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setPreview(URL.createObjectURL(file))
    setError(null)
    setUploading(true)

    try {
      console.log("1. Trying to upload")
      if (onUploading) onUploading(true)
      const storageRef = ref(storage, `images/${file.name}`)
      console.log("storageRef", storageRef)
      const uploadTask = uploadBytesResumable(storageRef, file)
      console.log("uploadTask", uploadTask)

      uploadTask.on(
        "state_changed",
        null,
        (err) => {
          setUploading(false)
          setPreview(null)
          setFileName(null)
          setError(err.message)
          if (onUploadFailed) onUploadFailed(err)
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          console.log("downloadURL", downloadURL)
          setUploading(false)
          if (onUploaded) onUploaded({ url: downloadURL, name: file.name })
        }
      )
    } catch (err: any) {
      setUploading(false)
      setPreview(null)
      setFileName(null)
      setError(err.message || "Upload failed")
      if (onUploadFailed) onUploadFailed(err)
    }
  }

  return (
    <div>
      <label className="bucketlist-form_label">Cover image*</label>
      <p className="mb-2 text-gray-600">JPEG, PNG up to 100MB</p>

      <input type="file" accept="image/*" onChange={handleFileChange} className="cursor-pointer" />

      {preview && (
        <div className="relative w-32 h-32 mt-2">
          <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-md border" />

          {fileName && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs text-center p-1 truncate rounded-b-md">
              {fileName}
            </div>
          )}

          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-md">
              <Loader className="animate-spin text-white w-6 h-6" />
            </div>
          )}
        </div>
      )}

      {error && <p className="bucketlist-form_error mt-2">{error}</p>}
    </div>
  )
}
