import { ResultStatusErrorTypes } from './results';

export class ModelError extends Error {
  status: ResultStatusErrorTypes;
  statusCode: number;
  errorModel: string;

  constructor(
    message: string,
    status: ResultStatusErrorTypes,
    statusCode: number,
    errorModel: string
  ) {
    super(message);
    this.status = status;
    this.statusCode = statusCode;
    this.errorModel = errorModel;
  }
}
export class DaoError extends Error {
  errorDao: string;
  error: string;
  code: number;
  constructor(message: string, errorDao: string, code: number, error: string = '') {
    super(message);
    this.errorDao = errorDao;
    this.error = error;
    this.code = code;
  }
}
