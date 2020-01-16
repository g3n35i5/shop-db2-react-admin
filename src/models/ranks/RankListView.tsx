import * as React from 'react';
import { Datagrid, List, TextField } from 'react-admin';
import { CurrencyInCentsField } from '../../shared/fields/CurrencyInCents';


export const RankList = (props: any) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id"/>
            <TextField source="name"/>
            <CurrencyInCentsField source="debt_limit"/>
        </Datagrid>
    </List>
);
