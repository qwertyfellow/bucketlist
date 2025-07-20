"use server"
import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import { writeClient } from "@/sanity/lib/writeClient";
import "server-only"

const createBucketList = async (formData: FormData, content: string) => {
    
    const session = await auth();
    if(!session) {
        return parseServerActionResponse({
            status: "ERROR",
            error: "You must be logged in to create a startup."
        })
    }

    // Use write client and write item to sanity
    // writeClient.create()

    return {status: "SUCCESS"}
};

export default createBucketList;
