import { defineQuery } from "next-sanity";

export const FETCH_CREATOR_BY_GOOGLE_ID_QUERY = defineQuery(`
  *[_type == "creator" && (authId == $id)][0]
  {
    _id,
    authId,
    name,
    email,
    image,
    bio,
    isCreator
  }
`);

export const FETCH_CREATOR_BY_SANITY_ID_QUERY = defineQuery(`
  *[_type == "creator" && (_id == $id)][0]
  {
    _id,
    authId,
    name,
    email,
    image,
    bio,
    isCreator
  }
`);
