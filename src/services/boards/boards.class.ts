// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Boards, BoardsData, BoardsPatch, BoardsQuery } from './boards.schema'

export type { Boards, BoardsData, BoardsPatch, BoardsQuery }

export interface BoardsParams extends MongoDBAdapterParams<BoardsQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class BoardsService<ServiceParams extends Params = BoardsParams> extends MongoDBService<
  Boards,
  BoardsData,
  BoardsParams,
  BoardsPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('boards'))
  }
}
