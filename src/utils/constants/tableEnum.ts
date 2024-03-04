export enum PostField {
  ID = 'id',
  TITLE = 'title',
  CONTENT = 'content',
  AUTHOR = 'author',
  DESCRIPTION = 'des',
  BANNER = 'banner',
  IS_DRAFT = 'is_draft',
  PUBLISH_TIME = 'publish_time',
}
export enum POST_FEATURES {
  TAG = 'tags',
}

export enum UserField {
  ID = 'id',
  NAME = 'name',
  PASSWORD = 'password',
  PERMISSION = 'permission',
}
export enum TagField {
  POST = 'post_id',
  TAG = 'name',
}

export enum TokenField {
  TOKEN = 'token',
  GENERATE = 'generate_time',
  EXPIRED = 'expired_time',
  OWNER = 'owner',
}
