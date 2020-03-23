import React, {useCallback, useEffect, useState} from 'react';
import {useDataProvider} from "react-admin";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import {Tooltip} from '@material-ui/core';
import {CentsToEuro, CurrencyInCentsField} from "../../shared/fields/CurrencyInCents";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: '250px',
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
        },
        stockBar: {
            backgroundColor: '#A7AE9C',
            color: 'black',
            justifySelf: 'flex-end',
            overflow: 'hidden',
            textAlign: 'center'
        }
    }),
);

export const ProductBalance = (props) => {

    const classes = useStyles();
    const [state, setState] = useState<any | null>({});
    const dataProvider = useDataProvider();

    const getTheoreticalProductStock = useCallback(async () => {
        const params = {id: props.record.id, property: 'stock'};
        const {data: stock} = await dataProvider.getDetails('products', params);

        setState(state => ({
            ...state,
            theoreticalStock: stock > 0 ? stock : 0
        }));
    }, [dataProvider, props]);
    useEffect(() => {
        getTheoreticalProductStock();
    }, [getTheoreticalProductStock]);

    if (props && props.record && state && state.theoreticalStock !== undefined) {
        const replenishmentSum = props.record.replenishment_sum;
        const purchaseSum = props.record.purchase_sum;
        const stockSum = state.theoreticalStock * props.record.price;
        let sum = replenishmentSum + purchaseSum + stockSum;
        let replenishmentPercentage: string = (replenishmentSum * 100 / sum).toString() + '%';
        let purchasePercentage: string = (purchaseSum * 100 / sum).toString() + '%';
        let stockPercentage: string = (stockSum * 100 / sum).toString() + '%';
        if (replenishmentSum === 0 && purchaseSum === 0) {
            replenishmentPercentage = '50%';
            purchasePercentage = '50%';
        }
        let replenishmentTooltipTitle = 'Expenses: ' + CentsToEuro(replenishmentSum).toFixed(2) + ' €';
        let purchaseTooltipTitle = 'Incomes: ' + CentsToEuro(purchaseSum).toFixed(2) + ' €';
        let stockTooltipTitle = 'Stock: ' + CentsToEuro(stockSum).toFixed(2) + ' €';

        return (
            <div className={classes.container}>
                {/*Bar for the replenishment sum*/}
                <Tooltip title={replenishmentTooltipTitle}>
                    <div className={classes.leftBar} style={{width: replenishmentPercentage}}>
                        <CurrencyInCentsField record={replenishmentSum}/>
                    </div>
                </Tooltip>

                {/*Divider at 50%*/}
                <div className={classes.middleLine}></div>
                {/*Bar for the stock sum*/}
                {
                    stockSum > 0 &&
                    <Tooltip title={stockTooltipTitle}>
                        <div className={classes.stockBar} style={{width: stockPercentage}}>
                            <CurrencyInCentsField record={stockSum}/>
                        </div>
                    </Tooltip>
                }
                {/*Bar for the purchase sum*/}
                <Tooltip title={purchaseTooltipTitle}>
                    <div className={classes.rightBar} style={{width: purchasePercentage}}>
                        <CurrencyInCentsField record={purchaseSum}/>
                    </div>
                </Tooltip>
            </div>
        )
    } else {
        return <Skeleton variant="rect" width={300} height={20}/>;
    }
};


