export type IStatus = {
  status: number;
  message?: unknown;
  accessToken?: string;
};

export type IResetPasswordOnFirstLogin = {
  email: string;
  new_password: string;
  password: string;
};
