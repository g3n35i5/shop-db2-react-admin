import * as React from 'react';
import {Datagrid, List, TextField, NumberField} from 'react-admin';
import {CurrencyInCentsField} from '../../shared/fields/CurrencyInCents';


export const RankList = (props: any) => (
    <List
        {...props}
        bulkActionButtons={false}>
        <Datagrid>
            <NumberField source="id"/>
            <TextField source="name"/>
            <CurrencyInCentsField source="debt_limit"/>
        </Datagrid>
    </List>
);
