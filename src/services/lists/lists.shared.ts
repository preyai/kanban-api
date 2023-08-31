// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Lists, ListsData, ListsPatch, ListsQuery, ListsService } from './lists.class'

export type { Lists, ListsData, ListsPatch, ListsQuery }

export type ListsClientService = Pick<ListsService<Params<ListsQuery>>, (typeof listsMethods)[number]>

export const listsPath = 'lists'

export const listsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const listsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(listsPath, connection.service(listsPath), {
    methods: listsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [listsPath]: ListsClientService
  }
}
