import { query } from '../providers/dbProvider';
import {
  tokenDaoCreateRequest,
  tokenDaoDeleteRequest,
  tokenDaoReadRequest,
  tokenDaoUpdateRequest,
} from '../types/dao/requests';
import { tokenDaoCreateResponse, tokenDaoReadResponse } from '../types/dao/responses';
import { ConvertObjectsToInsertQuery, queryWhereGenerator } from '../utils/helpers';

export default class TokenDao {
  //====================================================================
  // Basic (read, create, delete, update)
  //====================================================================
  static async read(request: tokenDaoReadRequest): Promise<tokenDaoReadResponse> {
    const values: any[] = [];
    const placeHolders = queryWhereGenerator(request, values);
    const tokens = await query(
      `SELECT * FROM tokens ${placeHolders !== '' ? 'WHERE' : ''} ${placeHolders}`,
      [...values]
    );
    return tokens;
  }
  static async create(request: tokenDaoCreateRequest): Promise<tokenDaoCreateResponse> {
    const values: any[] = [];
    const placeHolders = ConvertObjectsToInsertQuery(request.data, values);
    await query(
      'INSERT INTO tokens(token, generate_time, expired_time, owner) VALUES ' + placeHolders,
      values
    );
    return {};
  }
  static async delete(request: tokenDaoDeleteRequest) {
    const formatTokens = request.tokens.map((token) => `'${token}'`);
    await query(`DELETE FROM tokens WHERE token in (${formatTokens.join(',')})`, []);
  }
  static async update(request: tokenDaoUpdateRequest) {}
}
