// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const commentsSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String(),
    task: Type.String({ objectid: true }),
    user: Type.String({ objectid: true }),
  },
  { $id: 'Comments', additionalProperties: false }
)
export type Comments = Static<typeof commentsSchema>
export const commentsValidator = getValidator(commentsSchema, dataValidator)
export const commentsResolver = resolve<Comments, HookContext>({})

export const commentsExternalResolver = resolve<Comments, HookContext>({})

// Schema for creating new entries
export const commentsDataSchema = Type.Pick(commentsSchema, ['text'], {
  $id: 'CommentsData'
})
export type CommentsData = Static<typeof commentsDataSchema>
export const commentsDataValidator = getValidator(commentsDataSchema, dataValidator)
export const commentsDataResolver = resolve<Comments, HookContext>({})

// Schema for updating existing entries
export const commentsPatchSchema = Type.Partial(commentsSchema, {
  $id: 'CommentsPatch'
})
export type CommentsPatch = Static<typeof commentsPatchSchema>
export const commentsPatchValidator = getValidator(commentsPatchSchema, dataValidator)
export const commentsPatchResolver = resolve<Comments, HookContext>({})

// Schema for allowed query properties
export const commentsQueryProperties = Type.Pick(commentsSchema, ['_id', 'text'])
export const commentsQuerySchema = Type.Intersect(
  [
    querySyntax(commentsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type CommentsQuery = Static<typeof commentsQuerySchema>
export const commentsQueryValidator = getValidator(commentsQuerySchema, queryValidator)
export const commentsQueryResolver = resolve<CommentsQuery, HookContext>({})
