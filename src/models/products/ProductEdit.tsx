import React from 'react';
import {
    BooleanInput,
    Edit,
    ImageField,
    ImageInput, number, NumberInput,
    ReferenceArrayInput,
    required,
    SelectArrayInput,
    SimpleForm,
    TextInput
} from 'react-admin';

export const ProductEdit = props => (
    <Edit undoable={false} {...props}>
        <SimpleForm>
            <ImageInput source="imagename" label="New image" accept="image/*">
                <ImageField source="src" title="title"/>
            </ImageInput>
            <TextInput source="name" validate={[required()]}/>
            <NumberInput label="Price in cents" source="price" validate={[number(), required()]}/>
            <TextInput source="barcode"/>
            <BooleanInput source="active" validate={[required()]}/>
            <BooleanInput source="countable" validate={[required()]}/>
            <BooleanInput source="revocable" validate={[required()]}/>
            <ReferenceArrayInput label="Tags" source="tags" reference="tags" validate={[required()]}>
                <SelectArrayInput optionText="name"/>
            </ReferenceArrayInput>
        </SimpleForm>
    </Edit>
);
