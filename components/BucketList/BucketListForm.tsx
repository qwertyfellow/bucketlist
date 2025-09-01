"use client"

import React, { useState, useActionState, useEffect } from "react";
import { toast } from 'sonner'
import MDEditor from "@uiw/react-md-editor";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { formSchema } from "@/lib/zod/validation/formSchema";
import createBucketListAction from "@/lib/actions/bucketlist/createBucketList";
import editBucketListAction from "@/lib/actions/bucketlist/editBucketList";
import ImageUploader from "../Assets/ImageUploader";

const BucketListForm = ({editBucketlist}: {editBucketlist?: any}) => {

    // Form configuration fields
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [coverImage, setCoverImage] = useState("");
    const [isLive, setIsLive] = useState(false);
    const [isPremium, setIsPremium] = useState(false);
    const [content, setContent] = useState("");
    const router = useRouter();
    const editMode = editBucketlist!=null;

    // Side effects
    useEffect(() => {
        // In-case of edit mode, populate the fields.
        if(editMode) {
            setIsLive(editBucketlist?.isLive)
            setIsPremium(editBucketlist?.isPremium)
            setContent(editBucketlist?.content)
            setCoverImage(editBucketlist?.coverImage)
        }
    }, [editMode])

    // Handle form submit
    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            // 1. Get the values from form data.
            const formValues = {
                title: formData.get("title") as string,
                destination: formData.get("destination") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                isLive: formData.get("isLive") === "true",
                isPremium: formData.get("isPremium") === "true",
                content: content
            }

            // 2. Validate the form values using zod defined schema.
            await formSchema.parseAsync(formValues);

            // 3: Edit/Create bucketlist item using server action.
            let result = null;
            if(editMode) {
                // 3.1 Edit the bucketlist
                console.log(`Editing the bucketlist with id ${editBucketlist?._id}.`)
                result = await editBucketListAction(editBucketlist?._id, formData, content, coverImage)
            } else {
                // 3.2 Create the bucketlist
                console.log("Creating the bucketlist.")
                result = await createBucketListAction(formData, content, coverImage)
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
                Title*
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
                Destination*
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
                <label htmlFor="description" className="bucketlist-form_label">
                Description*
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
                Category*
                </label>
                <input
                id="category"
                name="category"
                className="bucketlist-form_input"
                required
                placeholder="Bucketlist category Ex. Adventure, Beach, Cultural etc"
                defaultValue={state.data.category}
                />
                {errors.category && <p className="bucketlist-form_error">{errors.category}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="content" className="bucketlist-form_label">
                Detailed itinerary content*
                </label>
                <MDEditor
                id="content"
                preview="live"
                height={300}
                value={content}
                onChange={(value) => setContent(value as string)}
                textareaProps={
                    {
                        placeholder: `Describe your itinerary in detail using markdown.
A good itinerary should have day to day accomodation, food details.
Entire travel details
Entire activities experienced during trip
Any particular things to be careful about during trip
Good to know things etc etc.`
                    }
                }
                style={{
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                    overflow: "hidden",
                }}
                />
                {errors.content && <p className="bucketlist-form_error">{errors.content}</p>}
            </div>
            <br />
            <hr />
            <div className="space-y-2 w-full">
                <label className="flex flex-wrap items-center gap-4 cursor-pointer w-full">
                    <div className="relative group w-11 min-w-[44px] h-6">
                    <input
                        type="checkbox"
                        checked={isLive}
                        onChange={(e) => setIsLive(e.target.checked)}
                        className="sr-only"
                    />
                    <input type="hidden" name="isLive" value={isLive ? "true" : "false"} />

                    {/* Track */}
                    <div
                        className={`
                        absolute top-0 left-0 w-full h-full rounded-full transition-colors duration-200
                        ${isLive ? "bg-blue-600" : "bg-gray-200"} 
                        group-active:bg-blue-500
                        `}
                    />

                    {/* Thumb */}
                    <div
                        className={`
                        absolute top-[2px] left-[2px] h-5 w-5 rounded-full bg-white border border-gray-300 transition-transform duration-200
                        ${isLive ? "translate-x-full border-white" : ""}
                        `}
                    />
                    </div>

                    {/* Label */}
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-300 flex-1">
                    Make it live?{" "}
                    <strong>
                        (Making it live shows it to all users on the internet. You can change
                        it on the profile page later too.)
                    </strong>
                    </span>
                </label>
                {/* Error */}
                {errors.isLive && <p className="bucketlist-form_error">{errors.isLive}</p>}
            </div>

            <div className="space-y-2 w-full">
                <label className="flex flex-wrap items-center gap-4 cursor-pointer w-full">
                    <div className="relative group w-11 min-w-[44px] h-6">
                    <input
                        type="checkbox"
                        checked={isPremium}
                        onChange={(e) => setIsPremium(e.target.checked)}
                        className="sr-only"
                    />
                    <input type="hidden" name="isPremium" value={isPremium ? "true" : "false"} />

                    {/* Track */}
                    <div
                        className={`
                        absolute top-0 left-0 w-full h-full rounded-full transition-colors duration-200
                        ${isPremium ? "bg-blue-600" : "bg-gray-200"}
                        group-active:bg-blue-500
                        `}
                    />

                    {/* Thumb */}
                    <div
                        className={`
                        absolute top-[2px] left-[2px] h-5 w-5 rounded-full bg-white border border-gray-300 transition-transform duration-200
                        ${isPremium ? "translate-x-full border-white" : ""}
                        `}
                    />
                    </div>

                    {/* Label */}
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-300 flex-1">
                    Make it Premium?{" "}
                    <strong>
                        (Making it premium shows it to only premium users on the internet. You can change
                        it on the profile page later too.)
                    </strong>
                    </span>
                </label>
                {/* Error */}
                {errors.isPremium && <p className="bucketlist-form_error">{errors.isPremium}</p>}
            </div>

            <br />

            <label className="bucketlist-form_label">Cover image*</label>
            <strong>
                (A cover image to showcase on your itinerary.)
            </strong>
            <ImageUploader onUploaded={(asset) => {
                setCoverImage(asset?.url)
            }}/>
            <hr />

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
