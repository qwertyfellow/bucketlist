"use server"
import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import { writeClient } from "@/sanity/lib/writeClient";
import "server-only"

const createBucketList = async (formData: FormData, content: string) => {

    // Verify session details
    const session = await auth();
    if(!session) {
        return parseServerActionResponse({
            status: "ERROR",
            error: "You must be logged in to create a startup."
        })
    }

    // Destructure the data from nextJs formdata
    const { title, destination, description, category} = Object.fromEntries(
        Array.from(formData).filter(([key]) => key !== "pitch")
    );


    // Create bucketlist item
    try {
        const bucketList = {
            title: title,
            destination: destination,
            description: description,
            category: category,
            content: content,
            creator: {
                _type: "creator",
                _ref: session.user?.sanityId
            },
            isLive: true
        }

        // Use write client and write item to sanity
        const response = await writeClient.create({
            _type: "bucketList",
            ...bucketList
        })

        console.log("response from action", response)

        // Successful response
        return parseServerActionResponse({
            ...response,
            error: "",
            status: "SUCCESS"
        });

    } catch(error) {
        // Error response
        console.log(error);
        return parseServerActionResponse({
            status: "ERROR",
            error: JSON.stringify(error)
        })
    }
};

export default createBucketList;
