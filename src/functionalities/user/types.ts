export type LoginRequest = {
  email: string;
  password: string;
  provider?: string;
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
