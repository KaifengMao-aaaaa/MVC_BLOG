import UserDao from '../../dao/UserDao';
import { ModelError } from '../../types/errors';
import { USER_PERMISSIONS } from '../../utils/constants/userEnum';
import { generateRandomId } from '../../utils/helpers';
import UserModel from '../User/UserModel';
import { UserDaoDTO } from '../../types/dao/DTOs';
import { UserCreateDTO } from '../../types/models/DTOs';
import { UserSearchRequest } from '../../types/models/requests';
/**
 * This model encapsulates the basic actions on all users.
 */
export default class UsersManagerModel {
  private modelName = 'UserManagerModel';
  async createUser(request: UserCreateDTO): Promise<UserModel> {
    return new Promise(async (resolve, reject) => {
      if (!request.name) {
        reject(new ModelError('Need name of user', 'PARAMETERS_ERROR', 400, this.modelName));
        return;
      } else if (!request.password) {
        reject(new ModelError('Need name of user', 'PARAMETERS_ERROR', 400, this.modelName));
        return;
      } else if ((await this.searchUsers({ name: request.name })).length !== 0) {
        reject(new ModelError('Change a name', 'PARAMETERS_ERROR', 400, this.modelName));
        return;
      }
      const user: UserDaoDTO = {
        id: generateRandomId(),
        name: request.name,
        password: request.password,
        permission: USER_PERMISSIONS.VIEWER,
      };
      try {
        await UserDao.create({ data: [user] });
      } catch (e) {
        throw new ModelError('Register Late ....', 'SERVER_ERROR', 500, this.modelName);
      }
      resolve(new UserModel(user));
    });
  }
  async searchUsers(request: UserSearchRequest): Promise<UserModel[]> {
    const users = await UserDao.read(request);
    const userModels = users.map((user) => new UserModel(user));
    return userModels;
  }
  async clearAllUsers(): Promise<void> {
    try {
      for (const user of await this.searchUsers({})) {
        await user.delete();
      }
      return;
    } catch (e: any) {
      throw new ModelError(e.message, 'SERVER_ERROR', 500, this.modelName);
    }
  }
}
