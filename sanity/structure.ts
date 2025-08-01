import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem("creator").title("List of Creators"),
      S.documentTypeListItem("user").title("List of Users"),
      S.documentTypeListItem("bucketList").title("List of Iternaries"),
    ])
