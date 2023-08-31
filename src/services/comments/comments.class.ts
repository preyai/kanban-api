// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Comments, CommentsData, CommentsPatch, CommentsQuery } from './comments.schema'

export type { Comments, CommentsData, CommentsPatch, CommentsQuery }

export interface CommentsParams extends MongoDBAdapterParams<CommentsQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class CommentsService<ServiceParams extends Params = CommentsParams> extends MongoDBService<
  Comments,
  CommentsData,
  CommentsParams,
  CommentsPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('comments'))
  }
}
