export type LoginRequest = {
  email: string;
  password: string;
  provider?: string;
  nick?: string;
};
export type ResetRequest = LoginRequest;
export type ForgotPasswordRequest = LoginRequest;

export type CreateUserRequest = {
  email: string;
  password: string;
  nick?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  security?: number;
  provider?: string;
};

export type EntityUser = {
  _id: string;
  userid: string;
  entityId: string;
  nick: string;
  clientId: string;
};
