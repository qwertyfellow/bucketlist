"use server";

import { auth } from "@/auth";
import { adminStorage } from "@/lib/firebase/firebaseAdmin";

export async function generateUploadUrl(fileName: string, contentType: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const filePath = `images/${session.user.sanityId}/${Date.now()}-${fileName}`;
  const file = adminStorage.file(filePath);

  const [url] = await file.getSignedUrl({
    action: "write",
    expires: Date.now() + 5 * 60 * 1000, // 5 minutes
    contentType,
  });

  return { url, filePath };
}
