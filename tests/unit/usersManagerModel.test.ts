import UsersManagerModel from '../../src/models/Manager/UsersManager';

import PostsManagerModel from '../../src/models/Manager/PostsManager';
import { closePool, query } from '../../src/providers/dbProvider';
import UserModel from '../../src/models/User/UserModel';
import { ModelError } from '../../src/types/errors';
describe('Unit test for UserManagerModel', () => {
  const usersManagerModel = new UsersManagerModel();
  const postsManagerModel = new PostsManagerModel();
  beforeEach(async () => {
    await usersManagerModel.clearAllUsers();
  });
  afterAll(async () => {
    await closePool();
  });
  test('Create a user', async () => {
    expect(await usersManagerModel.createUser({ name: 'user1', password: 'password1' })).toEqual(
      expect.any(UserModel)
    );
    expect((await usersManagerModel.searchUsers({})).length).toBe(1);
  });
  test('Create two users with same name then throw error', async () => {
    await usersManagerModel.createUser({ name: 'user1', password: 'password1' });
    expect((await usersManagerModel.searchUsers({})).length).toBe(1);
    await expect(
      usersManagerModel.createUser({ name: 'user1', password: 'password1' })
    ).rejects.toThrow(ModelError);
    expect((await usersManagerModel.searchUsers({})).length).toBe(1);
  });
});
