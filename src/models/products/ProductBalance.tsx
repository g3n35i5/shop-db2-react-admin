import React, {useCallback, useEffect, useState} from 'react';
import {useDataProvider, useVersion} from "react-admin";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import {CurrencyInCentsField} from "../../shared/fields/CurrencyInCents";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            width: '300px'
        },
        paper: {
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        noPadding: {
            padding: 0
        },
        container: {
            maxWidth: '300px',
            display: 'flex',
            flexWrap: 'nowrap',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center'
        },
        leftBar: {
            backgroundColor: '#FF5B3A',
            color: 'black',
            justifySelf: 'flex-start',
            overflow: 'hidden',
            textAlign: 'left',
            paddingLeft: '10px',
            borderTopLeftRadius: '10px;',
            borderBottomLeftRadius: '10px;',
            borderTopRightRadius: '0px',
            borderBottomRightRadius: '0px',
        },
        middleLine: {
            backgroundColor: '#43493A',
            position: 'absolute',
            marginTop: 0,
            minWidth: '1px',
            minHeight: '20px',
        },
        rightBar: {
            backgroundColor: '#8BC34A',
            color: 'black',
            justifySelf: 'flex-end',
            overflow: 'hidden',
            textAlign: 'right',
            paddingRight: '10px',
            borderTopLeftRadius: '0px',
            borderBottomLeftRadius: '0px',
            borderTopRightRadius: '10px',
            borderBottomRightRadius: '10px',
        }
    }),
);

const VerticalBar = (props) => {
    const classes = useStyles();

    if (props && props.replenishmentSum !== undefined && props.purchaseSum !== undefined) {
        let sum = props.replenishmentSum + props.purchaseSum;
        let replenishmentPercentage: string = (props.replenishmentSum * 100 / sum).toString() + '%';
        let purchasePercentage: string = (props.purchaseSum * 100 / sum).toString() + '%';
        if (props.replenishmentSum === 0 && props.purchaseSum === 0) {
            replenishmentPercentage = '50%';
            purchasePercentage = '50%';
        }

        return (
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={12}>
                        <div className={classes.container}>
                            <div className={classes.leftBar} style={{width: replenishmentPercentage}}>
                                <CurrencyInCentsField record={props.replenishmentSum}/>
                            </div>
                            <div className={classes.middleLine}>

                            </div>
                            <div className={classes.rightBar} style={{width: purchasePercentage}}>
                                <CurrencyInCentsField record={props.purchaseSum}/>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    } else {
        return <Skeleton variant="rect" width={300} height={20}/>;
    }


};

export const ProductBalance = (props) => {
    const [state, setState] = useState<any | null>({});

    const version = useVersion();
    const dataProvider = useDataProvider();

    const fetchReplenishments = useCallback(async () => {
        const params = {filter: {revoked: false, product_id: props.record.id}};
        const {data: replenishments} = await dataProvider.getList('replenishments', params);
        let replenishmentSum: number = 0;
        if (replenishments && replenishments.length > 0) {
            replenishmentSum = replenishments.map(r => r.total_price).reduce((a, b) => {
                return a + b
            });
        }

        setState(state => ({
            ...state,
            replenishmentSum: replenishmentSum
        }));
    }, [dataProvider]);

    const fetchPurchases = useCallback(async () => {
        const params = {filter: {revoked: false, product_id: props.record.id}};
        const {data: purchases} = await dataProvider.getList('purchases', params);

        let purchaseSum: number = 0;
        if (purchases && purchases.length > 0) {
            purchaseSum = purchases.map(r => r.price).reduce((a, b) => {
                return a + b
            });
        }

        setState(state => ({
            ...state,
            purchaseSum: purchaseSum
        }));
    }, [dataProvider]);

    useEffect(() => {
        fetchReplenishments();
        fetchPurchases();
    }, [version]);

    return <VerticalBar replenishmentSum={state.replenishmentSum} purchaseSum={state.purchaseSum}/>
};


