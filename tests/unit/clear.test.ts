import UsersManagerModel from '../../src/models/Manager/UsersManager';
import PostsManagerModel from '../../src/models/Manager/PostsManager';
import { closePool, query } from '../../src/providers/dbProvider';
import { PostCreateDTO } from '../../src/types/models/DTOs';
describe('Unit test for UserModel', () => {
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
  beforeEach(async () => {
    await usersManagerModel.clearAllUsers();
  });
  afterAll(async () => {
    await closePool();
  });

  test('Create many users', async () => {
    await usersManagerModel.createUser({ name: 'user1', password: 'password1' });
    await usersManagerModel.createUser({ name: 'user2', password: 'password2' });
    await usersManagerModel.createUser({ name: 'user3', password: 'password3' });
    await usersManagerModel.createUser({ name: 'user4', password: 'password4' });
    await usersManagerModel.createUser({ name: 'user5', password: 'password5' });
    await usersManagerModel.createUser({ name: 'user6', password: 'password6' });
    expect((await usersManagerModel.searchUsers({})).length).toBe(6);
  });
  test('Create many users and many posts', async () => {
    const user1 = await usersManagerModel.createUser({ name: 'user1', password: 'password1' });
    await usersManagerModel.createUser({ name: 'user2', password: 'password2' });
    await usersManagerModel.createUser({ name: 'user3', password: 'password3' });
    await usersManagerModel.createUser({ name: 'user4', password: 'password4' });
    await usersManagerModel.createUser({ name: 'user5', password: 'password5' });
    await usersManagerModel.createUser({ name: 'user6', password: 'password6' });
    await user1.login();
    await user1.publishPost(post_request);
    await user1.publishPost(post_request);
    await user1.publishPost(post_request);
    await user1.publishPost(post_request);
    await user1.publishPost(post_request);
    await user1.publishPost(post_request);
    await user1.publishPost(post_request);
    expect((await user1.getSearchModel().listPostModels()).length).toBe(7);
  });
});
