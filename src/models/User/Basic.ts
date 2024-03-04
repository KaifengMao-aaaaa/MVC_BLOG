import { User } from '../../types/models/DTOs';

export default class UserBasicModel {
  protected user: User;
  constructor(user: User) {
    this.user = user;
  }
}
