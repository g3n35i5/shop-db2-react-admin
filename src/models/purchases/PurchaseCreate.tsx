import React, {Fragment, useCallback, useState} from 'react';
import {Create, NumberInput, required, SaveButton, Toolbar, useCreate, useNotify, useRedirect} from 'react-admin';
import {DateTimeInput} from 'react-admin-date-inputs';
import {Alert} from '@material-ui/lab';
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Form} from 'react-final-form';
import {UserAutoComplete} from "../../shared/fields/UserAutoComplete";
import {ProductAutoComplete} from "../../shared/fields/ProductAutoComplete";
import UserReferenceField from "../users/UserReferenceField";
import ProductReferenceField from "../products/ProductReferenceField";
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
    }
}));

export const PurchaseCreate = (props) => {
    const [state, setState] = useState<any | null>({purchases: []});

    const addPurchase = (values) => {
        setState(prevState => ({
            purchases: [...prevState.purchases, values]
        }));
    };

    const removePurchase = (purchase) => {
        setState(prevState => ({
            purchases: prevState.purchases.filter(item => item !== purchase)
        }));
    };

    return (
        <Fragment>
            {/*Just a small tutorial...*/}
            <Alert severity="info">
                Here you can add one or more purchases for users. To do so, create the
                purchase in the left button and press "add purchase". It will now appear on the right side in a list
                of all purchases. You can also remove purchases from the list. For each purchase you can optionally
                add a timestamp, otherwise the current time will be used.
            </Alert>
            {/*The actual create component*/}
            <Create {...props}>
                <Fragment>
                    <Box display="flex" ml="1em">
                        <Box flex={1}>
                            {/*Left side: Crate single purchase*/}
                            <CreateSinglePurchase onAddingPurchase={addPurchase}/>
                        </Box>
                        <Box flex={2} mr="1em">
                            {/*Right side: List of all purchases*/}
                            <PurchaseList purchases={state.purchases} onRemovingPurchase={removePurchase} {...props}/>
                        </Box>
                    </Box>
                    {/*Bottom toolbar with save button*/}
                    <Toolbar {...props}>
                        <CreatePurchasesButton
                            handleSubmitWithRedirect
                            label="ra.action.save"
                            redirect="show"
                            state={state}
                            submitOnEnter={true}
                        />
                    </Toolbar>
                </Fragment>
            </Create>
        </Fragment>
    )
};

// This helper function returns whether a given array is invalid, i.e. it is null or empty.
const isInvalidData = (data: any[] | null) => {
    return !data || (Array.isArray(data) && data.length === 0);
};

// Custom save button which alters the deposit payload.
// We need this because of the custom comment field
const CreatePurchasesButton = ({state, ...props}) => {
    const [create] = useCreate('purchases');
    const redirectTo = useRedirect();
    const notify = useNotify();
    const {basePath, redirect} = props;

    let handleClick = useCallback(() => {
        // Create purchases
        create(
            {
                payload: {data: state.purchases},
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

    return <SaveButton disabled={isInvalidData(state.purchases)} {...props} handleSubmitWithRedirect={handleClick}/>;
};

// Form on the left for creating a single purchase and appending it to the global list of purchases
const CreateSinglePurchase = (props) => {
    const classes = useStyles();

    const addPurchase = (form, values) => {
        // Call the "addPurchase" method of the parent component
        props.onAddingPurchase(values);
        clearForm(form);
    };

    const clearForm = (form) => {
        form.reset();
    };

    const showResetButton = (values) => {
        for (let item of Object.values(values)) {
            if (item && (item !== "" || item !== null)) {
                return true;
            }
        }
        return false;
    };


    return (
        <Form
            onSubmit={addPurchase}
            render={({form, values, invalid}) => {
                return (
                    <form>
                        <Box flex={1} mr="1em">
                            <Typography variant="h6" gutterBottom>Purchase data</Typography>

                            <Box display="flex">
                                <Box flex={1} mr="0.5em">
                                    <UserAutoComplete fullWidth/>
                                </Box>
                                <Box flex={1} ml="0.5em">
                                    <ProductAutoComplete fullWidth/>
                                </Box>
                            </Box>
                            <NumberInput source="amount" validate={[required()]} fullWidth/>
                            <DateTimeInput source="timestamp" label="Optional: Timestamp"
                                           fullWidth
                                           options={{
                                               disableFuture: true,
                                               format: 'dd.MM.yyyy, HH:mm',
                                               ampm: false,
                                               clearable: true
                                           }}/>
                            <Box display="flex">
                                <Button className={classes.button} disabled={invalid}
                                        onClick={() => addPurchase(form, values)}>Add purchase</Button>
                                <Button className={classes.button} disabled={!showResetButton(values)}
                                        onClick={() => clearForm(form)}>Clear</Button>
                            </Box>

                            <Box mt="1em"/>
                        </Box>
                    </form>
                );
            }}
        />
    )
};

// This component renders a table with all purchases if there are any
const PurchaseList = ({purchases, ...props}) => {
    const classes = useStyles();

    const showTable = () => {
        return purchases && Array.isArray(purchases) && purchases.length > 0;
    };

    const removePurchase = (purchase) => {
        props.onRemovingPurchase(purchase);
    };
    return (
        <Fragment>
            <Typography variant="h6" gutterBottom>List of purchases</Typography>
            {showTable() ?
                <TableContainer className={classes.container} component={Paper}>
                    <Table size="small" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>User</TableCell>
                                <TableCell>Product</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Timestamp</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {purchases.map((purchase, index) => <PurchaseEntry {...props}
                                                                               key={index}
                                                                               handler={removePurchase}
                                                                               purchase={purchase}/>)}
                        </TableBody>
                    </Table>
                </TableContainer>
                :
                <Typography align="center">You must add at least one purchase</Typography>}
        </Fragment>
    )
};

// This component returns the entry for a single purchase which is a table row
const PurchaseEntry = ({purchase, ...rest}) => {
    if (purchase && typeof purchase === "object") {
        return (
            <TableRow>
                <TableCell component="th" scope="row">
                    <UserReferenceField {...rest} record={purchase}/>
                </TableCell>
                <TableCell component="th" scope="row">
                    <ProductReferenceField {...rest} record={purchase}/>
                </TableCell>
                <TableCell component="th" scope="row">
                    <span>{purchase.amount}</span>
                </TableCell>
                <TableCell component="th" scope="row">
                    <TimestampField record={purchase} source="timestamp"/>
                </TableCell>
                <TableCell component="th" scope="row">

                    <Button color="primary" onClick={() => rest.handler(purchase)}>
                        Delete
                    </Button>
                </TableCell>
            </TableRow>
        )
    } else {
        return null;
    }
};
