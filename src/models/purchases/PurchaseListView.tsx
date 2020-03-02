import * as React from "react";
import {
    Datagrid,
    Filter,
    List,
    NumberField,
    BooleanField
} from "react-admin";
import UserReferenceField from "../users/UserReferenceField";
import ProductReferenceField from "../products/ProductReferenceField";
import {CurrencyInCentsField} from '../../shared/fields/CurrencyInCents';
import TimestampField from "../../shared/fields/TimestampField";
import {UserAutoComplete} from "../../shared/fields/UserAutoComplete";
import {ProductAutoComplete} from "../../shared/fields/ProductAutoComplete";

// Filters for the purchase list view
const PurchaseListFilter = (props: any) => (
    <Filter {...props}>
        <ProductAutoComplete alwaysOn={true}/>
        <UserAutoComplete alwaysOn={true}/>
    </Filter>
);

// List view for the purchases
export const PurchaseList = (props: any) => (
    <List
        {...props}
        bulkActionButtons={false}
        filters={<PurchaseListFilter/>}
        sort={{field: 'timestamp', order: 'DESC'}}
    >
        <Datagrid rowClick="edit">
            <NumberField source="id"/>
            <UserReferenceField source="user_id"/>
            <UserReferenceField source="admin_id" label="Admin"/>
            <TimestampField source="timestamp"/>
            <ProductReferenceField/>
            <NumberField source="amount"/>
            <CurrencyInCentsField source="productprice"/>
            <CurrencyInCentsField source="price" sortable={false}/>
            <BooleanField source="revoked"/>
        </Datagrid>
    </List>
);
