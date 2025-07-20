"use server"
import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import "server-only"

const createBucketList = async (formData: FormData, content: string) => {
    
    const session = await auth();
    if(!session) {
        return parseServerActionResponse({
            status: "ERROR",
            error: "You must be logged in to create a startup."
        })
    }
};

export default createBucketList;
