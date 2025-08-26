"use server"
import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import { writeClient } from "@/sanity/lib/writeClient";
import "server-only"

const createBucketListAction = async (formData: FormData, content: string) => {

    // 1. Verify session details
    const session = await auth();
    if(!session) {
        return parseServerActionResponse({
            status: "ERROR",
            error: "You must be logged in to create a bucketlist."
        })
    }

    // 2. Destructure the data from nextJs formdata
    const { title, destination, description, category, isLive, isPremium} = Object.fromEntries(
        Array.from(formData).filter(([key]) => key !== "content")
    );

    // 3. Create bucketlist item
    try {
        const bucketList = {
            title: title,
            destination: destination.toString().toUpperCase(),
            description: description,
            category: category.toString().toUpperCase(),
            content: content,
            creator: {
                _type: "creator",
                _ref: session.user?.sanityId
            },
            isLive: isLive === "true",
            isPremium: isPremium === "true"
        }

        // 4. Use write client and write item to sanity
        const response = await writeClient.create({
            _type: "bucketList",
            ...bucketList
        })

        // 5. Successful response
        return parseServerActionResponse({
            ...response,
            error: "",
            status: "SUCCESS"
        });

    } catch(error) {
        // 6. Error response
        return parseServerActionResponse({
            status: "ERROR",
            error: JSON.stringify(error)
        })
    }
};

export default createBucketListAction;
