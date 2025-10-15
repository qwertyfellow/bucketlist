"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import { writeClient } from "@/sanity/lib/writeClient";
import "server-only";

const deleteBucketListAction = async (bucketListId: string) => {

    // 1. Verify session details
    const session = await auth();
    if (!session) {
        return parseServerActionResponse({
        status: "ERROR",
        error: "You must be logged in to delete a bucketlist.",
        });
    }

    try {
        // 2. Use write client to delete the item from Sanity
        const response = await writeClient.delete(bucketListId).catch(err => {
            throw err;
        });

        // 3. Successful response
        return parseServerActionResponse({
            ...response,
            error: "",
            status: "SUCCESS",
        });
    } catch (error) {
        // 4. Error response
        return parseServerActionResponse({
            status: "ERROR",
            error: JSON.stringify(error),
        });
    }
};

export default deleteBucketListAction;
