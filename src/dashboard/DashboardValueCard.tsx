import React from 'react';
import {Skeleton} from '@material-ui/lab';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {AccountGroup, Cart, CheckDecagram, FoodApple} from "mdi-material-ui";
import DashboardCard from './DashboardCard';

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

const ValueCardContent = ({title, value}) => {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.title}>
                <Typography color="textSecondary"> {title} </Typography>
            </div>
            <div className={classes.value}>
                <Typography variant="h5" component="h2">
                    {value ? value : <Skeleton className={classes.skeleton} variant="text"/>}
                </Typography>
            </div>
        </div>
    )
};

const DashboardValueCard = (props) => {
    const content = ValueCardContent({title: props.title, value: props.value});
    let ButtonText = props.buttonText ? props.buttonText : 'Show';
    return (
        <DashboardCard Icon={props.icon} IconColor={props.color} Content={content} ButtonLink={props.path}
                       ButtonParams={props.search} ButtonText={ButtonText}/>
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
