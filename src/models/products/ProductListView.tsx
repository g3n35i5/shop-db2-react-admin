import * as React from 'react';
import {
    BooleanField,
    BooleanInput,
    ChipField,
    Datagrid,
    Filter,
    List,
    NumberField,
    ReferenceArrayField,
    SingleFieldList,
    TextInput
} from 'react-admin';
import {CurrencyInCentsField} from "../../shared/fields/CurrencyInCents";
import TimestampField from "../../shared/fields/TimestampField";
import {ProductWithImageField} from "./ProductReferenceField";
import {ProductBalance} from "./ProductBalance";
import {ProductStock} from "./ProductStock";


// Filters for the purchase list view
const ProductListFilter = (props: any) => (
    <Filter {...props}>
        <TextInput source="name" alwaysOn={true}/>
        <BooleanInput source="active" initialValue={true}/>
        <BooleanInput source="countable" initialValue={true}/>
        <BooleanInput source="revocable" initialValue={true}/>
    </Filter>
);

export const ProductList = (props: any) => (
    <List
        {...props}
        filters={<ProductListFilter/>}
        bulkActionButtons={false}>
        <Datagrid rowClick="edit">
            <NumberField source="id"/>
            <ProductWithImageField label="Name" sortBy="name"/>
            <CurrencyInCentsField source="price"/>
            <TimestampField source="creation_date"/>
            <ProductBalance label="Balance" sortable={false}/>
            <ProductStock label="Stock" sortable={false}/>
            <BooleanField source="active"/>
            <BooleanField source="countable"/>
            <BooleanField source="revocable"/>
            <ReferenceArrayField label="Tags" reference="tags" source="tags">
                <SingleFieldList>
                    <ChipField source="name"/>
                </SingleFieldList>
            </ReferenceArrayField>
        </Datagrid>
    </List>
);
