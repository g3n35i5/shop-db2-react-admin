import React from 'react';
import {
    BooleanInput,
    Edit,
    maxLength,
    minLength,
    number,
    NumberInput,
    required,
    SimpleForm,
    TextInput
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
