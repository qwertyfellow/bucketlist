"use server"
import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import { writeClient } from "@/sanity/lib/writeClient";
import "server-only"

const editBucketListAction = async (bucketListId: string, formData: FormData, content: string) => {

    // 1. Verify session details
    const session = await auth();
    if(!session) {
        return parseServerActionResponse({
            status: "ERROR",
            error: "You must be logged in to edit a bucketlist."
        })
    }

    // 2. Destructure the data from nextJs formdata
    const { title, destination, description, category, isLive} = Object.fromEntries(
        Array.from(formData).filter(([key]) => key !== "content")
    );

    // 3. Create bucketlist item
    try {
        const toBeEditedBucketList = {
            title: title,
            destination: destination.toString().toUpperCase(),
            description: description,
            category: category.toString().toUpperCase(),
            content: content,
            creator: {
                _type: "creator",
                _ref: session.user?.sanityId
            },
            isLive: isLive === "true"
        }

        // 4. Use write client and edit the item on sanity
        const response = await writeClient
                    .patch(bucketListId)
                    .set({
                        _type: "bucketList",
                        ...toBeEditedBucketList
                    })
                    .commit();


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

export default editBucketListAction;
