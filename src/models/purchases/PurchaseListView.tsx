import * as React from "react";
import {Datagrid, List, NumberField, TextField} from "react-admin";
import {Redo, Undo} from 'mdi-material-ui'
import UserReferenceField from "../users/UserReferenceField";
import ProductReferenceField from "../products/ProductReferenceField";
import {CurrencyInCentsField} from '../../shared/fields/CurrencyInCents';
import { useUpdate, useNotify, useRefresh, Button } from 'react-admin';
import TimestampField from "../../shared/fields/TimestampField";


const TogglePurchaseRevokeButton = ({...props}) => {
    const notify = useNotify();
    const refresh = useRefresh();

    let label = props.record.revoked ? 'Undo revoke' : 'Revoke';
    let message = props.record.revoked ? 'The revoke has been undone' : 'Purchase has been revoked';
    let icon = props.record.revoked ? <Redo/> : <Undo/>;
    const [update, { loading, error }] = useUpdate(
        'purchases',
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
                    'Couldn\'t revoke the purchase',
                    'warning'
                );
            },
        });
    return <Button label={label} onClick={update} disabled={loading}>{icon}</Button>;
};

// Mark all revoked purchases with a darker row background
const purchaseRowStyle = (record, index) => ({
    backgroundColor: record.revoked ? '#212121' : '',
});

// List view for the purchases
export const PurchaseList = (props: any) => (
    <List
        {...props}
        bulkActionButtons={false}
        sort={{ field: 'timestamp', order: 'DESC' }}
    >
        <Datagrid rowStyle={purchaseRowStyle}>
            <NumberField source="id"/>
            <UserReferenceField/>
            <TimestampField source="creation_date"/>
            <ProductReferenceField/>
            <NumberField source="amount"/>
            <CurrencyInCentsField source="productprice"/>
            <CurrencyInCentsField source="price"/>
            <TogglePurchaseRevokeButton/>
        </Datagrid>
    </List>
);
