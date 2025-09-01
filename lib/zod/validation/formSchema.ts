import { z } from "zod";

export const formSchema = z.object({
    title: z.string().min(10, {
        message: "Title should be minimum of length 10."
    }).max(40, {
        message: "Title can be maximum of length 40."
    }),
    destination: z.string().min(1, {
        message: "Destination is required."
    }),
    description: z.string().min(30, {
        message: "Description should be minimum of length 30."
    }).max(100, {
        message: "Description can be maximum length of 100."
    }),
    category: z.string().min(5, {
        message: "Category should be minimum of length 5."
    }).max(20, {
        message: "Category should be maximum of length 20."
    }),
    content: z.string().min(200, {
        message: "Content should be minimum of length 200."
    }).max(60000, {
        message: "Content can be maximum length of 60000."
    })
});
