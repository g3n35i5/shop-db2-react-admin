import React from 'react';
import {
    Edit,
    SimpleForm,
    BooleanInput,
    TextInput,
    ReferenceInput,
    SelectInput,
    PasswordInput,
    minLength,
    maxLength,
    required
} from 'react-admin';

const customPasswordValidator = (value, allValues) => {
    if (value && allValues.password_repeat) {
        if (value !== allValues.password_repeat) {
            return 'Passwords do not match';
        }
    }
    return [];
};

const customRepeatPasswordValidator = (value, allValues) => {
    if (value && allValues.password) {
        if (value !== allValues.password) {
            return 'Passwords do not match';
        }
    }
    return [];
};

const validateFirstName = [minLength(2), maxLength(32)];
const validateLastName = [required(), minLength(2), maxLength(32)];
const validatePassword = [minLength(6), customPasswordValidator];
const validateRepeatPassword = [minLength(6), customRepeatPasswordValidator];

export const UserEdit = props => (
    <Edit undoable={false} {...props}>
        <SimpleForm>
            <TextInput source="firstname" validate={validateFirstName}/>
            <TextInput source="lastname" validate={validateLastName}/>
            <ReferenceInput source="rank_id" reference="ranks">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <BooleanInput source="is_admin" label="Administrator"/>
            <PasswordInput source="password" label="Password" validate={validatePassword}/>
            <PasswordInput source="password_repeat" label="Password repeat" validate={validateRepeatPassword}/>
        </SimpleForm>
    </Edit>
);
