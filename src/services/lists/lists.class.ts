// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Lists, ListsData, ListsPatch, ListsQuery } from './lists.schema'

export type { Lists, ListsData, ListsPatch, ListsQuery }

export interface ListsParams extends MongoDBAdapterParams<ListsQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class ListsService<ServiceParams extends Params = ListsParams> extends MongoDBService<
  Lists,
  ListsData,
  ListsParams,
  ListsPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('lists'))
  }
}
