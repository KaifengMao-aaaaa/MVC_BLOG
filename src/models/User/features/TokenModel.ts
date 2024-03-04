import TokenDao from '../../../dao/TokenDao';
import { TokenDaoDTO, UserDaoDTO } from '../../../types/dao/DTOs';
import { ModelError } from '../../../types/errors';
import { User } from '../../../types/models/DTOs';
import { generateRandomString } from '../../../utils/helpers';
import UserBasicModel from '../Basic';
export default class UserTokenModel extends UserBasicModel {
  protected modelName = 'UserTokenModel';
  constructor(user: User) {
    super(user);
  }
  async addTokenToUser(): Promise<string> {
    const currentTime = new Date();

    const validationDuration = 30 * 60 * 1000;
    const token: TokenDaoDTO = {
      token: generateRandomString(),
      generate_time: currentTime,
      expired_time: new Date(currentTime.getTime() + validationDuration),
      owner: this.user.id,
    };
    await TokenDao.create({ data: [token] });
    return token.token;
  }
  async removeTokensFromUser(): Promise<void> {
    const userTokens = await TokenDao.read({ owner: this.user.id });
    if (userTokens.length > 0) {
      await TokenDao.delete({ tokens: userTokens.map((token) => token.token) });
    }
  }
  async removeTokenFromUser(token: string): Promise<void> {
    await TokenDao.delete({ tokens: [token] });
  }
  async checkHaveValidToken(token: string) {
    const tokenInfs = await TokenDao.read({ token });
    if (tokenInfs.length === 0) {
      throw new ModelError('Expired token', 'UNAUTHOR', 403, this.modelName);
    }
    const unnecessayTokens = [];
    let is_exist_valid_token = false;
    for (const token of tokenInfs) {
      if (new Date(token.expired_time) < new Date()) {
        unnecessayTokens.push(token);
      } else {
        is_exist_valid_token = true;
      }
    }
    if (unnecessayTokens.length > 0) {
      await TokenDao.delete({ tokens: unnecessayTokens.map((token) => token.token) });
    }
    if (!is_exist_valid_token) {
      throw new ModelError('Expired token', 'UNAUTHOR', 403, this.modelName);
    }
  }
}
