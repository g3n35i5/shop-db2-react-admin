import {Record} from 'ra-core';

export interface Purchase extends Record {
    id: number;
    timestamp: string;
    user_id: number;
    product_id: number;
    productprice: number;
    price: number;
    amount: number;
    revoked: boolean;
}
