import TagDao from '../../../dao/TagDao';
import { PostDaoDTO } from '../../../types/dao/DTOs';
import { ModelError } from '../../../types/errors';

export default class TagModel {
  private post: PostDaoDTO;
  private modelName = 'TagModel';
  constructor(post: PostDaoDTO) {
    this.post = post;
  }
  async getPostTags(): Promise<string[]> {
    const tags = await TagDao.read({ postId: this.post.id });
    return tags;
  }
  async removeTags(tags: string[]): Promise<void> {
    try {
      await TagDao.delete({
        tags: tags.map((tag) => {
          return { name: tag, postId: this.post.id };
        }),
      });
    } catch (e) {
      throw new ModelError('Cannot remove tags from the post', 'SERVER_ERROR', 500, this.modelName);
    }
  }
  async addTags(tags: string[]): Promise<void> {
    if (tags.length === 0) {
      return;
    }
    const existedTags = await this.getPostTags();
    try {
      await TagDao.create(
        this.post.id,
        tags.filter((tag) => !existedTags.includes(tag))
      );
    } catch (e) {
      throw new ModelError('Failed to add tag', 'SERVER_ERROR', 500, this.modelName);
    }
  }
}
