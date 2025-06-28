import { defineQuery } from "next-sanity";

export const FETCH_ALL_BUCKETLIST = defineQuery(`
    *[_type == "bucketList" && (isLive == true)]
    | order(_createdAt desc)
    {
        _id,
        title,
        destination,
        slug,
        category,
        tags,
        views,
        likes,
        creator -> {
            _id,
            name,
        }
    }
`);
