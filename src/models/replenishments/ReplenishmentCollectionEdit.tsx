import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {BooleanField, Edit, useDataProvider} from 'react-admin';
import MaterialTable from 'material-table';
import {makeStyles, withStyles} from "@material-ui/core/styles";
import ProductReferenceField from "../products/ProductReferenceField";
import {CurrencyInCentsField} from "../../shared/fields/CurrencyInCents";
import {tableIcons} from "../../shared/MaterialTableIcons";

import {Box, Table, TableRow, Typography} from '@material-ui/core';
import MuiTableCell from "@material-ui/core/TableCell";
import UserReferenceField from "../users/UserReferenceField";
import TimestampField from "../../shared/fields/TimestampField";
import {Account, Cash, ClockOutline, CommentText, Undo} from 'mdi-material-ui'
import {ToggleRevokeButton} from "../../shared/RevokeItem";

// Styles for all components
const useStyles = makeStyles({
    root: {
        padding: '1em'
    },
    table: {
        width: '100%',
    }
});

// Remove border from the overview table cells
const TableCell = withStyles({
    root: {
        borderBottom: "none"
    }
})(MuiTableCell);


const EditPanel = ({record, ...rest}) => {
    const [state, setState] = useState<any | null>({});
    const dataProvider = useDataProvider();
    const classes = useStyles();

    // This function reloads the collection on any update
    const reloadCollection = useCallback(async () => {
        const {data: collection} = await dataProvider.getOne('replenishmentcollections', {id: record.id});
        setState(state => ({
            ...state,
            collection: collection

        }));
    }, [dataProvider, record, state]);

    // Set the initial state
    useEffect(() => {
        setState(state => ({
            ...state,
            collection: record
        }));
    }, [record]);

    // Edit properties for the material-table
    const editable = {
        onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
                // Fix types...
                newData.amount = parseInt(newData.amount);
                newData.total_price = parseInt(newData.total_price);

                dataProvider.update('replenishments', {id: newData.id, data: newData, previousData: oldData})
                    .then(() => {
                        reloadCollection().then(() => resolve());
                    })
                    .catch(() => {
                        reject();
                    });
            })
    };

    return (
        <Box display="flex" px="1em" py="1em">
            <Box flex={1} mr="1em">
                {/*Left side: Information about the replenishment collection*/}
                <ReplenishmentCollectionDetails state={state} {...rest}/>
            </Box>
            <Box flex={2} mr="1em">
                {/*Right side: List of all replenished products*/}
                <Typography variant="h6" gutterBottom>List of replenished products</Typography>
                <MaterialTable
                    icons={tableIcons}
                    columns={[
                        {title: 'ID', field: 'id', type: 'numeric', editable: 'never', hidden: true},
                        {
                            title: 'Product',
                            field: 'product_id',
                            editable: 'never',
                            render: rowData => <ProductReferenceField record={rowData} source="product_id" {...rest}/>
                        },
                        {title: 'Amount', field: 'amount', type: 'numeric'},
                        {
                            title: 'Total price',
                            field: 'total_price',
                            type: 'numeric',
                            render: rowData => <CurrencyInCentsField record={rowData} source="total_price" {...rest}/>
                        },
                        {title: 'Revoked', field: 'revoked', type: 'boolean'},
                    ]}
                    data={state.collection?.replenishments}
                    editable={editable}
                    options={{
                        padding: 'dense',
                        pageSize: 10,
                        search: false,
                        toolbar: false
                    }}
                />
            </Box>
        </Box>
    )
};

// Left side component: Just a small overview over the replenishmentcollection
const ReplenishmentCollectionDetails = ({state, ...rest}) => {
    const classes = useStyles();

    return (
        <Fragment>
            <Typography variant="h6" gutterBottom>Overview</Typography>
            <Table className={classes.table} size="small">
                {/*Administrator*/}
                <TableRow>
                    <TableCell><Account/></TableCell>
                    <TableCell>Administrator</TableCell>
                    <TableCell>
                        <UserReferenceField record={state.collection}source="admin_id" {...rest} />
                    </TableCell>
                </TableRow>
                {/*Comment*/}
                <TableRow>
                    <TableCell><CommentText/></TableCell>
                    <TableCell>Comment</TableCell>
                    <TableCell>{state.collection?.comment}</TableCell>
                </TableRow>
                {/*Timestamp*/}
                <TableRow>
                    <TableCell><ClockOutline/></TableCell>
                    <TableCell>Timestamp</TableCell>
                    <TableCell><TimestampField record={state.collection} source="timestamp" {...rest} /></TableCell>
                </TableRow>
                {/*Price*/}
                <TableRow>
                    <TableCell><Cash/></TableCell>
                    <TableCell>Sum price</TableCell>
                    <TableCell>
                        <CurrencyInCentsField record={state.collection} source="price" {...rest} />
                    </TableCell>
                </TableRow>
                {/*Revoked*/}
                <TableRow>
                    <TableCell><Undo/></TableCell>
                    <TableCell>Revoke actions</TableCell>
                    <TableCell>
                        <ToggleRevokeButton record={state.collection} label="replenishmentcollection" resource="replenishmentcollections" {...rest} />
                    </TableCell>
                </TableRow>
            </Table>
        </Fragment>
    )
};

export const ReplenishmentCollectionEdit = props => {
    return (
        <Edit {...props}>
            <EditPanel {...props}/>
        </Edit>
    );
};
