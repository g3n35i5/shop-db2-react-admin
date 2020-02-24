import * as React from 'react';
import {BooleanField, Datagrid, List, NumberField, TextField} from 'react-admin';
import {CurrencyInCentsField} from '../../shared/fields/CurrencyInCents';


export const RankList = (props: any) => (
    <List
        {...props}
        bulkActionButtons={false}>
        <Datagrid rowClick="edit">
            <NumberField source="id"/>
            <TextField source="name"/>
            <CurrencyInCentsField source="debt_limit"/>
            <BooleanField source="is_system_user"/>
        </Datagrid>
    </List>
);
