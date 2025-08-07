"use client"

import React, { useState, useActionState, useEffect } from "react";
import { toast } from 'sonner'
import MDEditor from "@uiw/react-md-editor";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { formSchema } from "@/lib/validation/zod/formSchema";
import createBucketListAction from "@/lib/actions/bucketlist/createBucketList";
import editBucketListAction from "@/lib/actions/bucketlist/editBucketList";

const BucketListForm = ({editBucketlist}: {editBucketlist?: any}) => {

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLive, setIsLive] = useState(false);
    const [content, setContent] = useState("");
    const router = useRouter();

    const editMode = editBucketlist!=null;
    console.log("Edit mode :: ", editMode)
    useEffect(() => {
        if(editMode) {
            setIsLive(editBucketlist?.isLive)
            setContent(editBucketlist?.content)
        }
    }, [editMode])

    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            // 1. Get the values from form data.
            const formValues = {
                title: formData.get("title") as string,
                destination: formData.get("destination") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                isLive: formData.get("isLive") === "true",
                content: content
            }

            // 2. Validate the form values using zod defined schema.
            await formSchema.parseAsync(formValues);

            // 3: Edit/Create bucketlist item using server action.
            let result = null;
            if(editMode) {
                // 3.1 Edit the bucketlist
                console.log(`Editing the bucketlist with id ${editBucketlist?._id}.`)
                result = await editBucketListAction(editBucketlist?._id, formData, content)
            } else {
                // 3.2 Create the bucketlist
                console.log("Creating the bucketlist.")
                result = await createBucketListAction(formData, content)
            }
            if(result.status == "SUCCESS") {
                toast.success("Your itinerary has been created successfully.");

                // 4. Redirect the user to bucketlist preview page.
                router.push(`/bucketlist/view/${result._id}`)
            }
            return result;
        } catch (error) {
            const formValues = {
                title: formData.get("title") as string,
                destination: formData.get("destination") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                content: content
            }

            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;
                setErrors(fieldErrors as unknown as Record<string, string>);
                toast.error("Please fix the validation errors.");
                return {
                    ...prevState,
                    error: "Validation error.",
                    status: "ERROR",
                    data: formValues
                }
            }

            toast.error("Something went wrong. Please try again.");
            return {
                ...prevState,
                error: "Something went wrong.",
                status: "ERROR",
                data: formValues
            }

        }
    }

    const [state, formAction, isPending] = useActionState(handleFormSubmit, {
        error: "",
        status: "INITIAL",
        data: editMode ? { ...editBucketlist } : {}
    });

    return (
        <form action={formAction} className="bucketlist-form">
            <div className="space-y-2">
                <label htmlFor="title" className="bucketlist-form_label">
                Title
                </label>
                <input
                id="title"
                name="title"
                className="bucketlist-form_input"
                required
                placeholder="Bucketlist title"
                defaultValue={state.data.title}
                />
                {errors.title && <p className="bucketlist-form_error">{errors.title}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="destination" className="bucketlist-form_label">
                Destination
                </label>
                <input
                id="destination"
                name="destination"
                className="bucketlist-form_input"
                required
                placeholder="Bucketlist destination"
                defaultValue={state.data.destination}
                />
                {errors.destination && <p className="bucketlist-form_error">{errors.destination}</p>}
            </div>

            <div className="space-y-2">
                <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" checked={isLive} onChange={(e) => setIsLive(e.target.checked)}/>
                <input type="hidden" name="isLive" value={isLive ? "true" : "false"} />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Is it live ? <strong>(Making it live shows it to all users)</strong></span>
                </label>
                {errors.isLive && <p className="bucketlist-form_error">{errors.isLive}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="description" className="bucketlist-form_label">
                Description
                </label>
                <textarea
                id="description"
                name="description"
                rows={4}
                className="bucketlist-form_textarea"
                required
                placeholder="Bucketlist description"
                defaultValue={state.data.description}
                />
                {errors.description && <p className="bucketlist-form_error">{errors.description}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="category" className="bucketlist-form_label">
                Category
                </label>
                <input
                id="category"
                name="category"
                className="bucketlist-form_input"
                required
                placeholder="Bucketlist category [ADVENTURE, FUN, BEACHES...]"
                defaultValue={state.data.category}
                />
                {errors.category && <p className="bucketlist-form_error">{errors.category}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="content" className="bucketlist-form_label">
                Detailed itinerary content
                </label>
                <MDEditor
                id="content"
                preview="live"
                height={300}
                value={content}
                onChange={(value) => setContent(value as string)}
                textareaProps={{ placeholder: "Describe your itinerary..." }}
                style={{
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                    overflow: "hidden",
                }}
                />
                {errors.content && <p className="bucketlist-form_error">{errors.content}</p>}
            </div>

            <button
                type="submit"
                className="button_primary"
                disabled={isPending}
            >
                {isPending ? "Submitting your itinerary..." : "Submit Your Itinerary"}
            </button>
        </form>
    )
}

export default BucketListForm;
