export class OrdersUserModel {
    id?: number;
    orderDate?: string;
    orderStatusRecived?: boolean;
    orderStatusProcessingPayment?: boolean;
    orderStatusPaymentOk?: boolean;
    orderStatusFinished?: boolean;
    productId?: number;
    productTitle?: string;
    productPhoto?: string;
}
