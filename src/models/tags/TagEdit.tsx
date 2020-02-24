import React from 'react';
import {BooleanInput, Edit, maxLength, minLength, required, SimpleForm, TextInput} from 'react-admin';

export const TagEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" validate={[required(), minLength(2), maxLength(24)]}/>
            <BooleanInput source="is_for_sale" validate={[required()]}/>
        </SimpleForm>
    </Edit>
);
