import PostsManagerModel from '../../../src/models/Manager/PostsManager';
import UsersManagerModel from '../../../src/models/Manager/UsersManager';
import UserModel from '../../../src/models/User/UserModel';
import { closePool } from '../../../src/providers/dbProvider';
import PostModel from '../../../src/models/Post/PostModel';
import { PostCreateDTO } from '../../../src/types/models/DTOs';

describe('Unit test for TagModel', () => {
  const usersManagerModel = new UsersManagerModel();
  let post_request: PostCreateDTO = {
    content: 'content1',
    title: 'title1',
    banner: 'banner',
    des: 'des',
    is_draft: false,
    publish_time: new Date(),
    tags: [],
    author: -1,
  };
  let userModel: UserModel;
  let postModel: PostModel;
  beforeEach(async () => {
    await usersManagerModel.clearAllUsers();
    userModel = await usersManagerModel.createUser({ name: 'user1', password: 'password' });
    await userModel.login();
    postModel = await userModel.publishPost(post_request);
  });
  afterAll(async () => {
    await closePool();
  });
  // ===========================================================
  // Basic functionalities
  // ===========================================================
  test('Add tags', async () => {
    await postModel.getTagModel().addTags(['new', 'old']);
    expect(await postModel.getTagModel().getPostTags()).toEqual(
      expect.arrayContaining(['new', 'old'])
    );
  });

  test('Remove tags', async () => {
    await postModel.getTagModel().addTags(['new', 'old']);
    // await postModel.getTagModel().removeTags(['old']);
    // expect(await postModel.getTagModel().getPostTags()).toEqual(expect.arrayContaining(['new']));
  });
});
