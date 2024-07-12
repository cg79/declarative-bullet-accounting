enum BULLET_METHOD {
  INSERT = "insert",
  INSERT_ONE = "insertOne",
  INSERT_MANY = "insertMany",
  INSERT_OR_UPDATE = "insert_or_update",
  UPDATE = "update",
  UPDATE_ONE = "updateOne",
  DELETE_MANY = "deleteMany",
  DELETE_ONE = "deleteOne",
  FIND = "find",
  FIND_ONE = "findOne",
  PAGINATION = "page",
  LAMDA = "lamda",
}

enum BULLET_JOIN_METHOD {
  FIND = "find",
  FIND_ONE = "findOne",
  PAGINATION = "page",
}

enum STORAGE_PROVIDER {
  GOOGLE = "google",
  LOCAL = "local",
}

export interface IStorageProvider {
  directory: string;
  provider?: STORAGE_PROVIDER;
}

enum IFileStatus {
  FreeSlot = 0,
  AddedFile = 1,
  ExistentFile = 2,
  DeletedFile = 3,
  ReplacedFile = 4,
}

enum BULLET_SECURITY {
  // LIST = 1,
  CREATE = 2,
  CREATE_TOKEN = 4,
  DELETE_OTHERS = 8,
  DELETE = 16,
  UPDATE_OTHERS = 32,
  UPDATE_MY = 64,
  LOGIN_UNCONFIRMED_USERS = 128,
}

export {
  BULLET_METHOD,
  BULLET_SECURITY,
  STORAGE_PROVIDER,
  BULLET_JOIN_METHOD,
  IFileStatus,
};
