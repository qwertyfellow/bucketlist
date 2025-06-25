import { type SchemaTypeDefinition } from 'sanity'
import { creator } from './creator'
import { user } from './user'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [creator, user],
}
