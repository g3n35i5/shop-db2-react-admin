import * as React from 'react';
import {Datagrid, List, TextField} from 'react-admin';
import UserReferenceField from "../users/UserReferenceField";


export const TagList = (props: any) => (
    <List
        {...props}
        bulkActionButtons={false}>
        <Datagrid>
            <TextField source="id"/>
            <TextField source="name"/>
            <UserReferenceField source="created_by"/>
        </Datagrid>
    </List>
);
