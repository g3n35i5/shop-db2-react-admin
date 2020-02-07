import React from 'react';
import {AutocompleteInput, Create, NumberInput, ReferenceInput, required, SimpleForm} from 'react-admin';
import {UserAutoComplete} from "../../shared/fields/UserAutoComplete";
import {DateTimeInput} from 'react-admin-date-inputs';

export const PurchaseCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput label="User" source="user_id" reference="users">
                <UserAutoComplete/>
            </ReferenceInput>
            <ReferenceInput label="Product" source="product_id" reference="products">
                <AutocompleteInput optionText="name"/>
            </ReferenceInput>
            <NumberInput source="amount" validate={[required()]}/>
            <DateTimeInput source="timestamp" label="Optional: Timestamp"
                           options={{disableFuture: true, format: 'dd.MM.yyyy, HH:mm', ampm: false, clearable: true}}/>
        </SimpleForm>
    </Create>
);
