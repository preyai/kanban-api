// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const boardsSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    title: Type.String(),
    users: Type.Array(Type.String({ objectid: true })),
  },
  { $id: 'Boards', additionalProperties: false }
)
export type Boards = Static<typeof boardsSchema>
export const boardsValidator = getValidator(boardsSchema, dataValidator)
export const boardsResolver = resolve<Boards, HookContext>({})

export const boardsExternalResolver = resolve<Boards, HookContext>({})

// Schema for creating new entries
export const boardsDataSchema = Type.Pick(boardsSchema, ['title'], {
  $id: 'BoardsData'
})
export type BoardsData = Static<typeof boardsDataSchema>
export const boardsDataValidator = getValidator(boardsDataSchema, dataValidator)
export const boardsDataResolver = resolve<Boards, HookContext>({})

// Schema for updating existing entries
export const boardsPatchSchema = Type.Partial(boardsSchema, {
  $id: 'BoardsPatch'
})
export type BoardsPatch = Static<typeof boardsPatchSchema>
export const boardsPatchValidator = getValidator(boardsPatchSchema, dataValidator)
export const boardsPatchResolver = resolve<Boards, HookContext>({})

// Schema for allowed query properties
export const boardsQueryProperties = Type.Pick(boardsSchema, ['_id', 'title', 'users'])
export const boardsQuerySchema = Type.Intersect(
  [
    querySyntax(boardsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type BoardsQuery = Static<typeof boardsQuerySchema>
export const boardsQueryValidator = getValidator(boardsQuerySchema, queryValidator)
export const boardsQueryResolver = resolve<BoardsQuery, HookContext>({})
