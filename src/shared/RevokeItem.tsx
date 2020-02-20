import {Button, useNotify, useRefresh, useUpdate} from "react-admin";
import {Redo, Undo} from "mdi-material-ui";
import * as React from "react";

export const ToggleRevokeButton = ({record, label, resource, ...props}) => {
    const notify = useNotify();
    const refresh = useRefresh();

    let buttonText = record?.revoked ? 'Undo revoke' : 'Revoke';
    let message = record?.revoked ? 'The revoke has been undone' : `${label} has been revoked`;
    let icon = record?.revoked ? <Redo/> : <Undo/>;
    const [update, { loading, error }] = useUpdate(
        resource,
        record?.id,
        { revoked: !record?.revoked },
        record,
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
                    `Couldn't revoke the ${label}`,
                    'warning'
                );
            },
        });
    return <Button label={buttonText} onClick={update} disabled={loading}>{icon}</Button>;
};
