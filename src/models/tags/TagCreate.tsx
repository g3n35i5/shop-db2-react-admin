import React from 'react';
import {BooleanInput, Create, maxLength, minLength, required, SimpleForm, TextInput} from 'react-admin';

export const TagCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" validate={[required(), minLength(2), maxLength(24)]}/>
            <BooleanInput source="is_for_sale" initialValue={true} validate={[required()]}/>
        </SimpleForm>
    </Create>
);
