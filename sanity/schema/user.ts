import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const user = defineType({
    name: "user",
    title: "User",
    type: "document",
    icon: UserIcon, //Mainly shown on local sanity studio.
    fields: [
        defineField({
            name: "authId",
            type: "string",
            validation: (Rule) => Rule.required().error("Please provide id.")
        }),
        defineField({
            name: "name",
            type: "string"
        }),
        defineField({
            name: "email",
            type: "string",
            validation: (Rule) => Rule.required().error("Please provide email address.")
        }),
        defineField({
            name: "image",
            type: "url"
        }),
        defineField({
            name: "bio",
            type: "text"
        }),
        defineField({
            name: "createdAt",
            type: "datetime",
            readOnly: true,
            initialValue: () => new Date().toISOString(),
        })

    ],
    preview: {
        select: {
            title: "name"
        }
    }
});
