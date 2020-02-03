import * as React from "react";
import {Datagrid, DateField, List, NumberField, TextField} from "react-admin";
import {Redo, Undo} from 'mdi-material-ui'
import UserReferenceField from "../users/UserReferenceField";
import DateFieldOptions from "../../shared/options/DateFieldOptions";
import {CurrencyInCentsField} from '../../shared/fields/CurrencyInCents';
import { useUpdate, useNotify, useRefresh, Button } from 'react-admin';

// This component returns a button which toggles the deposit's revoke
const ToggleDepositRevokeButton = ({...props}) => {
    const notify = useNotify();
    const refresh = useRefresh();

    let label = props.record.revoked ? 'Undo revoke' : 'Revoke';
    let message = props.record.revoked ? 'The revoke has been undone' : 'Deposit has been revoked';
    let icon = props.record.revoked ? <Redo/> : <Undo/>;
    const [update, { loading, error }] = useUpdate(
        'deposits',
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
                    'Couldn\'t revoke the deposit',
                    'warning'
                );
            },
        });
    return <Button label={label} onClick={update} disabled={loading}>{icon}</Button>;
};

// Mark all revoked deposits with a darker row background
const depositRowStyle = (record, index) => ({
    backgroundColor: record.revoked ? '#212121' : '',
});

// List view for the deposits
export const DepositList = (props: any) => (
    <List
        {...props}
        bulkActionButtons={false}
        sort={{ field: 'id', order: 'DESC' }}
    >
        <Datagrid rowStyle={depositRowStyle}>
            <NumberField source="id"/>
            <DateField source="timestamp" options={DateFieldOptions}/>
            <UserReferenceField source="admin_id"/>
            <UserReferenceField source="user_id"/>
            <CurrencyInCentsField source="amount"/>
            <TextField source="comment"/>
            <ToggleDepositRevokeButton/>
        </Datagrid>
    </List>
);
