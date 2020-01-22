import React from 'react';
import { Edit, SimpleForm, BooleanInput, TextInput, ReferenceInput, SelectInput} from 'react-admin';

export const UserEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="firstname" />
            <TextInput source="lastname" />
            <ReferenceInput source="rank_id" reference="ranks">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <BooleanInput source="is_admin" label="Administrator"/>
        </SimpleForm>
    </Edit>
);
