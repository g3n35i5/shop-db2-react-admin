import React from 'react';
import {Bar, BarChart, ResponsiveContainer, Cell, XAxis, YAxis, Tooltip} from "recharts";
import {ChartLineVariant} from "mdi-material-ui";
import {makeStyles} from "@material-ui/core/styles";
import CardIcon from "./CardIcon";
import {Card} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Skeleton} from '@material-ui/lab';
import {Purchase} from "../models/purchases/PurchaseInterface";
import {Replenishment} from "../models/replenishments/Replenishments";
import {CentsToEuro} from "../shared/fields/CurrencyInCents";


const useStyles = makeStyles({
    chartTitle: {
        textAlign: 'center',
    },
    chartCard: {
        marginTop: '1em',
        padding: '16px',
        WebkitBoxSizing: 'border-box',
        MozBoxSizing: 'border-box',
        BoxSizing: 'border-box',
        width: '100%',
        height: '250px'
    },
    chartSkeleton: {
        width: '100%',
        height: '174px',
        top: '20px',
        position: 'relative'
    }
});

const ChartCard = ({Icon, IconColor, Chart, Title}) => {
    const classes = useStyles();
    return (
        <div>
            <CardIcon Icon={Icon} bgColor={IconColor}/>
            <Card className={classes.chartCard}>
                <div className={classes.chartTitle}>
                    <Typography color="textSecondary"> {Title} </Typography>
                </div>
                {Chart}
            </Card>
        </div>
    );
};

const DashboardBarChart = ({data}) => {
    return (
        <ResponsiveContainer>
            <BarChart data={data} margin={{left: 20, bottom: 30, top: 25}}>
                <XAxis dataKey="title"/>
                <YAxis unit=" €"/>
                <Tooltip/>
                <Bar dataKey="value">
                    {data.map((entry, index) => (<Cell fill={data[index].color}/>))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export const DashboardBalanceChart = (props) => {
    const classes = useStyles();
    let Icon = ChartLineVariant;
    let IconColor = "#009688";
    let content: any;
    if (props.purchases && props.replenishments) {
        let purchases: Purchase[] = props.purchases.filter(p => !p.revoked);
        let replenishments: Replenishment[] = props.replenishments;
        let data: any[] = [
            {
                title: 'Incomes',
                value: CentsToEuro(purchases.map(p => p.price).reduce((a: number, b: number) => {return a+b})),
                color: '#8BC34A'
            },
            {
                title: 'Expenses',
                value: CentsToEuro(replenishments.map(p => p.total_price).reduce((a: number, b: number) => {return a+b})),
                color: '#FF5B3A'
            }
        ];

        // Define area chart
        content = DashboardBarChart({data: data});
    } else {
        // Placeholder for the chart
        content = <Skeleton variant="rect" className={classes.chartSkeleton}/>;
    }

    return (
        <ChartCard Icon={Icon} IconColor={IconColor} Chart={content} Title="Income and Expenses"/>
    );
};
