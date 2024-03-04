import UsersManagerModel from '../../../src/models/Manager/UsersManager';
import UserModel from '../../../src/models/User/UserModel';
import { closePool } from '../../../src/providers/dbProvider';

describe('Unit test for TagModel', () => {
  const usersManagerModel = new UsersManagerModel();
  let userModel: UserModel;
  beforeEach(async () => {
    await usersManagerModel.clearAllUsers();
    userModel = await usersManagerModel.createUser({ name: 'user1', password: 'password' });
  });
  afterAll(async () => {
    await closePool();
  });
  // ===========================================================
  // Basic functionalities
  // ===========================================================
  test('Login and logout', async () => {
    try {
      const token = await userModel.login();
      userModel.logout(token);
    } catch (e) {
      fail();
    }
  });
});
