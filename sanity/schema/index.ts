import { type SchemaTypeDefinition } from 'sanity'
import { creator } from './creator'
import { user } from './user'
import { bucketList } from './bucketList'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [creator, user, bucketList],
}
