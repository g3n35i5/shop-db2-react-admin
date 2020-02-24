import {Record} from 'ra-core';

export interface Rank extends Record {
    id: number;
    name: string;
    debt_limit: number;
}
