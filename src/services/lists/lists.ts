// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  listsDataValidator,
  listsPatchValidator,
  listsQueryValidator,
  listsResolver,
  listsExternalResolver,
  listsDataResolver,
  listsPatchResolver,
  listsQueryResolver
} from './lists.schema'

import type { Application } from '../../declarations'
import { ListsService, getOptions } from './lists.class'
import { listsPath, listsMethods } from './lists.shared'

export * from './lists.class'
export * from './lists.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const lists = (app: Application) => {
  // Register our service on the Feathers application
  app.use(listsPath, new ListsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: listsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(listsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(listsExternalResolver),
        schemaHooks.resolveResult(listsResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(listsQueryValidator), schemaHooks.resolveQuery(listsQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(listsDataValidator), schemaHooks.resolveData(listsDataResolver)],
      patch: [schemaHooks.validateData(listsPatchValidator), schemaHooks.resolveData(listsPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [listsPath]: ListsService
  }
}
