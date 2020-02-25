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

import {PreviewImage} from "../../shared/Image";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    imageInput: {
        maxWidth: '256px'
    }
}));

const ProductEditForm = ({record, ...props}) => {
    const classes = useStyles();
    return (
        <SimpleForm record={record} {...props}>
            <PreviewImage record={record} label="Current image"/>
            <ImageInput className={classes.imageInput} maxSize={4000000} source="imagename" label="New image" accept="image/*">
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
    );
};

export const ProductEdit = props => (
    <Edit undoable={false} {...props}>
        <ProductEditForm {...props}/>
    </Edit>
);
