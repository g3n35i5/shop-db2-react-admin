import { Record } from 'ra-core';

export interface User extends Record {
    id: number;
    firstname: string;
    lastname: string;
    credit: number;
    is_admin: boolean;
    creation_date: string;
    rank_id: string;
}
