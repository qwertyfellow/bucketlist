import { writeClient } from "@/sanity/lib/writeClient"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get("file") as File | null

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
  }

  try {
    const asset = await writeClient.assets.upload("image", file, {
      filename: file.name,
      contentType: file.type,
    })

    return NextResponse.json({ id: asset._id, url: asset.url })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
