import * as React from "react";
import {NumberField, Datagrid, DateField, List, TextField} from "react-admin";
import UserReferenceField from "../users/UserReferenceField";
import ProductReferenceField from "../products/ProductReferenceField";
import DateFieldOptions from "../../shared/options/DateFieldOptions";
import {CurrencyInCentsField} from '../../shared/fields/CurrencyInCents';
// Mark all revoked purchases with a darker row background
const purchaseRowStyle = (record, index) => ({
    backgroundColor: record.revoked ? '#212121' : '',
});

// List view for the purchases
export const PurchaseList = (props: any) => (
    <List
        {...props}
        bulkActionButtons={false}
    >
        <Datagrid rowStyle={purchaseRowStyle}>
            <TextField source="id"/>
            <UserReferenceField/>
            <DateField source="timestamp" options={DateFieldOptions}/>
            <ProductReferenceField/>
            <NumberField source="amount"/>
            <CurrencyInCentsField source="productprice"/>
            <CurrencyInCentsField source="price"/>
        </Datagrid>
    </List>
);
