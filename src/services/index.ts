import { comments } from './comments/comments'
import { tasks } from './tasks/tasks'
import { lists } from './lists/lists'
import { boards } from './boards/boards'
import { user } from './users/users'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(comments)
  app.configure(tasks)
  app.configure(lists)
  app.configure(boards)
  app.configure(user)
  // All services will be registered here
}
