import React from 'react';
import {Button, Card, CardActions} from '@material-ui/core';
import {Skeleton} from '@material-ui/lab';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import CardIcon from './CardIcon';
import {AccountGroup, Cart, CheckDecagram, FoodApple} from "mdi-material-ui";

const useStyles = makeStyles({
    main: {
        flex: '1',
        marginTop: 20,
    },
    card: {
        overflow: 'inherit',
        paddingRight: 16,
        paddingTop: 16,
        minHeight: 52
    },
    skeleton: {
        marginLeft: 'auto',
        height: 32,
        width: 80
    },
    title: {
        textAlign: 'right',
    },
    value: {
        textAlign: 'right',
    }
});

const DashboardValueCard = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.main}>
            <CardIcon Icon={props.icon} bgColor={props.color}/>
            <Card className={classes.card}>
                <div className={classes.title}>
                    <Typography color="textSecondary">
                        {props.title}
                    </Typography>
                </div>
                <div className={classes.value}>
                    <Typography variant="h5" component="h2">
                        {
                            props.value ?
                                props.value :
                                <Skeleton className={classes.skeleton} variant="text"/>}
                    </Typography>
                </div>
                <CardActions>
                    <Button color="primary" size="small" component={Link} to={{
                        pathname: props.path,
                        search: props.search,
                    }}>Learn More</Button>
                </CardActions>
            </Card>
        </div>
    );
};

export const NumberOfUsersCard = ({value}) => {
    return <DashboardValueCard title="Verified users" icon={AccountGroup} value={value} color="#9c27b0"
                               path="/users" search='?filter={"is_verified":true}'/>
};

export const PendingVerificationsCard = ({value}) => {
    return <DashboardValueCard title="Pending verifications" icon={CheckDecagram} value={value} color="#ff9800"
                               path="/users" search='?filter={"is_verified":false}'/>
};

export const NumberOfPurchasesCard = ({value}) => {
    return <DashboardValueCard title="Purchases" icon={Cart} value={value} color="#2196f3"
                               path="/purchases" search=''/>
};

export const NumberOfProductsCard = ({value}) => {
    return <DashboardValueCard title="Products" icon={FoodApple} value={value} color="#8bc34a"
                               path="/products" search=''/>
};
