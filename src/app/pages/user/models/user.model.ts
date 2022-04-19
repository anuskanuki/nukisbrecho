export class NotificationsModel {
    notificationTitle?: string;
    notificationDescription?: string;
}

export class UserGetAllModel {
    id?: string;
    name?: string;
    email?: string;
    city?: string;
    state?: AdressModel;
    isAdmin?: boolean;
    isActive?: boolean;
}

export class UserModel {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    address?: AdressModel;
    isAdmin?: boolean;
    isActive?: boolean;
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
