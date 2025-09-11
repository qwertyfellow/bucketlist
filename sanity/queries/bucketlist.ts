import { defineQuery } from "next-sanity";

export const FETCH_ALL_BUCKETLIST = defineQuery(`
    *[_type == "bucketList" && (isLive == true)]
    | order(_createdAt desc)
    {
        _id,
        title,
        destination,
        coverImage,
        slug,
        category,
        tags,
        views,
        likes,
        isPremium,
        creator -> {
            _id,
            name,
            image
        }
    }
`);

export const FETCH_BUCKETLIST_BY_ID = defineQuery(`
    *[_type == "bucketList" && (_id == $id) ][0]
    {
        _id,
        title,
        destination,
        description,
        coverImage,
        content,
        slug,
        category,
        tags,
        views,
        likes,
        isLive,
        isPremium,
        creator -> {
            _id,
            name,
        }
    }
`);

export const FETCH_BUCKETLISTS_BY_CREATOR_ID = defineQuery(`
  *[
    _type == "bucketList" && (creator->_id == $id)
    && (!defined($isLive) || isLive == $isLive)
    && (!defined($isPremium) || isPremium == $isPremium)
  ] | order(_createdAt desc) {
    _id,
    title,
    destination,
    description,
    coverImage,
    slug,
    category,
    tags,
    views,
    likes,
    isLive,
    creator->{
      _id,
      name,
    }
  }
`);


export const FETCH_BUCKETLIST_VIEWS_QUERY = defineQuery(
  `*[_type=="bucketList" && _id == $id][0] {
  _id, views
  }
  `
);
