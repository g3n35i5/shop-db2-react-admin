import * as React from "react";
import {Datagrid, Filter, List, NumberField, TextField, TextInput, BooleanField} from "react-admin";
import UserReferenceField from "../users/UserReferenceField";
import {CurrencyInCentsField} from '../../shared/fields/CurrencyInCents';
import TimestampField from "../../shared/fields/TimestampField";
import {UserAutoComplete} from "../../shared/fields/UserAutoComplete";

// Filters for the purchase list view
const DepositListFilter = (props: any) => (
    <Filter {...props}>
        <UserAutoComplete alwaysOn={true}/>
        <TextInput source="comment" alwaysOn={true}/>
    </Filter>
);

// List view for the deposits
export const DepositList = (props: any) => (
    <List
        {...props}
        bulkActionButtons={false}
        filters={<DepositListFilter/>}
        sort={{field: 'id', order: 'DESC'}}
    >
        <Datagrid>
            <NumberField source="id"/>
            <TimestampField source="timestamp"/>
            <UserReferenceField source="admin_id"/>
            <UserReferenceField source="user_id"/>
            <CurrencyInCentsField source="amount"/>
            <TextField source="comment"/>
            <BooleanField source="revoked"/>
        </Datagrid>
    </List>
);
