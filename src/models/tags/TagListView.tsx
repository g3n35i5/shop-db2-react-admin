import * as React from 'react';
import {Datagrid, List, TextField, NumberField, BooleanField} from 'react-admin';
import UserReferenceField from "../users/UserReferenceField";


export const TagList = (props: any) => (
    <List
        {...props}
        bulkActionButtons={false}>
        <Datagrid>
            <NumberField source="id"/>
            <TextField source="name"/>
            <UserReferenceField source="created_by"/>
            <BooleanField source="is_for_sale"/>
        </Datagrid>
    </List>
);
