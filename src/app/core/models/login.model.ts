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

export class NewUserModel {
  name?: string;
  userName?: string;
  email?: string;
  password?: string;
  address?: AdressModel;
}

export interface AdressModel {
  neighborhood?: string;
  zipCode?: number;
  city?: string;
  street?: string;
  number?: number;
  state?: string;
  addressDetails?: string;
}