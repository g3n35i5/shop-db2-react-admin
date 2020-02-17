import React from 'react';
import {BooleanInput, Edit, SimpleForm, TextInput, ReferenceArrayInput, SelectArrayInput, required} from 'react-admin';

export const ProductEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" validate={[required()]}/>
            <TextInput source="barcode"/>
            <BooleanInput source="active" validate={[required()]}/>
            <BooleanInput source="countable" validate={[required()]}/>
            <BooleanInput source="revocable" validate={[required()]}/>
            <ReferenceArrayInput label="Tags" source="tags" reference="tags" validate={[required()]}>
                <SelectArrayInput optionText="name" />
            </ReferenceArrayInput>
        </SimpleForm>
    </Edit>
);
