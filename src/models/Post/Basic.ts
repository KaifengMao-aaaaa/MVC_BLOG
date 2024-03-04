import { Post } from '../../types/models/DTOs';

/**
 * Abstract super class for any model relatived with the post
 */
export default abstract class PostBasicModel {
  protected post: Post;
  constructor(post: Post) {
    this.post = post;
  }
}
