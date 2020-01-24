import React, {useCallback, useEffect, useState} from 'react';
import {useDataProvider, useVersion} from 'react-admin';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
    NumberOfProductsCard,
    NumberOfPurchasesCard,
    NumberOfUsersCard,
    PendingVerificationsCard
} from "./DashboardValueCard";

import {DashboardPurchasesChart} from "./DashboardPurchaseChart";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);

const Dashboard = () => {
    const [state, setState] = useState<any | null>({});

    const version = useVersion();
    const dataProvider = useDataProvider();

    const fetchUsers = useCallback(async () => {
        const {data: allUsers} = await dataProvider.getList('users', {});
        const nonVerifiedUsers = allUsers.filter(user => !user.is_verified);
        const verifiedUsers = allUsers.filter(user => user.is_verified);

        setState(state => ({
            ...state,
            numberOfNonVerifiedUsers: nonVerifiedUsers.length,
            numberOfVerifiedUsers: verifiedUsers.length
        }));
    }, [dataProvider]);

    const fetchPurchases = useCallback(async () => {
        const {data: allPurchases} = await dataProvider.getList('purchases', {});

        setState(state => ({
            ...state,
            numberOfPurchases: allPurchases.length,
            allPurchases: allPurchases

        }));
    }, [dataProvider]);

    const fetchProducts = useCallback(async () => {
        const {data: allProducts} = await dataProvider.getList('products', {});

        setState(state => ({
            ...state,
            numberOfProducts: allProducts.length,
            allProducts: allProducts
        }));
    }, [dataProvider]);

    useEffect(() => {
        fetchUsers();
        fetchPurchases();
        fetchProducts();
    }, [version]); // eslint-disable-line react-hooks/exhaustive-deps

    const classes = useStyles();


    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xl={3} md={6} sm={12}>
                    <NumberOfUsersCard value={state.numberOfVerifiedUsers}/>
                </Grid>
                <Grid item xl={3} md={6} sm={12}>
                    <PendingVerificationsCard value={state.numberOfNonVerifiedUsers}/>
                </Grid>
                <Grid item xl={3} md={6} sm={12}>
                    <NumberOfProductsCard value={state.numberOfProducts}/>
                </Grid>
                <Grid item xl={3} md={6} sm={12}>
                    <NumberOfPurchasesCard value={state.numberOfPurchases}/>
                </Grid>
                <Grid item xl={12} md={12}>
                    <DashboardPurchasesChart purchases={state.allPurchases}/>
                </Grid>
            </Grid>
        </div>
    )
};


export default Dashboard;
