import { Request, Response } from 'express';
import UsersManagerModel from '../models/Manager/UsersManager';
import PostsManagerModel from '../models/Manager/PostsManager';
import { catchModelError, formControllerResult } from '../utils/helpers';
export default class ManagerController {
  protected usersManager = new UsersManagerModel();
  protected postsManager = new PostsManagerModel();
  async userRegister(req: Request, res: Response) {
    try {
      await this.usersManager.createUser(req.body.user);
    } catch (e: any) {
      res.json(catchModelError(e)).status(e.code);
      return;
    }
    res.json(formControllerResult<void>('SUCESS', 'Create user sucessfully', 200, ''));
  }
  async userLogin(req: Request, res: Response) {
    const userModel = await this.usersManager.searchUsers({ id: req.body.userId });
    try {
      await userModel[0].login();
    } catch (e: any) {
      res.json(catchModelError(e)).status(e.code);
    }

    res.json(formControllerResult<void>('SUCESS', 'Login Sucessfully', 200, ''));
  }
  async userLogout(req: Request, res: Response) {
    const userModel = await this.usersManager.searchUsers({ id: req.body.userId });
    try {
      await userModel[0].logout(req.headers['token'] as string);
    } catch (e: any) {
      res.json(catchModelError(e)).status(e.code);
    }
    res.json(formControllerResult<void>('SUCESS', 'Logout', 200, ''));
  }
}
