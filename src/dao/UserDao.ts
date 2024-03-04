import { query } from '../providers/dbProvider';
import { UserStatistics } from '../types';
import { DaoError } from '../types/errors';
import { USER_DAO } from '../utils/constants/daoNames';
import { UserField } from '../utils/constants/tableEnum';
import {
  ConvertObjectToInsertQuery,
  ConvertObjectsToInsertQuery,
  queryWhereGenerator,
} from '../utils/helpers';
import {
  UserDaoCreateRequest,
  UserDaoReadRequest,
  UserDaoUpdateRequest,
} from '../types/dao/requests';
import {
  UserDaoCreateResponse,
  UserDaoReadResponse,
  UserDaoUpdateResponse,
} from '../types/dao/responses';

export default class UserDao {
  //===========================================================================
  // Basic (create, update, delete, read)
  //===========================================================================
  static async create(request: UserDaoCreateRequest): Promise<UserDaoCreateResponse> {
    try {
      let values: any[] = [];
      const placeholders = ConvertObjectsToInsertQuery(request.data, values);
      await query(
        `INSERT INTO users (${UserField.ID}, ${UserField.NAME}, ${UserField.PASSWORD}, ${UserField.PERMISSION}) VALUES ` +
          placeholders.join(','),
        values
      );
      return {};
    } catch (e: any) {
      throw new DaoError('Cannot insert user to database', USER_DAO, 500, e.message);
    }
  }

  static async read(request: UserDaoReadRequest): Promise<UserDaoReadResponse> {
    const values: any[] = [];
    const placeHolders = queryWhereGenerator(request, values);
    const user = await query(
      `SELECT * FROM users ${placeHolders.length !== 0 ? 'WHERE' : ''} ${placeHolders} `,
      values
    );
    return user;
  }
  static async delete(userId: number): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await query(`DELETE FROM users WHERE ${UserField.ID} = $1`, [userId]);
      } catch (e: any) {
        reject();
        throw new DaoError('Have problem to clear the user', USER_DAO, 500, e.message);
      }
      resolve();
    });
  }
  static async update(request: UserDaoUpdateRequest): Promise<UserDaoUpdateResponse> {
    const failedUserCases: any[] = [];
    request.userIds.forEach(async (userId, index) => {
      try {
        const values: any[] = [];
        const placeHolders = ConvertObjectToInsertQuery(request.data[index], values);
        const placeHoldersWithoutId = placeHolders.split(',').splice(1).join(',');
        await query(
          `UPDATE users SET ${placeHoldersWithoutId} WHERE ${UserField.ID} = $${values.length + 1}`,
          [...values, userId]
        );
      } catch (e: any) {
        throw new DaoError(
          `Have problem to update user ${userId} at database`,
          USER_DAO,
          500,
          e.message
        );
        failedUserCases.push(userId);
      }
    });
    return { failed: failedUserCases };
  }
  // ======================================================================
  // Extra features
  // ======================================================================
  static async listStatistics(): Promise<UserStatistics> {
    const userCount = await query('SELECT count(*) FROM users', []);
    return { usersCount: userCount[0] };
  }
}
