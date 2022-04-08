export class LoggedUserModel {
  unique_name?: string;
  email?: string;
  isAdmin?: boolean;
  nbf?: string;
  exp?: string;
  iat?: string;
}

export class LoginModel {
  userName?: string;
  password?: string;
}

export class AccessTokenModel {
  accessToken!: string;
}

export interface NewUserModel {
  name?: string;
  userName?: string;
  email?: string;
  password?: string;
  address?: AdressModel;
}

export interface AdressModel {
  neighborhood?: string;
  zipCode?: string;
  city?: string;
  street?: string;
  number?: string;
  state?: string;
  addressDetails?: string;
}