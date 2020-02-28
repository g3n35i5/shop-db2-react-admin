import React from 'react';
import {
    BooleanInput,
    NumberInput,
    Edit,
    required,
    SimpleForm,
} from 'react-admin';

const validateRevoked = [required()];
const validateAmount = [required()];


export const PurchaseEdit = props => (
    <Edit undoable={false} {...props}>
        <SimpleForm {...props}>
            <NumberInput source="amount" validate={validateAmount}/>
            <BooleanInput source="revoked" validate={validateRevoked}/>
        </SimpleForm>
    </Edit>
);
