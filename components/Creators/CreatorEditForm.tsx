"use client";

import { useState, useActionState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ImageUploader from "../Assets/ImageUploader";
import updateCreatorAction from "@/lib/actions/creator/updateCreator";
import CreatorCard from "./CreatorCard";

type CreatorEditFormProps = {
  creator: {
    _id: string;
    name?: string;
    bio?: string;
    image?: string;
  };
};

const CreatorEditForm = ({ creator }: CreatorEditFormProps) => {

  // State for form fields
  const [name, setName] = useState(creator?.name || "");
  const [bio, setBio] = useState(creator?.bio || "");
  const [image, setImage] = useState(creator?.image || "");
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();

  // Server action
  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const id = creator?._id;
      const result = await updateCreatorAction({
        id,
        name,
        bio,
        image,
      });

      if (result?.status === "SUCCESS") {
        toast.success("Profile updated successfully!");
        router.push(`/creators/profile/${id}`)
      } else {
        toast.error(result?.error);
      }

      return result;
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      return {
        ...prevState,
        status: "ERROR",
        error: "Unexpected error",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    status: "INITIAL",
    error: "",
  });

  return (
    <div className="flex flex-col md:flex-row gap-10 w-full">
      {/* --- Left: Form Section --- */}
      <form action={formAction} className="bucketlist-form space-y-6 flex-1">
        <div className="space-y-2">
          <label htmlFor="name" className="bucketlist-form_label">
            Name*
          </label>
          <input
            id="name"
            name="name"
            className="bucketlist-form_input"
            required
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="bio" className="bucketlist-form_label">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            className="bucketlist-form_textarea"
            placeholder="Tell us about yourself, your travel style, or what inspires your itineraries."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="bucketlist-form_label">Profile Image</label>
          <ImageUploader
            onUploaded={(asset) => {
              setImage(asset?.url);
              setIsUploading(false);
            }}
            onUploading={(status) => setIsUploading(status)}
            showPreview={true}
          />
        </div>

        <button
          type="submit"
          className="button_primary"
          disabled={isPending || isUploading}
        >
          {isPending ? "Updating profile..." : "Save Changes"}
        </button>
      </form>

      {/* --- Right: Live Preview --- */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-4">Creator card</h3>
        <p className="mb-4">Below is a preview of how your profile card looks like.</p>
        <CreatorCard
          id={creator._id}
          name={name || "Creator Name"}
          image={image || "/placeholder.png"}
          storiesCount={null}
          viewsCount={null}
        />
      </div>
    </div>
  );
};

export default CreatorEditForm;
