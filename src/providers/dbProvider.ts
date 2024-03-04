import { Pool, QueryResult } from 'pg';
import DBconfig from '../config/database.config';
function createpool() {
  const pool = new Pool({
    host: DBconfig.HOST,
    port: DBconfig.PORT,
    user: DBconfig.USER,
    password: DBconfig.PASSWORD,
    database: DBconfig.DATABASE,
  });
  return pool;
}
let pool: Pool | undefined = createpool();
export async function query(query: string, values: any[]): Promise<Array<any>> {
  if (!pool) {
    pool = createpool();
  }
  return new Promise(async (resolve, reject) => {
    const queryResult = await pool?.query(query, values.length === 0 ? [] : values);
    if (!queryResult) {
      reject();
    }
    resolve(queryResult!.rows);
  });
}

export async function closePool() {
  if (pool) {
    await pool.end();
    pool = undefined;
  }
}
