import { Record } from 'ra-core';
import { Tag } from '../tags/TagInterface';

export interface Product extends Record {
    id: number;
    name: string;
    price: number;
    barcode?: string;
    active: boolean;
    imagename?: string;
    countable: boolean;
    revocable: boolean;
    creation_date: string;
    tags: Tag[];
}
