import PostDao from '../../dao/PostDao';
import { User } from '../../types/models/DTOs';
import UserBasicModel from './Basic';

/**
 * The model to analyze the one user
 */
export default class UserAnalyticsModel extends UserBasicModel {
  constructor(user: User) {
    super(user);
  }
  async countOwnPosts(): Promise<number> {
    const postsNum = await PostDao.read({ author: this.user.id });
    return postsNum.length;
  }
}
