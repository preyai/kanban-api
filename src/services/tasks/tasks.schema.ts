// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const tasksSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    title: Type.String(),
    description: Type.String(),
    number: Type.Number(),
    board: Type.String({ objectid: true }),
    list: Type.String({ objectid: true }),
    order: Type.Number(),
    createdAt: Type.Number()
  },
  { $id: 'Tasks', additionalProperties: false }
)
export type Tasks = Static<typeof tasksSchema>
export const tasksValidator = getValidator(tasksSchema, dataValidator)
export const tasksResolver = resolve<Tasks, HookContext>({})

export const tasksExternalResolver = resolve<Tasks, HookContext>({})

// Schema for creating new entries
export const tasksDataSchema = Type.Pick(tasksSchema, ['title', 'list'], {
  $id: 'TasksData'
})
export type TasksData = Static<typeof tasksDataSchema>
export const tasksDataValidator = getValidator(tasksDataSchema, dataValidator)
export const tasksDataResolver = resolve<Tasks, HookContext>({
  createdAt: async () => {
    return Date.now()
  },
  board: async (value, task, context) => {
    const list = await context.app.service("lists").get(task.list)
    return list.board
  },
  number: async (value, task, context) => {
    const list = await context.app.service("lists").get(task.list)
    const board = list.board
    const max = await context.app.service("tasks").find({
      query: {
        board: board,
        $sort: { number: -1 },
        $limit: 1
      }
    })
    console.log(max.data);

    if (max.data.length > 0)
      return max.data[0].number + 1
    else
      return 1
  },
  order: async (value, task, context) => {
    const max = await context.app.service("tasks").find({
      query: {
        list: task.list,
        $sort: { order: -1 },
        $limit: 1
      }
    })
    if (max.data.length > 0)
      return max.data[0].order + 1
    else
      return 0
  }
})

// Schema for updating existing entries
export const tasksPatchSchema = Type.Partial(tasksSchema, {
  $id: 'TasksPatch'
})
export type TasksPatch = Static<typeof tasksPatchSchema>
export const tasksPatchValidator = getValidator(tasksPatchSchema, dataValidator)
export const tasksPatchResolver = resolve<Tasks, HookContext>({})

// Schema for allowed query properties
export const tasksQueryProperties = Type.Pick(tasksSchema, ['_id', 'title', 'description', 'number', 'order', 'board', 'list', 'createdAt'])
export const tasksQuerySchema = Type.Intersect(
  [
    querySyntax(tasksQueryProperties, {
      title: { $regex: Type.String() },
      description: { $regex: Type.String() }
    }),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type TasksQuery = Static<typeof tasksQuerySchema>
export const tasksQueryValidator = getValidator(tasksQuerySchema, queryValidator)
export const tasksQueryResolver = resolve<TasksQuery, HookContext>({})
