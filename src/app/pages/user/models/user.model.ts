export class NotificationsModel {
    notificationTitle?: string;
    notificationDescription?: string;
}

export class UserModel {
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
