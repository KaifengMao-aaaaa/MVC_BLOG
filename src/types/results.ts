export type CONTROLLER_BACK_RESULT<t> = {
  status: ResultStatusTypes;
  code: number;
  payload: t;
  message: string;
};
export type ResultStatusTypes =
  | 'SUCESS'
  | 'UNLOGIN'
  | 'UNAUTHOR'
  | 'FROZEN'
  | 'SERVER_ERROR'
  | 'PARAMETERS_ERROR';
export type ResultStatusErrorTypes = Exclude<ResultStatusTypes, 'SUCESS'>;
