import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const creator = defineType({
    name: "creator",
    title: "Creator",
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
            type: "string",
            title: "Full name",
            description: "Test description to show on sanity console."
        }),
        defineField({
            name: "email",
            type: "string",
            validation: (Rule) => Rule.required().error("Please provide email address.")
        }),
        defineField({
            name: "slug",
            type: "slug",
            options: {
                source: (document) => `${document.name}-${document.authId}`,
                maxLength: 96,
            },
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
            name: "isCreator",
            type: "boolean"
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
