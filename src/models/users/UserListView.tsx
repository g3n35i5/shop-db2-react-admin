import * as React from 'react';

import {
    ChipField,
    Datagrid,
    DeleteButton,
    EditButton,
    Filter,
    List,
    ReferenceField,
    ReferenceInput,
    BooleanInput,
    SelectInput,
    TextField,
    NumberField,
    TextInput
} from 'react-admin';
import TimestampField from "../../shared/fields/TimestampField";
import {CurrencyInCentsField} from "../../shared/fields/CurrencyInCents";


// Filters for the user list view
const UserListFilter = (props: any) => (
    <Filter {...props}>
        <TextInput label="Firstname" source="firstname" alwaysOn={true}/>
        <TextInput label="Lastname" source="lastname" alwaysOn={true}/>
        <ReferenceInput source="rank_id" reference="ranks">
            <SelectInput optionText="name"/>
        </ReferenceInput>
        <BooleanInput source="is_verified" initialValue={true}/>
    </Filter>
);

// This custom field returns the delete button for the element if the condition matches (negated!)
const ConditionalDeleteField = ({ condition, undoable = false, ...data }) => {
    if (data && data.record && condition && data.record.hasOwnProperty(condition) && !data.record[condition] ) {
        return <DeleteButton undoable={undoable} {...data}/>;
    }
    return null;
};

// List view for the users
export const UserList = (props: any) => (
    <List
        {...props}
        filters={<UserListFilter/>}
        bulkActionButtons={false}
    >
        <Datagrid>
            <NumberField source="id"/>
            <TextField source="firstname"/>
            <TextField source="lastname"/>
            <TimestampField source="creation_date"/>
            <TimestampField source="verification_date"/>
            <CurrencyInCentsField source="credit"/>
            <ReferenceField label="Rank" source="rank_id" reference="ranks" sortable={false}>
                <ChipField source="name"/>
            </ReferenceField>
            <EditButton/>
            <ConditionalDeleteField condition="verification_date"/>
        </Datagrid>
    </List>
);
