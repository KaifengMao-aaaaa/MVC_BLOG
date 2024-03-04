import UserAnalyticsModel from './Analytics';
import UserSecurityModel from './Security';
import UserSearchPostsModel from './Search';
import { generateRandomId } from '../../utils/helpers';
import PostDao from '../../dao/PostDao';
import UserDao from '../../dao/UserDao';
import { USER_PERMISSIONS } from '../../utils/constants/userEnum';
import { ModelError } from '../../types/errors';
import PostModel from '../Post/PostModel';
import TagModel from '../Post/features/TagModel';
import UserTokenModel from './features/TokenModel';
import { PostDaoDTO, UserDaoDTO } from '../../types/dao/DTOs';
import { PostCreateDTO, PostDTO, User } from '../../types/models/DTOs';
import UserBasicModel from './Basic';
export default class UserModel extends UserBasicModel {
  private modelName = 'UserModel';
  protected userSecurityModel: UserSecurityModel;
  protected userSearchPostsModel: UserSearchPostsModel;
  protected userAnalyticsModel: UserAnalyticsModel;
  protected userTokenModel: UserTokenModel;
  constructor(user: User) {
    super(user);
    this.userSearchPostsModel = new UserSearchPostsModel(user);
    this.userSecurityModel = new UserSecurityModel(user);
    this.userAnalyticsModel = new UserAnalyticsModel(user);
    this.userTokenModel = new UserTokenModel(user);
  }
  // ====================================================================
  // Basic functionalities
  // ====================================================================
  async publishPost(DTO: PostCreateDTO): Promise<PostModel> {
    const userSecurityModel = new UserSecurityModel(this.user);
    if (!(await userSecurityModel.canWritePost())) {
      throw new ModelError('Deny permission', 'UNAUTHOR', 403, this.modelName);
    }
    const post = this.constructDaoPostDTO(DTO);
    await PostDao.create({ data: [post] });
    return new PostModel({ ...post, tags: DTO.tags });
  }
  async deletePost(postId: number) {
    let postModel;
    // Check the existence of the post
    try {
      postModel = (await this.getSearchModel().searchPostModels({ id: postId }))[0];
    } catch (e) {
      throw new ModelError('Id of post do not exist', 'PARAMETERS_ERROR', 400, this.modelName);
    }
    // Check whether user have enough permission to edit the post
    if (!(await postModel.getSecurityModel().isEditAllowed(this.user.id))) {
      throw new ModelError('Deny permission', 'UNAUTHOR', 403, this.modelName);
    }

    try {
      postModel.delete();
      await PostDao.delete({ postIds: [postId] });
    } catch (e) {
      throw new ModelError('Try it few seconds late', 'SERVER_ERROR', 500, this.modelName);
    }
  }
  async savePost(DTO: PostCreateDTO): Promise<PostModel> {
    const userSecurityModel = new UserSecurityModel(this.user);
    if (!(await userSecurityModel.canWritePost())) {
      throw new ModelError('Deny permission', 'UNAUTHOR', 403, this.modelName);
    }
    const post: PostDaoDTO = this.constructDaoPostDTO(DTO);
    await PostDao.create({ data: [post] });
    const tagModel = new TagModel(post);
    await tagModel.addTags(DTO.tags ? DTO.tags : []);
    return new PostModel({ ...post, tags: DTO.tags });
  }
  async login() {
    this.user.permission = USER_PERMISSIONS.CONTRIBUTOR;
    await UserDao.update({ userIds: [this.user.id], data: [this.user] });
    const token = await this.getTokenModel().addTokenToUser();
    return token;
  }
  async logout(token: string) {
    this.user.permission = USER_PERMISSIONS.VIEWER;
    await UserDao.update({ userIds: [this.user.id], data: [this.user] });
    await this.getTokenModel().removeTokenFromUser(token);
  }
  async delete() {
    await this.getTokenModel().removeTokensFromUser();
    await Promise.all(
      (await this.getSearchModel().searchPostModels({})).map(async (postModel) => {
        await postModel.delete();
      })
    );
    await UserDao.delete(this.user.id);
    // Deletr all posts relatived with that user
  }
  //==============================================================
  // Getters
  //==============================================================
  getSecurityModel(): UserSecurityModel {
    return this.userSecurityModel;
  }
  getSearchModel(): UserSearchPostsModel {
    return this.userSearchPostsModel;
  }
  getAnalyticsModel(): UserAnalyticsModel {
    return this.userAnalyticsModel;
  }
  getTokenModel() {
    return this.userTokenModel;
  }
  getId() {
    return this.user.id;
  }
  getName() {
    return this.user.name;
  }
  //==============================================================
  // Helpers
  //==============================================================
  private constructDaoPostDTO(request: PostDTO): PostDaoDTO {
    const post: PostDaoDTO = {
      id: generateRandomId(),
      title: request.title ? request.title : 'title',
      banner: request.banner ? request.banner : '/',
      author: this.user.id,
      des: request.des ? request.des : 'Description',
      content: request.content ? request.content : '...',
      is_draft: false,
      publish_time: new Date(),
    };
    return post;
  }
}
