import * as React from 'react';
import {Datagrid, List, ReferenceField, TextField} from 'react-admin';
import {UserFullNameField} from "../users/UserFullNameField";


export const TagList = (props: any) => (
    <List
        {...props}
        bulkActionButtons={false}>
        <Datagrid>
            <TextField source="id"/>
            <TextField source="name"/>
            <ReferenceField label="Created by" source="created_by" reference="users" sortBy="id">
                <UserFullNameField/>
            </ReferenceField>
        </Datagrid>
    </List>
);
