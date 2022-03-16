export class ProductModel {
    id?: number;
    productCode?: string;
    title?: string;
    description?: string;
    category?: string;
    brand?: string;
    size?: string;
    condition?: string;
    priceTag?: number;
    photos?: [];
    mainPhoto?: string;
    active?: boolean;
    wishlistedCount?: number;
}
