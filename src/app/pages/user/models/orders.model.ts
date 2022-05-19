export class OrderModel {
    id?: number;
    orderDate?: string;
    orderStatusRecived?: boolean;
    orderStatusProcessingPayment?: boolean;
    orderStatusPaymentOk?: boolean;
    orderStatusFinished?: boolean;
    userId?: string;
    products?: OrderProductModel[];
}

export class OrderProductModel {
    id?: string;
    title?: string;
    photo?: string;
    priceTag?: string;
}
