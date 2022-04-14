export interface LoggedUserModel {
  nameid: string;
  unique_name: string;
  email: string;
  isAdmin: boolean;
  nbf: string;
  exp: string;
  iat: string;
}

export class LoginModel {
  email?: string;
  password?: string;
}

export interface UserCallBackLogin {
  name?: string;
  email?: string;
  token?: string;
}

export class NewUserModel {
  name?: string;
  email?: string;
  password?: string;
  address?: AdressModel;
  isAdmin?: boolean;
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
