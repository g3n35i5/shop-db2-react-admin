import * as React from 'react';
import { List, Datagrid, TextField, ReferenceField } from 'react-admin';
import {UserFullNameField} from './UserFullNameField';

export const UserList = (props: any) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <UserFullNameField />
            <ReferenceField label="Rank" source="rank_id" reference="ranks" sortBy="id">
                <TextField source="name" />
            </ReferenceField>
        </Datagrid>
    </List>
);
