// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const listsSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    title: Type.String(),
    board: Type.String({ objectid: true }),

  },
  { $id: 'Lists', additionalProperties: false }
)
export type Lists = Static<typeof listsSchema>
export const listsValidator = getValidator(listsSchema, dataValidator)
export const listsResolver = resolve<Lists, HookContext>({})

export const listsExternalResolver = resolve<Lists, HookContext>({})

// Schema for creating new entries
export const listsDataSchema = Type.Pick(listsSchema, ['title', 'board'], {
  $id: 'ListsData'
})
export type ListsData = Static<typeof listsDataSchema>
export const listsDataValidator = getValidator(listsDataSchema, dataValidator)
export const listsDataResolver = resolve<Lists, HookContext>({})

// Schema for updating existing entries
export const listsPatchSchema = Type.Partial(listsSchema, {
  $id: 'ListsPatch'
})
export type ListsPatch = Static<typeof listsPatchSchema>
export const listsPatchValidator = getValidator(listsPatchSchema, dataValidator)
export const listsPatchResolver = resolve<Lists, HookContext>({})

// Schema for allowed query properties
export const listsQueryProperties = Type.Pick(listsSchema, ['_id', 'title', 'board'])
export const listsQuerySchema = Type.Intersect(
  [
    querySyntax(listsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type ListsQuery = Static<typeof listsQuerySchema>
export const listsQueryValidator = getValidator(listsQuerySchema, queryValidator)
export const listsQueryResolver = resolve<ListsQuery, HookContext>({})
