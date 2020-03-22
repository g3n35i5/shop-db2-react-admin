import React, {Fragment, useCallback, useState} from 'react';
import {
    Create,
    maxLength,
    minLength,
    NumberInput,
    required,
    SaveButton,
    TextInput,
    Toolbar,
    useCreate,
    useNotify,
    useRedirect
} from 'react-admin';
import MaterialTable, {Column} from 'material-table';
import {tableIcons} from "../../shared/MaterialTableIcons";
import {MaterialTableToolbar} from "../../shared/MaterialTableToolbar";
import {makeStyles} from "@material-ui/core/styles";
import ProductReferenceField from "../products/ProductReferenceField";
import {CurrencyInCentsField} from "../../shared/fields/CurrencyInCents";

import {Form} from 'react-final-form';
import {DateTimeInput} from 'react-admin-date-inputs';

import {Box, Paper, Typography} from '@material-ui/core';
import {ProductAutoComplete} from "../../shared/fields/ProductAutoComplete";
import {Replenishment, ReplenishmentCollection} from "./Replenishments";
import {UserAutoComplete} from "../../shared/fields/UserAutoComplete";

// Styles for all components
const useStyles = makeStyles({
    padding: {
        padding: "16px"
    },
    root: {
        paddingLeft: 0
    }
});

// This helper function returns whether the state is a valid replenishmentcollection.
const isValidCollection = (data: any | null) => {
    const isEmpty = !data;
    const hasNoComment = !data.hasOwnProperty('comment') || data.comment === null || data.comment === "";
    const hasNoSeller = !data.hasOwnProperty('seller_id') || data.seller_id === null || data.seller_id === "";
    const hasNoTimestamp = !data.hasOwnProperty('timestamp') || data.timestamp === null || data.timestamp === "";
    const hasNoReplenishments = (!data.hasOwnProperty('replenishments') ||
        (Array.isArray(data.replenishments) && data.replenishments.length === 0));

    return isEmpty || hasNoComment || hasNoSeller || hasNoTimestamp || hasNoReplenishments;
};


// Custom save button which alters the replenishmentcollection payload.
const CreateReplenishmentCollectionButton = ({state, ...props}) => {
    const [create] = useCreate('replenishmentcollections');
    const redirectTo = useRedirect();
    const notify = useNotify();
    const {basePath, redirect} = props;

    let handleClick = useCallback(() => {
        // Create replenishmentcollection
        let collection: ReplenishmentCollection = {
            comment: state.comment,
            timestamp: state.timestamp,
            seller_id: state.seller_id,
            replenishments: state.replenishments.map(r => parseReplenishment(r))
        };

        // Send the collection to the API.
        create(
            {
                payload: {data: collection},
            },
            {
                // Return to the list view on success.
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

    return <SaveButton disabled={isValidCollection(state)} {...props} handleSubmitWithRedirect={handleClick}/>;
};

// This helper function parses a material-table row entry to a replenishment.
const parseReplenishment = (row: any): Replenishment => {
    return {
        product_id: parseInt(row.product_id),
        amount: parseInt(row.amount),
        total_price: parseInt(row.total_price)
    };
};


// This is the main view for the create-replenishmentcollection view.
const CreatePanel = ({record, ...rest}) => {
    // Initial state: empty replenishmentcollection
    const [state, setState] = useState<ReplenishmentCollection>({
        timestamp: null,
        comment: null,
        seller_id: null,
        replenishments: []
    });

    const classes = useStyles();
    const notify = useNotify();

    // Edit properties for the material-table
    const editable = {
        // This method gets called each time a row entry gets added
        onRowAdd: newData =>
            new Promise((resolve, reject) => {
                // The product must only appear once in the list of replenishments.
                // Moreover, the amount must not be zero.
                const replenishment = parseReplenishment(newData);
                if (state.replenishments.map(r => r.product_id).indexOf(replenishment.product_id) !== -1) {
                    notify('This product has already been added', 'warning');
                    reject();
                } else if (replenishment.amount === 0) {
                    notify('The amount must not be zero', 'warning');
                    reject();
                } else {
                    setState(prevState => ({
                        ...prevState,
                        replenishments: [...prevState.replenishments, newData]
                    }));
                    resolve();
                }
            }),
        // This method gets called each time a row entry gets updated
        onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
                // Substitute the entry if it exist. Otherwise, throw a warning
                let data = state.replenishments;
                const index = data.indexOf(oldData);
                let isValid = true;

                // The entry must exist in the current list of replenishments in order to be editet.
                if (index === -1) {
                    notify('The entry you\'re trying to update does not exist', 'warning');
                    isValid = false;
                    reject();
                }
                // The product must only appear once in the list of replenishments.
                else if (oldData.product_id !== newData.product_id) {
                    if (data.map(r => r.product_id).indexOf(newData.product_id) !== -1) {
                        notify('This product has already been added', 'warning');
                        isValid = false;
                        reject();
                    }
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
                    setState(prevState => ({
                        ...prevState,
                        replenishments: data
                    }));
                    resolve();
                }
            }),
        // This method gets called each time a row entry gets deleted
        onRowDelete: oldData =>
            new Promise((resolve, reject) => {
                // Delete the entry if it exist. Otherwise, throw a warning
                let data = state.replenishments;
                const index = data.indexOf(oldData);
                if (index === -1) {
                    notify('The entry you\'re trying to update does not exist', 'warning');
                    reject();
                } else {
                    data.splice(index, 1);
                    setState(prevState => ({
                        ...prevState,
                        replenishments: data
                    }));
                    resolve();
                }
            })
    };

    // Column definitions for the material-table
    const columns: Column<any>[] = [
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
        },
        // Column for the total price
        {
            title: 'Total price',
            field: 'total_price',
            type: 'numeric',
            editComponent: props => (
                <Form
                    onSubmit={() => {
                    }}
                    render={({form, values, invalid}) => {
                        return (
                            <NumberInput initialValue={props.value} fullWidth source="total_price"
                                         label="Total price in cents"
                                         validate={[required()]}
                                         onChange={e => props.onChange(e.target.value)}/>)
                    }}>
                </Form>
            ),
            render: rowData => <CurrencyInCentsField record={rowData}
                                                     source="total_price" {...rest}/>
        }
    ];

    // Override default material-table components
    const components = {
        Container: props => <Paper {...props} elevation={0}/>, // No "paper" background (elevation) for the table
        Toolbar: props => <MaterialTableToolbar {...props} />
    };

    return (
        <Fragment>
            <Box className={classes.padding}>
                {/* Comment and timestamp for the replenishment collection */}
                <ReplenishmentCollectionDetails state={state} setState={setState} {...rest}/>
                {/* Add replenishments with the material-table */}
                <MaterialTable
                    title="List of replenished products"
                    icons={tableIcons}
                    columns={columns}
                    data={state?.replenishments}
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
                <CreateReplenishmentCollectionButton
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

// Left side component: Just a small ProductOverview over the replenishmentcollection
const ReplenishmentCollectionDetails = ({state, setState, ...rest}) => {
    const classes = useStyles();

    // Calculates the sum of all replenishments
    const getReplenishmentSum = (): number => {
        if (state.replenishments && state.replenishments.length > 0) {
            return state.replenishments.map(r => parseInt(r.total_price)).reduce((a, b) => {
                return a + b
            });
        }
        return 0;
    };

    const validateComment = [required(), minLength(4), maxLength(64)];
    const validateTimestamp = [required()];

    // Each time the value of the TextInput (Comment) changes, the state gets updated
    const handleCommentChange = (event => setState(prevState => ({
        ...prevState, comment: event.target.value
    })));

    // Each time the value of the UserInput (Seller) changes, the state gets updated
    const handleSellerChange = (seller_id => setState(prevState => ({
        ...prevState, seller_id: seller_id
    })));

    // Each time the value of the DateTimeInput (Timestamp) changes, the state gets updated
    const handleTimestampChange = (timestamp => setState(prevState => ({
        ...prevState, timestamp: timestamp
    })));

    return (
        <Form
            onSubmit={() => {
            }}
            render={({form, values, invalid}) => {
                return (
                    <form>
                        <Typography variant="h6" gutterBottom>Comment and Timestamp</Typography>
                        <TextInput
                            onChange={handleCommentChange}
                            source="comment"
                            validate={validateComment}
                            fullWidth/>
                        <UserAutoComplete fullWidth source="seller_id" onChange={handleSellerChange}/>
                        <DateTimeInput
                            source="timestamp"
                            label="Timestamp"
                            fullWidth
                            onChange={handleTimestampChange}
                            validate={validateTimestamp}
                            options={{
                                disableFuture: true,
                                format: 'dd.MM.yyyy, HH:mm',
                                ampm: false,
                                clearable: true
                            }}/>
                        <Box mt="8px">
                            Sum: <CurrencyInCentsField record={getReplenishmentSum()}/>
                        </Box>
                    </form>
                );
            }}/>
    )
};

export const ReplenishmentCollectionCreate = props => {
    return (
        <Create {...props}>
            <CreatePanel {...props}/>
        </Create>
    );
};
