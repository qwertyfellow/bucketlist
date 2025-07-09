import { writeClient } from "@/sanity/lib/writeClient";
import { client } from "@/sanity/lib/client";

export async function createOrUpdateCreator(user: {
  _id: string;
  name: string;
  email: string;
  image?: string;
  accountId?: string;
}) {
  const { _id, name, email, image, accountId } = user;
  console.log("createOrUpdate user", user)

  // 2. Check if creator already exists
  const existingCreator = await client.fetch(
    `*[_type == "creator" && email == $email][0]`,
    { email }
  );
  console.log("createOrUpdate existingCreator", existingCreator)

  if (!existingCreator) {
    // 3. Create a new creator doc
    await writeClient.create({
      _type: "creator",
      authId: accountId,
      name,
      email,
      image,
      bio: "New creator",
      isCreator: true,
      createdAt: new Date().toISOString(),
      slug: {
        current: `${name?.toLowerCase().replace(/\s+/g, "-")}-${_id.slice(-4)}`
      },
    });
  }
}
