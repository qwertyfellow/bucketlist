"use server"

import { writeClient } from "@/sanity/lib/writeClient"

export async function uploadImageAction(file: File) {
  // Convert File → ArrayBuffer → Buffer
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  // Upload directly with buffer (no fetch)
  const asset = await writeClient.assets.upload("image", buffer, {
    filename: file.name,
    contentType: file.type,
  })

  return {
    id: asset._id,
    url: asset.url
  }
}
