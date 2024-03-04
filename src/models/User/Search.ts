import PostDao from '../../dao/PostDao';
import TagDao from '../../dao/TagDao';
import { User, UserCreateDTO } from '../../types/models/DTOs';
import { PostSearchRequest } from '../../types/models/requests';
import PostModel from '../Post/PostModel';
import UserBasicModel from './Basic';

/**
 * The model for user to search posts in different ways
 */
export default class UserSearchPostsModel extends UserBasicModel {
  constructor(user: User) {
    super(user);
  }
  async searchPostModels(request: PostSearchRequest): Promise<PostModel[]> {
    const posts = await PostDao.read(request);
    const postModels = await Promise.all(
      posts.map(async (post) => {
        const tags = await TagDao.read({ postId: post.id });
        return new PostModel({ ...post, tags: tags });
      })
    );
    return postModels;
  }
  async listPostModels(): Promise<PostModel[]> {
    const posts = await PostDao.read({ author: this.user.id });
    return posts.map((post) => new PostModel({ ...post, tags: [] }));
  }
}
