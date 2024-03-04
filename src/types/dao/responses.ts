import { PostDaoDTO, TokenDaoDTO, UserDaoDTO } from './DTOs';
// ===========================================================
// Post
// ===========================================================

export type PostDaoCreateResponse = {};
export type PostDaoDeleteResponse = {};
export type PostDaoUpdateResponse = {};
export type PostDaoReadResponse = PostDaoDTO[];

// ===========================================================
// User
// ===========================================================

export type UserDaoCreateResponse = {};
export type UserDaoDeleteResponse = {};
export type UserDaoUpdateResponse = {};
export type UserDaoReadResponse = UserDaoDTO[];

// ===========================================================
// Tag
// ===========================================================

export type TagDaoCreateResponse = {};
export type TagrDaoDeleteResponse = {};
export type TagrDaoReadResponse = string[];

// ===========================================================
// Token
// ===========================================================

export type tokenDaoCreateResponse = {};
export type tokenDaoDeleteResponse = {};
export type tokenDaoUpdateResponse = {};
export type tokenDaoReadResponse = TokenDaoDTO[];
