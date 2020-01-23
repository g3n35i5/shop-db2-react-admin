import React from 'react';
import { Create, SimpleForm, TextInput, PasswordInput } from 'react-admin';

const validateUserCreation = (values) => {
    const errors = {};
    if (!values.lastname) {
        errors['lastname'] = ['The lastname is required'];
    }
    if (values.password !== values.password_repeat) {
        errors['password'] = ['The passwords do not match'];
        errors['password_repeat'] = ['The passwords do not match'];
    }
    return errors
};

export const UserCreate = (props) => (
    <Create {...props}>
        <SimpleForm validate={validateUserCreation}>
            <TextInput source="firstname" label="Firstname" />
            <TextInput source="lastname" label="Lastname" />
            <PasswordInput source="password" label="Password" />
            <PasswordInput source="password_repeat" label="Password repeat" />
        </SimpleForm>
    </Create>
);
