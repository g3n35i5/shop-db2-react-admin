import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {
    BooleanInput,
    Edit,
    maxLength,
    minLength,
    NumberInput,
    required,
    SaveButton,
    TextInput,
    Toolbar,
    useDataProvider,
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
import {deepCompare} from "../../shared/compare";
import {Box, Paper, Typography} from '@material-ui/core';
import {Replenishment} from "./Replenishments";
import UserReferenceField from "../users/UserReferenceField";

// Styles for all components
const useStyles = makeStyles({
    padding: {
        padding: "16px"
    },
    root: {
        paddingLeft: 0
    }
});

// This helper function returns whether to hide the save button.
const saveButtonDisabled = (data: any | null) => {
    const isEmpty = !data || !data.hasOwnProperty('collection');
    const hasNoComment = !data.hasOwnProperty('comment') || data.comment === null || data.comment === "";
    const hasNoTimestamp = !data.hasOwnProperty('timestamp') || data.timestamp === null || data.timestamp === "";

    // Check whether anything has changed.
    const previousData = {
        comment: data.collection.comment,
        timestamp: data.collection.timestamp,
        revoked: data.collection.revoked
    };
    const newData = {
        comment: data.comment,
        timestamp: data.timestamp,
        revoked: data.revoked
    };
    const nothingChanged = deepCompare(previousData, newData);

    return isEmpty || hasNoComment || hasNoTimestamp || nothingChanged;
};


// Custom save button which alters the replenishmentcollection payload.
const EditReplenishmentCollectionButton = ({state, dataProvider, ...props}) => {
    const notify = useNotify();
    const redirect = useRedirect();

    let handleClick = useCallback(() => {
        const previousData = {
            comment: state.collection.comment,
            timestamp: state.collection.timestamp,
            revoked: state.collection.revoked
        };
        const data = {
            comment: state.comment,
            timestamp: state.timestamp,
            revoked: state.revoked
        };

        // Update replenishmentcollection
        dataProvider.update('replenishmentcollections', {
            id: state.collection.id,
            data: data,
            previousData: previousData
        })
            .then(({data}) => {
                redirect('/replenishmentcollections');
            })
            .catch(error => {
                notify(error, 'warning');
            })

    }, [
        state,
        dataProvider,
        notify
    ]);

    return <SaveButton disabled={saveButtonDisabled(state)} {...props} handleSubmitWithRedirect={handleClick}/>;
};

// This helper function parses a material-table row entry to a replenishment.
const parseReplenishment = (row: any): Replenishment => {
    return {
        product_id: parseInt(row.product_id),
        amount: parseInt(row.amount),
        total_price: parseInt(row.total_price)
    };
};


// This is the main view for the edit-replenishmentcollection view.
const EditPanel = ({record, ...rest}) => {
    // Initial state: record or undefined
    const [state, setState] = useState<any>({
        collection: record,
        comment: record.comment,
        timestamp: record.timestamp,
        revoked: record.revoked
    });

    useEffect(() => {
        setState(() => ({
            collection: record,
            comment: record.comment,
            timestamp: record.timestamp,
            revoked: record.revoked
        }));
    }, [record]);

    const dataProvider = useDataProvider();

    // This function reloads the collection on any update
    const reloadCollection = useCallback(async () => {
        const {data: collection} = await dataProvider.getOne('replenishmentcollections', {id: record.id});
        setState(() => ({
            collection: collection,
            comment: collection.comment,
            timestamp: collection.timestamp,
            revoked: collection.revoked
        }));
    }, [dataProvider, record]);


    const classes = useStyles();
    const notify = useNotify();

    // Edit properties for the material-table
    const editable = {
        // This method gets called each time a row entry gets updated
        onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
                const replenishment = parseReplenishment(newData);
                if (replenishment.amount === 0) {
                    notify('The amount must not be zero', 'warning');
                    reject();
                }

                dataProvider.update('replenishments', {id: oldData.id, data: newData, previousData: oldData})
                    .then(({data}) => {
                        reloadCollection().then(() => resolve());
                    })
                    .catch(error => {
                        notify(error, 'warning');
                        reject();
                    })
            }),
    };

    // Column definitions for the material-table
    const columns: Column<any>[] = [
        // Column for the products
        {
            title: 'Product',
            field: 'product_id',
            sorting: false,
            editable: 'never',
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
        },
        // Column for the revoked state
        {
            title: 'Revoked',
            field: 'revoked',
            type: 'boolean',
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
                    data={state.collection?.replenishments}
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
                <EditReplenishmentCollectionButton
                    {...rest}
                    handleSubmitWithRedirect
                    dataProvider={dataProvider}
                    label="ra.action.save"
                    redirect="show"
                    state={state}
                    submitOnEnter={false}
                />
            </Toolbar>
        </Fragment>
    )
};

// Metadata for the replenishmentcollection (Comment, Timestamp)
const ReplenishmentCollectionDetails = ({state, setState, ...rest}) => {

    // Calculates the sum of all replenishments
    const getReplenishmentSum = (): number => {
        if (state.collection && state.collection.replenishments?.length > 0) {
            const filtered = state.collection.replenishments.filter(r => !r.revoked);
            return filtered.map(r => parseInt(r.total_price)).reduce((a, b) => {
                return a + b
            });
        }
        return 0;
    };

    const validateComment = [required(), minLength(4), maxLength(64)];
    const validateTimestamp = [required()];
    const validateRevoked = [required()];

    // Each time the value of the TextInput (Comment) changes, the state gets updated
    const handleCommentChange = (event => setState(prevState => ({
        ...prevState, comment: event.target.value
    })));

    // Each time the value of the DateTimeInput (Timestamp) changes, the state gets updated
    const handleTimestampChange = (timestamp => setState(prevState => ({
        ...prevState, timestamp: timestamp
    })));

    // Each time the value of the BooleanInput (Revoked) changes, the state gets updated
    const handleRevokedChange = (value => setState(prevState => ({
        ...prevState, revoked: value
    })));

    return (
        <Form
            onSubmit={() => {
            }}
            render={({form, values, invalid}) => {
                return (
                    <form>
                        <Typography variant="h6" gutterBottom>Information</Typography>
                        {/*Information about the administrator*/}
                        <Box pb={2} display="flex" flexWrap="nowrap" alignItems="center">
                            <Box css={{ minWidth: 120 }}>Administrator</Box>
                            <Box>
                                <UserReferenceField {...rest} record={state?.collection} source="admin_id"/>
                            </Box>
                        </Box>
                        {/*Information about the seller*/}
                        <Box pb={2}  display="flex" flexWrap="nowrap" alignItems="center">
                            <Box css={{ minWidth: 120 }}>Seller</Box>
                            <Box>
                                <UserReferenceField {...rest} record={state?.collection} source="seller_id"/>
                            </Box>
                        </Box>

                        <TextInput
                            onChange={handleCommentChange}
                            source="comment"
                            initialValue={state.comment}
                            validate={validateComment}
                            fullWidth/>
                        <DateTimeInput
                            source="timestamp"
                            label="Timestamp"
                            fullWidth
                            initialValue={state.timestamp}
                            onChange={handleTimestampChange}
                            validate={validateTimestamp}
                            options={{
                                disableFuture: true,
                                format: 'dd.MM.yyyy, HH:mm',
                                ampm: false,
                                clearable: true
                            }}/>
                        <BooleanInput
                            onChange={handleRevokedChange}
                            source="revoked"
                            validate={validateRevoked}
                            initialValue={state.revoked}/>
                        <Box mt="8px">
                            Sum: <CurrencyInCentsField record={getReplenishmentSum()}/>
                        </Box>

                    </form>
                );
            }}/>
    )
};

export const ReplenishmentCollectionEdit = props => {
    return (
        <Edit {...props}>
            <EditPanel {...props}/>
        </Edit>
    );
};
