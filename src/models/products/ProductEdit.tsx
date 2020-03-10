import React from 'react';
import {
    BooleanInput,
    Edit,
    number,
    NumberInput,
    ReferenceArrayInput,
    required,
    SelectArrayInput,
    SimpleForm,
    TextInput
} from 'react-admin';
import {EditableImage} from "../../shared/fields/EditableImageField";


const ProductEditForm = ({record, ...props}) => {
    return (
        <SimpleForm record={record} {...props}>
            <EditableImage record={record} source="imagename" {...props} label="Product image (Use the upload button to edit)"/>
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
    );
};

export const ProductEdit = props => (
    <Edit undoable={false} {...props}>
        <ProductEditForm {...props}/>
    </Edit>
);
