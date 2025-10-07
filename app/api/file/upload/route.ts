import { NextRequest, NextResponse } from "next/server";
import { adminStorage } from "@/lib/firebase/firebaseAdmin";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {

  // Only authenticated users
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const filePath = `images/${session.user.sanityId}/${Date.now()}-${file.name}`;
  const storageFile = adminStorage.file(filePath);

  // Convert File to Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Upload
  await storageFile.save(buffer, {
    contentType: file.type,
    resumable: false,
    metadata: {
      firebaseStorageDownloadTokens: crypto.randomUUID(),
    },
  });

  // Generate public URL
  const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${process.env.FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(filePath)}?alt=media`;

  return NextResponse.json({ url: publicUrl });
}
