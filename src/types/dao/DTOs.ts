// Id must be first key in DTO object because the first key is Id that is default setting at some functions.
// ========================================================================
// Dao DTOs
// ========================================================================
export type PostDaoDTO = {
  id: number;
  title: string;
  banner: string;
  des: string;
  content: string;
  author: number;
  is_draft: boolean;
  publish_time: Date;
};
export type UserDaoDTO = {
  id: number;
  name: string;
  password: string;
  permission: string;
};
export type TokenDaoDTO = {
  token: string;
  generate_time: Date;
  expired_time: Date;
  owner: number;
};
export type TagDaoDTO = {
  postId: number;
  name: string;
};
