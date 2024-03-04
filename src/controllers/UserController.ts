import { Request, Response } from 'express';
import UsersManagerModel from '../models/Manager/UsersManager';
import PostsManagerModel from '../models/Manager/PostsManager';
export default class UserController {
  protected usersManager = new UsersManagerModel();
  protected postsManager = new PostsManagerModel();
  async userRegister(req: Request, res: Response) {
    await this.usersManager.createUser(req.body.user);
  }
  userLogin(req: Request, res: Response) {}
  userLogout(req: Request, res: Response) {}
}
