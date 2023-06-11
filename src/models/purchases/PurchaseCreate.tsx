import React, {Fragment, useCallback, useState} from 'react';
import {Create, NumberInput, required, SaveButton, Toolbar, useCreate, useNotify, useRedirect} from 'react-admin';
import {DateTimeInput} from 'react-admin-date-inputs';
import {Box, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Form} from 'react-final-form';
import {UserAutoComplete} from "../../shared/fields/UserAutoComplete";
import {ProductAutoComplete} from "../../shared/fields/ProductAutoComplete";
import UserReferenceField from "../users/UserReferenceField";
import ProductReferenceField from "../products/ProductReferenceField";
import MaterialTable, {Column} from 'material-table';
import {tableIcons} from "../../shared/MaterialTableIcons";
import {MaterialTableToolbar} from "../../shared/MaterialTableToolbar";
import {Purchase} from "./PurchaseInterface";
import TimestampField from "../../shared/fields/TimestampField";

/**
 * This component does not exactly follow the guidelines of the framework "react-admin", but as far as
 * I can judge, the framework does not offer an easier way to implement the features provided here
 * (or to implement them in "short")
 */


const useStyles = makeStyles(theme => ({
    container: {
        maxHeight: '600px'
    },
    button: {
        marginTop: 8,
    },
    padding: {
        padding: "16px"
    },
}));


// This helper function returns whether a given array is invalid, i.e. it is null or empty.
const isInvalidData = (data: any[] | null) => {
    return !data || (Array.isArray(data) && data.length === 0);
};

// Custom save button which alters the purchase payload.
const CreatePurchasesButton = ({state, ...props}) => {
    const [create] = useCreate('purchases');
    const redirectTo = useRedirect();
    const notify = useNotify();
    const {basePath, redirect} = props;

    let handleClick = useCallback(() => {
        // Create purchases
        create(
            {
                payload: {data: state.map(p => parsePurchase(p))},
            },
            {
                onSuccess: ({data: newRecord}) => {
                    notify('ra.notification.created', 'info', {
                        smart_count: 1,
                    });
                    redirectTo(redirect, basePath, newRecord.id, newRecord);
                },
            }
        );

    }, [
        state,
        create,
        notify,
        redirectTo,
        redirect,
        basePath,
    ]);

    return <SaveButton disabled={isInvalidData(state)} {...props} handleSubmitWithRedirect={handleClick}/>;
};

// This helper function parses a material-table row entry to a replenishment.
const parsePurchase = (row: any): Purchase => {
    return {
        product_id: parseInt(row.product_id),
        amount: parseInt(row.amount),
        user_id: parseInt(row.user_id),
        timestamp: row.timestamp ? row.timestamp : undefined
    };
};

// This is the main view for the create-replenishmentcollection view.
const CreatePanel = ({record, ...rest}) => {
    // Initial state: empty replenishmentcollection
    const [state, setState] = useState<Purchase[]>([]);

    const classes = useStyles();
    const notify = useNotify();

    // Edit properties for the material-table
    const editable = {
        // This method gets called each time a row entry gets added
        onRowAdd: newData =>
            new Promise<void>((resolve, reject) => {
                // The product must only appear once in the list of replenishments.
                // Moreover, the amount must not be zero.
                const purchase = parsePurchase(newData);
                if (purchase.amount === 0) {
                    notify('The amount must not be zero', 'warning');
                    reject();
                } else {
                    setState(prevState => ([...prevState, newData]));
                    resolve();
                }
            }),
        // This method gets called each time a row entry gets updated
        onRowUpdate: (newData, oldData) =>
            new Promise<void>((resolve, reject) => {
                // Substitute the entry if it exist. Otherwise, throw a warning
                let data = state;
                const index = data.indexOf(oldData);
                let isValid = true;

                // The entry must exist in the current list of replenishments in order to be editet.
                if (index === -1) {
                    notify('The entry you\'re trying to update does not exist', 'warning');
                    isValid = false;
                    reject();
                }
                // The amount must not be zero.
                else if (newData.amount === 0) {
                    notify('The amount must not be zero', 'warning');
                    isValid = false;
                    reject();
                }
                // All valid. Go for it!
                if (isValid) {
                    data[index] = newData;
                    setState(() => (data));
                    resolve();
                }
            }),
        // This method gets called each time a row entry gets deleted
        onRowDelete: oldData =>
            new Promise<void>((resolve, reject) => {
                // Delete the entry if it exist. Otherwise, throw a warning
                let data = state;
                const index = data.indexOf(oldData);
                if (index === -1) {
                    notify('The entry you\'re trying to update does not exist', 'warning');
                    reject();
                } else {
                    data.splice(index, 1);
                    setState(prevState => (data));
                    resolve();
                }
            })
    };

    // Column definitions for the material-table
    const columns: Column<any>[] = [
        // Column for the users
        {
            title: 'User',
            field: 'user_id',
            sorting: false,
            editComponent: props => (
                <Form
                    onSubmit={() => {
                    }}
                    render={({form, values, invalid}) => {
                        return (
                            <UserAutoComplete initialValue={props.value} fullWidths
                                              validate={[required()]}
                                              onChange={e => props.onChange(e)}/>
                        )
                    }}>
                </Form>
            ),
            render: rowData => <UserReferenceField record={rowData}
                                                   fullWidth
                                                   source="user_id" {...rest}/>
        },
        // Column for the products
        {
            title: 'Product',
            field: 'product_id',
            sorting: false,
            editComponent: props => (
                <Form
                    onSubmit={() => {
                    }}
                    render={({form, values, invalid}) => {
                        return (
                            <ProductAutoComplete initialValue={props.value} fullWidth
                                                 validate={[required()]}
                                                 onChange={e => props.onChange(e)}/>
                        )
                    }}>
                </Form>
            ),
            render: rowData => <ProductReferenceField record={rowData}
                                                      fullWidth
                                                      source="product_id" {...rest}/>
        },
        // Column for the timestamp
        {
            title: 'Timestamp',
            field: 'timestamp',
            editComponent: props => (
                <Form
                    onSubmit={() => {
                    }}
                    render={({form, values, invalid}) => {
                        return (<DateTimeInput
                            source="timestamp"
                            label="Timestamp"
                            fullWidth
                            onChange={timestamp => props.onChange(timestamp)}
                            options={{
                                disableFuture: true,
                                format: 'dd.MM.yyyy, HH:mm',
                                ampm: false,
                                clearable: true
                            }}/>)
                    }}>
                </Form>
            ),
            render: rowData => <TimestampField record={rowData} source="timestamp"/>
        },
        // Column for the amount
        {
            title: 'Amount',
            field: 'amount',
            type: 'numeric',
            editComponent: props => (
                <Form
                    onSubmit={() => {
                    }}
                    render={({form, values, invalid}) => {
                        return (<NumberInput initialValue={props.value} fullWidth source="amount"
                                             validate={[required()]}
                                             onChange={e => props.onChange(e.target.value)}/>)
                    }}>
                </Form>
            ),
        }
    ];

    // Override default material-table components
    const components = {
        Container: props => <Paper {...props} elevation={0}/>, // No "paper" background (elevation) for the table
        Toolbar: props => <MaterialTableToolbar {...props} />
    };

    return (
        <Fragment>
            {/* Add purchases with the material-table */}
            <Box className={classes.padding}>
                <MaterialTable
                    title="Add user purchases"
                    icons={tableIcons}
                    columns={columns}
                    data={state}
                    components={components}
                    editable={editable}
                    options={{
                        padding: 'dense',
                        pageSize: 5,
                        search: false,
                        toolbar: true
                    }}
                />
            </Box>

            <Toolbar {...rest}>
                <CreatePurchasesButton
                    handleSubmitWithRedirect
                    label="ra.action.save"
                    redirect="show"
                    state={state}
                    submitOnEnter={true}
                />
            </Toolbar>
        </Fragment>
    )
};

export const PurchaseCreate = props => {
    return (
        <Create {...props}>
            <CreatePanel {...props}/>
        </Create>
    );
};
