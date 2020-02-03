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

export function getFullNameOfUser(user: User): string {
    if (user.firstname) {
        return `${user.firstname} ${user.lastname}`;
    } else {
        return `${user.lastname}`;
    }
}
