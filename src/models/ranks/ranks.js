import React from 'react';
import { Datagrid, List, TextField } from 'react-admin';
import { CurrencyInCentsField } from '../../shared/fields/currency_in_cents';


export const RankList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id"/>
            <TextField source="name"/>
            <CurrencyInCentsField source="debt_limit" currency="EUR"/>
        </Datagrid>
    </List>
);
