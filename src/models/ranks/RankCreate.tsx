import React from 'react';
import {
    BooleanInput,
    Create,
    maxLength,
    minLength,
    number,
    NumberInput,
    required,
    SimpleForm,
    TextInput
} from 'react-admin';

export const RankCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" validate={[required(), minLength(2), maxLength(32)]}/>
            <NumberInput label="Debt limit in cents" source="debt_limit" validate={[number()]}/>
            <BooleanInput source="is_system_user" initialValue={false}/>
        </SimpleForm>
    </Create>
);
