import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const bucketList = defineType({
    name: "bucketList",
    title: "BucketList",
    type: "document",
    icon: UserIcon,
    fields: [
        defineField({
            name: "title",
            type: "string",
            validation: (Rule) => Rule.required().error("Please provide title.")
        }),
        defineField({
            name: "destination",
            type: "string",
            validation: (Rule) => Rule.required().error("Please provide destination.")
        }),
        defineField({
            name: "slug",
            type: "slug",
            options: {
                source: (document) => `${document.title}-${document.creator?._ref || ""}`,
                maxLength: 40,
            },
            validation: (Rule) => Rule.required(),
            }),
        defineField({
            name: "category",
            type: "string",
            validation: (Rule) => Rule.min(1).max(20).required().error("Please provide category.")
        }),
        defineField({
            name: "creator",
            type: "reference",
            to: {type: "creator"}
        }),
        defineField({
            name: "content",
            type: "markdown",
        }),
        defineField({
            name: "isLive",
            type: "boolean",
        }),
        defineField({
            name: "tags",
            type: "array",
            of: [{ type: "string" }],
        }),
        // To be shown on preview page
        defineField({
            name: "views",
            type: "number",
            initialValue: 0
        }),
        // To be shown on preview page
        defineField({
            name: "likes",
            type: "number",
            initialValue: 0
        }),
        // To be shown on preview page
        defineField({
            name: "createdAt",
            type: "datetime",
            readOnly: true,
            initialValue: () => new Date().toISOString(),
        }),
    ]
});
