import UsersManagerModel from '../../src/models/Manager/UsersManager';
import PostsManagerModel from '../../src/models/Manager/PostsManager';
import { closePool, query } from '../../src/providers/dbProvider';
import UserModel from '../../src/models/User/UserModel';
import { ModelError } from '../../src/types/errors';
import { PostCreateDTO } from '../../src/types/models/DTOs';
describe('Unit test for UserModel', () => {
  const usersManagerModel = new UsersManagerModel();
  let user: UserModel;
  let post1_request: PostCreateDTO = {
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
    user = await usersManagerModel.createUser({ name: 'user1', password: 'password' });
    post1_request.author = user.getId();
  });
  afterAll(async () => {
    await closePool();
  });
  // ===========================================================
  // Basic functionalities (publish, delete, save)
  // ===========================================================
  test('Publish an post', async () => {
    await user.login();
    const post = await user.publishPost(post1_request);
    expect(post).toBeDefined();
  });

  test('Save an post', async () => {
    await user.login();
    const post = await user.savePost(post1_request);
    expect(post.getContent()).toBe(post1_request.content);
    expect(post.getTitle()).toBe(post1_request.title);
  });

  test('Delete one post', async () => {
    await user.login();
    const post = await user.savePost(post1_request);
    await user.deletePost(post.getId());
  });
  // ===========================================================
  // Edge cases
  // ===========================================================
  test('Publish a post without login', async () => {
    await expect(user.publishPost(post1_request)).rejects.toThrow(ModelError);
  });
  test('Save an post without login', async () => {
    await expect(user.savePost(post1_request)).rejects.toThrow(ModelError);
  });
});
