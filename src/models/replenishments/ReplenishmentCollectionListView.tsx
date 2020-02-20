import * as React from "react";
import {
    BooleanInput,
    Datagrid,
    Filter,
    List,
    NumberField,
    ReferenceInput,
    BooleanField,
    TextField, useNotify, useRefresh, useUpdate, Button, TextInput
} from "react-admin";

import UserReferenceField from "../users/UserReferenceField";
import TimestampField from "../../shared/fields/TimestampField";
import {UserAutoComplete} from "../../shared/fields/UserAutoComplete";
import {CurrencyInCentsField} from "../../shared/fields/CurrencyInCents";
import {Redo, Undo} from "mdi-material-ui";

const ToggleReplenishmentCollectionRevokeButton = ({...props}) => {
    const notify = useNotify();
    const refresh = useRefresh();

    let label = props.record.revoked ? 'Undo revoke' : 'Revoke';
    let message = props.record.revoked ? 'The revoke has been undone' : 'Replenishmentcollection has been revoked';
    let icon = props.record.revoked ? <Redo/> : <Undo/>;
    const [update, { loading, error }] = useUpdate(
        'replenishmentcollections',
        props.record.id,
        { revoked: !props.record.revoked },
        props.record,
        {
            onSuccess: () => {
                notify(
                    message,
                    'info',
                    {},
                    false
                );
                refresh()
            },
            onFailure: () => {
                notify(
                    'Couldn\'t revoke the replenishmentcollection',
                    'warning'
                );
            },
        });
    return <Button label={label} onClick={update} disabled={loading}>{icon}</Button>;
};


// Mark all revoked purchases with a darker row background
const ReplenishmentCollectionRowStyle = (record, index) => ({
    backgroundColor: record.revoked ? '#212121' : '',
});

// Filters for the purchase list view
const ReplenishmentCollectionListFilter = (props: any) => (
    <Filter {...props}>
        <TextInput label="Comment" source="comment" alwaysOn={true}/>
        <ReferenceInput label="Administrator" source="admin_id" reference="users">
            <UserAutoComplete/>
        </ReferenceInput>
        <BooleanInput source="revoked" initialValue={false}/>
    </Filter>
);

// List view for the purchases
export const ReplenishmentCollectionList = (props: any) => (
    <List
        {...props}
        bulkActionButtons={false}
        filters={<ReplenishmentCollectionListFilter/>}
        sort={{ field: 'timestamp', order: 'DESC' }}
    >
        <Datagrid rowStyle={ReplenishmentCollectionRowStyle} rowClick="edit">
            <NumberField source="id"/>
            <TimestampField source="timestamp"/>
            <UserReferenceField source="admin_id"/>
            <TextField source="comment"/>
            <CurrencyInCentsField source="price"/>
            <ToggleReplenishmentCollectionRevokeButton/>
        </Datagrid>
    </List>
);
