import { ModelError } from '../types/errors';
import { CONTROLLER_BACK_RESULT, ResultStatusTypes } from '../types/results';
import { v4 as uuidv4 } from 'uuid';

export function generateRandomString(): string {
  return uuidv4();
}
export function generateRandomId(): number {
  return Number(
    String(Math.floor(Math.random() * 100000)) + String(Math.floor(Math.random() * 10000))
  );
}
export function catchModelError(error: ModelError): CONTROLLER_BACK_RESULT<void> {
  if (!(error instanceof ModelError)) {
    return {
      status: 'SERVER_ERROR',
      code: 500,
      payload: undefined,
      message: 'Bad Happened',
    };
  }
  return {
    status: error.status,
    code: error.statusCode,
    payload: undefined,
    message: error.message,
  };
}
export function formControllerResult<t>(
  status: ResultStatusTypes,
  message: string,
  code: number,
  payload: any
): CONTROLLER_BACK_RESULT<t> {
  return {
    status,
    message,
    code,
    payload,
  };
}
/**
 *
 * @param values {} object
 * @param correspondingValues Array to store values for these placeholders
 * @returns <key1>=<value1> And <key2>=<value2> And.........
 */
export function queryWhereGenerator(values: Record<string, any>, correspondingValues: any[]) {
  return Object.keys(values).reduce((accumulator, currentKey) => {
    if (values[currentKey] === undefined) {
      return accumulator;
    }
    correspondingValues.push(values[currentKey]);
    if (accumulator === '') {
      return `${currentKey}=$${correspondingValues.length}`;
    }
    return (accumulator += ` And ${currentKey}=$${correspondingValues.length}`);
  }, '');
}
/**
 *
 * @param objects [{}, {}, {}]
 * @param values Array to store values for these placeholders
 * @returns [($1, $2, $3, ....), ($i, $i+1, $i+2, ....), .......]
 */
export function ConvertObjectsToInsertQuery(
  objects: Record<string, any>[],
  values: any[]
): string[] {
  const placeHolders = objects.map((postDTO) => {
    const valueQuery = Object.keys(postDTO)
      .map((key) => {
        values.push(postDTO[key]);
        return `$${values.length}`;
      })
      .join(', ');
    return `(${valueQuery})`;
  });
  return placeHolders;
}
/**
 *
 * @param object Convert {key1: value1, key2: value2, key3: value3} Object to string key1 = value1, key2 = value2, key3 = value3
 * @param values
 * @returns
 */
export function ConvertObjectToInsertQuery(object: Record<any, any>, values: any[]): string {
  const placeHolders = Object.keys(object).map((key, index) => {
    return `${key} = ${index}`;
  });
  return placeHolders.join(',');
}
