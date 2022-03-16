export class UserModel {
    id?: number;
    claim?: number;
    completeName?: string;
    completeAddress?: string;
    email?: string;
    notificationsNumber?: number;
    mobileNumber?: string;
    profilePicture?: string;
    password?: string;
    confirmPassword?: string;
    notifications?: NotificationsModel[];
}

export class NotificationsModel {
    notificationTitle?: string;
    notificationDescription?: string;
}
