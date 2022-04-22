export class ProductActions {
    id: number;
    active: boolean;
    title: string;
    category?: string;
    priceTag: number;
    wishlistedCount: number;
    size?: string;
    brand?: string;
    condition?: string;
    productCode?: string;
    description?: string;

    constructor(
        id?: number,
        active?: boolean,
        title?: string,
        category?: string,
        priceTag?: number,
        wishlistedCount?: number,
        size?: string,
        brand?: string,
        condition?: string,
        productCode?: string,
        description?: string
    ) {
        this.id = id || 0;
        this.active = active || false;
        this.title = title || "Não definido";
        this.category = category;
        this.priceTag = priceTag || 0;
        this.wishlistedCount = wishlistedCount || 0;
        this.size = size || "";
        this.brand = brand || "";
        this.condition = condition || "";
        this.productCode = productCode || "";
        this.description = description || "";
    }
}
