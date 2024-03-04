import { PostField, UserField } from '../../utils/constants/tableEnum';

export type UserSearchRequest = Partial<{
  [UserField.ID]: number;
  [UserField.PERMISSION]: string;
  [UserField.NAME]: string;
}>;
export type PostSearchRequest = Partial<{
  [PostField.ID]: number;
  [PostField.AUTHOR]: number;
  [PostField.IS_DRAFT]: boolean;
  [PostField.TITLE]: string;
  [PostField.PUBLISH_TIME]: Date;
}>;
