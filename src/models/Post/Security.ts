import { PostDaoDTO } from '../../types/dao/DTOs';
import { Post } from '../../types/models/DTOs';
import PostBasicModel from './Basic';

/**
 * Model to process some security jobs about one post
 */
export default class PostSecurityModel extends PostBasicModel {
  constructor(post: Post) {
    super(post);
  }
  async isReadAllowed(editorId: number): Promise<boolean> {
    return true;
  }
  async isEditAllowed(editorId: number): Promise<boolean> {
    return editorId === this.post.author;
  }
}
