import { AdressModel } from "../../login/models/login.model";

export class CartModel {
    public cartId?: number;
    public productsId?: number[];
}

export class UserByIdModel {
    name?: string;
    userName?: string;
    email?: string;
    address?: AdressModel;
}
