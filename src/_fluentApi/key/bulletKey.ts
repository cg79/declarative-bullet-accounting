import { GoogleStorage } from "./google-storage";

export class BulletKey {
  _id = "";

  guid = "";
  name = "";
  server = "";

  database = "";

  tokenPassword = "";

  tokenExpire = "";
  domain = "";
  css = "";
  personalServerUrl = "";
  loggingServerUrl = "";

  password = "";

  editMode = false;

  security = 0;

  useSecretKey = false;

  googleStorage: GoogleStorage | null = null;
  secretKey = "";
  constructor(obj: any = {}) {
    this.fill(obj);
  }

  fill(obj: any = {}) {
    debugger;
    const {
      _id,
      guid,
      name,
      server,
      database,
      tokenPassword,
      tokenExpire,
      domain,
      personalServerUrl,
      loggingServerUrl,
      googleStorage = {},
      security = 0,
      useSecretKey = false,
      secretKey = "",
    } = obj;
    this._id = _id;
    this.name = name;
    this.server = server;
    this.database = database;
    this.tokenPassword = tokenPassword;
    this.tokenExpire = tokenExpire;
    this.guid = guid;
    this.domain = domain;
    this.personalServerUrl = personalServerUrl;
    this.loggingServerUrl = loggingServerUrl;
    this.security = security;
    this.useSecretKey = useSecretKey;
    this.secretKey = secretKey;

    this.googleStorage = new GoogleStorage(googleStorage);
  }
}
