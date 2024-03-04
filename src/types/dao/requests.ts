// ===========================================================
// Post
// ===========================================================

import { PostField, UserField } from '../../utils/constants/tableEnum';
import { PostDaoDTO, TagDaoDTO, TokenDaoDTO, UserDaoDTO } from './DTOs';

export type PostDaoCreateRequest = {
  data: PostDaoDTO[];
};
export type PostDaoDeleteRequest = {
  postIds: number[];
};
export type PostDaoUpdateRequest = {
  data: PostDaoDTO[];
  postIds: number[];
};
export type PostDaoReadRequest = {
  id?: number;
  author?: number;
  is_draft?: boolean;
  title?: string;
  publish_time?: Date;
};

// ===========================================================
// User
// ===========================================================

export type UserDaoCreateRequest = {
  data: UserDaoDTO[];
};
export type UserDaoDeleteRequest = {};
export type UserDaoUpdateRequest = {
  data: UserDaoDTO[];
  userIds: number[];
};
export type UserDaoReadRequest = {
  permission?: string;
  id?: number;
  name?: string;
};

// ===========================================================
// Tag
// ===========================================================

export type TagDaoCreateRequest = {};
export type TagDaoDeleteRequest = {
  tags: TagDaoDTO[];
};
export type TagDaoReadRequest = {
  postId: number;
};

// ===========================================================
// Token
// ===========================================================

export type tokenDaoCreateRequest = {
  data: TokenDaoDTO[];
};
export type tokenDaoDeleteRequest = {
  tokens: string[];
};
export type tokenDaoUpdateRequest = {};
export type tokenDaoReadRequest = {
  token?: string;
  expired_time?: Date;
  generate_time?: Date;
  owner?: number;
};
