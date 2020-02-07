import React from 'react';
import {
    BooleanInput,
    Edit,
    SimpleForm,
    TextInput,
    required,
    minLength,
    maxLength, NumberInput, number
} from 'react-admin';

export const RankEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" validate={[required(), minLength(2), maxLength(32)]}/>
            <NumberInput label="Debt limit in cents" source="debt_limit" validate={[number()]}/>
            <BooleanInput source="is_system_user"/>
        </SimpleForm>
    </Edit>
);
