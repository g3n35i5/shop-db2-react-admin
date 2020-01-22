import * as React from 'react';

import {ChipField, Datagrid, Filter, List, ReferenceField, TextField, BooleanField, TextInput, EditButton} from 'react-admin';

const UserListFilter = (props: any) => (
    <Filter {...props}>
        <TextInput label="Firstname" source="firstname"/>
        <TextInput label="Lastname" source="lastname"/>
    </Filter>
);

export const UserList = (props: any) => (
    <List
        {...props}
        filters={<UserListFilter/>}
        bulkActionButtons={false}
    >
        <Datagrid>
            <TextField source="id"/>
            <TextField source="firstname"/>
            <TextField source="lastname"/>
            <ReferenceField label="Rank" source="rank_id" reference="ranks" sortable={false}>
                <ChipField source="name"/>
            </ReferenceField>
            <EditButton/>
        </Datagrid>
    </List>
);
