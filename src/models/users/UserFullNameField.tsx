import React, { FC } from 'react';

import {User} from './UserInterface';
import {FieldProps} from "../../shared/interfaces/FieldProps";


export const UserFullNameField: FC<FieldProps<User>> = ({ record }) => {
    if (record) {
        if (record.firstname) {
            return <span>{record.firstname} {record.lastname}</span>;
        } else {
            return <span>{record.lastname}</span>;
        }
    }
    return null;
};
