import { defineQuery } from "next-sanity";

export const FETCH_USER_BY_GOOGLE_ID_QUERY = defineQuery(`
  *[_type == "user" && authId == $id][0]
  {
    _id,
    authId,
    name,
    email,
    image,
    bio,
    role
  }
`);
