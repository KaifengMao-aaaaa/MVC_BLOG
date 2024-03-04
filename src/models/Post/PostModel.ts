import PostDao from '../../dao/PostDao';
import TagModel from './features/TagModel';
import PostAnalyticsModel from './Analytics';
import PostBasicModel from './Basic';
import PostSecurityModel from './Security';
import { PostDaoDTO } from '../../types/dao/DTOs';
import { Post } from '../../types/models/DTOs';

/**
 * The basic model for one post
 */
export default class PostModel extends PostBasicModel {
  protected postAnalyticsModel: PostAnalyticsModel;
  protected postSecurityModel: PostSecurityModel;
  protected tagModel: TagModel;
  constructor(post: Post) {
    super(post);
    this.postAnalyticsModel = new PostAnalyticsModel(post);
    this.postSecurityModel = new PostSecurityModel(post);
    this.tagModel = new TagModel(post);
  }
  async delete() {
    await PostDao.delete({ postIds: [this.post.id] });
    await this.tagModel.removeTags(await this.tagModel.getPostTags());
  }
  // ===========================================================
  // Getters
  // ===========================================================
  getContent() {
    return this.post.content;
  }
  getId() {
    return this.post.id;
  }
  getTitle() {
    return this.post.title;
  }
  getDescription() {
    return this.post.des;
  }
  //==========================================================
  // Feature models
  //==========================================================
  public getAnalyticsModel(): PostAnalyticsModel {
    return this.postAnalyticsModel;
  }
  public getSecurityModel(): PostSecurityModel {
    return this.postSecurityModel;
  }
  public getTagModel(): TagModel {
    return this.tagModel;
  }
}
