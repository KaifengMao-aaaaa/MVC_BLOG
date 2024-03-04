import { PostField, UserField } from '../utils/constants/tableEnum';
import { USER_PERMISSIONS, USER_STATUS } from '../utils/constants/userEnum';

// export type POST = {
//   [PostField.ID]: number;
//   [PostField.TITLE]: string;
//   [PostField.BANNER]: string;
//   [PostField.DESCRIPTION]: string;
//   [PostField.CONTENT]: string;
//   [PostField.AUTHOR]: number;
//   [PostField.IS_DRAFT]: boolean;
//   [PostField.PUBLISH_TIME]: Date;
// };
// export type USER = {
//   [UserField.ID]: number;
//   [UserField.NAME]: string;
//   [UserField.PASSWORD]: string;
//   [UserField.PERMISSION]: string;
// };
export type TOKEN = {
  token: string;
  generate_time: Date;
  expired_time: Date;
  ownerId: number;
};
export type PostStatistics = {
  postsCount: number;
};
export type UserStatistics = {
  usersCount: number;
};
export type POST_SEARCH_CRITERIAS =
  | PostField.ID
  | PostField.AUTHOR
  | PostField.IS_DRAFT
  | PostField.TITLE
  | PostField.PUBLISH_TIME;
export type USER_SEARCH_CRITERIAS = UserField.PERMISSION | UserField.ID | UserField.NAME;
export type USER_STATUS_TYPE = USER_STATUS.LOGOUT | USER_STATUS.LOGIN;
export type USER_PERMISSION_TYPE =
  | USER_PERMISSIONS.ADMIN
  | USER_PERMISSIONS.VIEWER
  | USER_PERMISSIONS.CONTRIBUTOR;
