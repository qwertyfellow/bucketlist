"use client"

import React, { useState, useActionState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { formSchema } from "@/lib/validation/formSchema";

const BucketListForm = () => {

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [content, setContent] = useState("");
    const router = useRouter();

    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                content: content
            }

            await formSchema.parseAsync(formValues);
            console.log("form parsed")

            // TODO 3: Create server action
            const result = {
                "status": "",
                "_id": ""
            }
            if(result.status == "SUCCESS") {
                // toast({
                //     title: "Success",
                //     description: "Your startup has been submitted successfully.",
                //     variant: "default"
                // });
                router.push(`/startup/${result._id}`)
            }
            return result;
        } catch (error) {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                content: content
            }

            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;
                setErrors(fieldErrors as unknown as Record<string, string>);
                // toast({
                //     title: "Validation error.",
                //     description: "Please check the form fields.",
                //     variant: "destructive",
                // });
                return {
                    ...prevState,
                    error: "Validation error.",
                    status: "ERROR",
                    data: formValues
                }
            }

            // toast({
            //     title: "Unexpected error.",
            //     description: "Please check the form fields.",
            //     variant: "destructive"
            // });

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
        data: {}
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
