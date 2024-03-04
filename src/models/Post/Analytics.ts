import { Post } from '../../types/models/DTOs';
import PostBasicModel from './Basic';
/**
 * Model to get analytics of one post
 */
export default class PostAnalyticsModel extends PostBasicModel {
  constructor(post: Post) {
    super(post);
  }
}
