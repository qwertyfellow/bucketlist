"use client"

import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import deleteBucketListAction from "@/lib/actions/bucketlist/deleteBucketList";

const DeleteBucketlistButton = ({ id: bucketListId, creatorId }: { id: string, creatorId: string }) => {
    const router = useRouter();

    const handleDelete = async () => {
        const confirmed = confirm("Are you sure you want to delete this bucketlist?");
        if (!confirmed) return;

        try {
            await deleteBucketListAction(bucketListId);
        } catch (err) {
            alert("Failed to delete bucketlist.");
        } finally {
            router.push(`/creators/profile/${creatorId}`);
        }
    };

    return (
        <button onClick={handleDelete} className="flex items-center gap-1 button_danger">
        <Trash width={"15px"} height={"15px"} />
        Delete
        </button>
    );
};

export default DeleteBucketlistButton;
