import { query } from '../providers/dbProvider';
import { PostStatistics } from '../types';
import { DaoError } from '../types/errors';
import { POST_DAO } from '../utils/constants/daoNames';
import { PostField } from '../utils/constants/tableEnum';
import {
  ConvertObjectToInsertQuery,
  ConvertObjectsToInsertQuery,
  queryWhereGenerator,
} from '../utils/helpers';
import {
  PostDaoCreateRequest,
  PostDaoDeleteRequest,
  PostDaoReadRequest,
  PostDaoUpdateRequest,
} from '../types/dao/requests';
import {
  PostDaoCreateResponse,
  PostDaoReadResponse,
  PostDaoUpdateResponse,
} from '../types/dao/responses';
export default class PostDao {
  //=========================================================================
  // Basic (create, delete, update, read)
  //=========================================================================
  static async create(request: PostDaoCreateRequest): Promise<PostDaoCreateResponse> {
    let startQuery = `INSERT INTO posts(${PostField.ID}, ${PostField.TITLE},  ${PostField.CONTENT}, ${PostField.AUTHOR}, ${PostField.DESCRIPTION}, ${PostField.BANNER}, ${PostField.IS_DRAFT}, ${PostField.PUBLISH_TIME}) VALUES`;
    try {
      // Convert DTOs to string format `values($1, $2, $3, $4)`
      const values: any[] = [];
      const placeHolders = ConvertObjectsToInsertQuery(request.data, values);
      await query(startQuery + placeHolders.join(','), values);
      return {};
    } catch (e: any) {
      throw new DaoError(
        'Have problem to insert an new post to database',
        POST_DAO,
        500,
        e.message
      );
    }
  }
  static async read(request: PostDaoReadRequest): Promise<PostDaoReadResponse> {
    const values: any[] = [];
    const whereQuery = queryWhereGenerator(request, values);
    const posts = await query(
      `SELECT * FROM posts ${whereQuery.length !== 0 ? 'WHERE' : ''} ${whereQuery}`,
      values
    );
    return posts;
  }
  static async delete(request: PostDaoDeleteRequest) {
    const placeHolders = request.postIds.map((postId, index) => `id = $${index + 1}`);
    try {
      await query(
        `DELETE FROM posts ${placeHolders.length !== 0 ? 'WHERE' : ''} ${placeHolders.join(',')}`,
        request.postIds
      );
    } catch (e: any) {
      throw new DaoError('Fail to delete posts', POST_DAO, 500, e.message);
    }
  }
  static async update(request: PostDaoUpdateRequest): Promise<PostDaoUpdateResponse> {
    request.postIds.forEach(async (postId, index) => {
      const values: any = [];
      const placeHolders = ConvertObjectToInsertQuery(request.data[index], values);
      // Rmoeve Id key from the query string
      const placeHoldersWithoutId = placeHolders.split(',').splice(1).join(',');
      await query(
        `UPDATE posts SET ${placeHoldersWithoutId} WHERE ${PostField.ID} = $${values.length + 1}`,
        [...values, postId]
      );
    });
    return {};
  }
  //============================================================================
  // Extra features
  //============================================================================

  static async listStatistics(): Promise<PostStatistics> {
    const postsCount = await query('SELECT count(*) FROM posts', []);
    return { postsCount: postsCount[0] };
  }
}
