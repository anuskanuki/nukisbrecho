
export class UserWithTokenModel {
  sub?: string;
  email?: string;
  jti?: string;
  nbf?: string;
  iat?: string;
  exp?: string;
  iss?: string;
  aud?: string;
}

export class LoginModel {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export class AccessTokenModel {
  accessToken!: string;
}