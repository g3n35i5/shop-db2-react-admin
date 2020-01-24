import * as React from 'react';
import {
    List,
    Datagrid,
    TextField,
    DateField,
    NumberField,
    BooleanField,
    ReferenceArrayField,
    SingleFieldList,
    ChipField,
} from 'react-admin';
import {CurrencyInCentsField} from "../../shared/fields/CurrencyInCents";
import DateFieldOptions from "../../shared/options/DateFieldOptions";


export const ProductList = (props: any) => (
    <List
        {...props}
        bulkActionButtons={false}>
        <Datagrid>
            <NumberField source="id" />
            <TextField source="name" />
            <CurrencyInCentsField source="price"/>
            <DateField source="creation_date" options={DateFieldOptions}/>
            <TextField source="barcode" />
            <BooleanField source="active" />
            <BooleanField source="countable" />
            <BooleanField source="revocable" />
            <ReferenceArrayField label="Tags" reference="tags" source="tags">
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceArrayField>
        </Datagrid>
    </List>
);
