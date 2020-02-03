import { Record } from 'ra-core';

export interface Deposit extends Record {
    id: number;
    timestamp: string;
    admin_id: number;
    user_id: number;
    amount: number;
    comment: string;
    revoked: boolean;
}
