// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Application } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

import { commentsClient } from './services/comments/comments.shared'
export type {
  Comments,
  CommentsData,
  CommentsQuery,
  CommentsPatch
} from './services/comments/comments.shared'

import { tasksClient } from './services/tasks/tasks.shared'
export type { Tasks, TasksData, TasksQuery, TasksPatch } from './services/tasks/tasks.shared'

import { listsClient } from './services/lists/lists.shared'
export type { Lists, ListsData, ListsQuery, ListsPatch } from './services/lists/lists.shared'

import { boardsClient } from './services/boards/boards.shared'
export type { Boards, BoardsData, BoardsQuery, BoardsPatch } from './services/boards/boards.shared'

import { userClient } from './services/users/users.shared'
export type { User, UserData, UserQuery, UserPatch } from './services/users/users.shared'

export interface Configuration {
  connection: TransportConnection<ServiceTypes>
}

export interface ServiceTypes {}

export type ClientApplication = Application<ServiceTypes, Configuration>

/**
 * Returns a typed client for the kanban-api app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = <Configuration = any,>(
  connection: TransportConnection<ServiceTypes>,
  authenticationOptions: Partial<AuthenticationClientOptions> = {}
) => {
  const client: ClientApplication = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(userClient)
  client.configure(boardsClient)
  client.configure(listsClient)
  client.configure(tasksClient)
  client.configure(commentsClient)
  return client
}
