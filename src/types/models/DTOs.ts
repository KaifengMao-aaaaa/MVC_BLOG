// ========================================================================
// User

import UserSecurityModel from '../../models/User/Security';

// ========================================================================
export type UserDTO = {
  name: string;
  password: string;
};
export type User = {
  id: number;
  permission: string;
  name: string;
  password: string;
};
export type UserCreateDTO = {
  name: string;
  password: string;
};
// ========================================================================
// Post
// ========================================================================
export type Post = {
  id: number;
  title: string;
  banner: string;
  des: string;
  content: string;
  is_draft: boolean;
  author: number;
  publish_time: Date;
  tags: string[];
};
export type PostCreateDTO = {
  id?: number;
  title: string;
  banner: string;
  des: string;
  content: string;
  is_draft: boolean;
  author: number;
  publish_time: Date;
  tags: string[];
};
export type PostDTO = {
  id?: number;
  title: string;
  banner?: string;
  des?: string;
  content?: string;
  is_draft?: boolean;
  author?: number;
  publish_time?: Date;
  tags?: string[];
};
