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

export const FETCH_BUCKETLIST_BY_ID = defineQuery(`
    *[_type == "bucketList" && _id == $id][0]
    {
        _id,
        title,
        destination,
        description,
        content,
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
