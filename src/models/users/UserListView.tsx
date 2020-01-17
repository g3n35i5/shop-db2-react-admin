import * as React from 'react';

import {ChipField, Datagrid, Filter, List, ReferenceField, TextField, TextInput} from 'react-admin';

const UserListFilter = (props: any) => (
    <Filter {...props}>
        <TextInput label="Firstname" source="firstname"/>
        <TextInput label="Lirstname" source="lastname"/>
    </Filter>
);

export const UserList = (props: any) => (
    <List
        {...props}
        filters={<UserListFilter/>}
    >
        <Datagrid>
            <TextField source="id"/>
            <TextField source="firstname"/>
            <TextField source="lastname"/>
            <ReferenceField label="Rank" source="rank_id" reference="ranks" sortable={false}>
                <ChipField source="name"/>
            </ReferenceField>
        </Datagrid>
    </List>
);
