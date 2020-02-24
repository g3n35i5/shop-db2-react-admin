import React from 'react';
import {
    BooleanInput,
    Create,
    maxLength,
    minLength,
    number,
    NumberInput,
    ReferenceArrayInput,
    required,
    SelectArrayInput,
    SimpleForm,
    TextInput
} from 'react-admin';

export const ProductCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" validate={[required(), minLength(2), maxLength(64)]}/>
            <TextInput source="barcode"/>
            <NumberInput label="Price in cents" source="price" validate={[number(), required()]}/>
            <BooleanInput source="countable" initialValue={true}/>
            <BooleanInput source="revocable" initialValue={true}/>
            <ReferenceArrayInput label="Tags" source="tags" reference="tags" validate={[required()]}>
                <SelectArrayInput optionText="name"/>
            </ReferenceArrayInput>
        </SimpleForm>
    </Create>
);
