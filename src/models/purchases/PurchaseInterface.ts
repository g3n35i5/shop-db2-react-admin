
export interface Purchase {
    id?: number;
    timestamp?: string;
    user_id: number;
    admin_id?: number;
    product_id: number;
    productprice?: number;
    price?: number;
    amount: number;
    revoked?: boolean;
}
