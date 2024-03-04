import { query } from '../providers/dbProvider';
import { TagDaoDeleteRequest, TagDaoReadRequest } from '../types/dao/requests';
import { TagrDaoDeleteResponse, TagrDaoReadResponse } from '../types/dao/responses';
import { DaoError } from '../types/errors';
import { TAG_DAO } from '../utils/constants/daoNames';
import { TagField } from '../utils/constants/tableEnum';

export default class TagDao {
  //======================================================================
  // Basic (read, delete, create)
  //======================================================================
  static async read(request: TagDaoReadRequest): Promise<TagrDaoReadResponse> {
    const tags = await query('SELECT * FROM have_tag WHERE post_id = $1', [request.postId]);
    return tags.map((tag) => tag.name);
  }
  static async create(postId: number, tags: string[]) {
    const placeHolders = tags.map((tag, index) => {
      return `($${index + 1}, ${postId})`;
    });
    try {
      await query(
        `INSERT INTO have_tag (${TagField.TAG}, ${TagField.POST}) values ${placeHolders.join(',')}`,
        tags
      );
    } catch (e: any) {
      throw new DaoError('Insert tag failed', TAG_DAO, 500, e.message);
    }
  }
  static async delete(request: TagDaoDeleteRequest): Promise<TagrDaoDeleteResponse> {
    if (request.tags.length === 0) {
      return {};
    }
    const startQuery = 'DELETE FROM have_tag WHERE ';
    let index = 1;
    const values = [];
    try {
      let tmps = [];
      for (const tag of request.tags) {
        let tmp = [];
        if (tag.postId) {
          tmp.push(`post_id = $${index}`);
          values.push(tag.postId);
          index += 1;
        }
        if (tag.name) {
          tmp.push(`name = $${index}`);
          values.push(tag.name);
          index += 1;
        }
        tmps.push(`(${tmp.join(' And ')})`);
      }
      await query(startQuery + tmps.join(' OR '), values);
      return {};
    } catch (e: any) {
      throw new DaoError('Delete relatived tags with post failed', TAG_DAO, 500, e.message);
    }
  }
}
