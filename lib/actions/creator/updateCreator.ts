'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { parseServerActionResponse } from '@/lib/utils';
import { writeClient } from '@/sanity/lib/writeClient';

type ActionProperties = {
  id: string;
  name?: string;
  bio?: string;
  image?: string;
}

const updateCreatorAction = async ({
  id,
  name,
  bio,
  image,
}: ActionProperties
) => {

  const session = await auth();

  if(!session) {
      return parseServerActionResponse({
          status: "ERROR",
          error: "You must be logged in to create a bucketlist."
      })
  }

  // Only allow updating your own creator profile
  if (session?.user?.sanityId !== id) {
    return parseServerActionResponse({
            status: "ERROR",
            error: "You are not authorized to update this document."
    })
  }

  try {
    const result = await writeClient
      .patch(id)
      .set({
        name,
        bio,
        image,
      })
      .commit();

    // Revalidate any page that depends on this data
    revalidatePath(`/creators/profile/${id}`);
    revalidatePath(`/creators/profile/edit/${id}`);

    return parseServerActionResponse({
            ...result,
            error: "",
            status: "SUCCESS"
    });
  } catch (error) {
    return parseServerActionResponse({
            status: "ERROR",
            error: error?.message || "Failed to update creator."
    })
  }
}

export default updateCreatorAction;
