import { User } from '../../types/models/DTOs';
import { USER_PERMISSIONS } from '../../utils/constants/userEnum';
import UserBasicModel from './Basic';

export default class UserSecurityModel extends UserBasicModel {
  constructor(user: User) {
    super(user);
  }
  async canWritePost(): Promise<boolean> {
    if (this.user.permission === USER_PERMISSIONS.VIEWER) {
      return false;
    }
    return true;
  }
}
