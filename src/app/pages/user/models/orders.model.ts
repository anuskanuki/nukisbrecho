export class OrdersUserModel {
    orderId?: number;
    orderDate?: string;
    orderStatusRecived?: boolean;
    orderStatusProcessingPayment?: boolean;
    orderStatusPaymentOk?: boolean;
    orderStatusFinished?: boolean;
    products?: OrderProductModel[];
}

export class OrderProductModel {
    productId?: number;
    productTitle?: string;
    productPhoto?: string;
}
