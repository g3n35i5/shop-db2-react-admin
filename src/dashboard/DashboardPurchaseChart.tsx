import React from 'react';
import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {ChartLineVariant} from "mdi-material-ui";
import {makeStyles} from "@material-ui/core/styles";
import CardIcon from "./CardIcon";
import {Card} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Skeleton} from '@material-ui/lab';
import {Purchase} from "../models/purchases/PurchaseInterface";


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

const DashboardAreaChart = ({data, xKey, yKey}) => {
    return (
        <ResponsiveContainer>
            <AreaChart data={data} margin={{bottom: 30, top: 16}}>
                <XAxis dataKey={xKey}/>
                <YAxis dataKey={yKey}/>
                <Tooltip/>
                <Area type="monotone" dataKey={yKey} stroke="#8884d8" strokeWidth={2}/>
            </AreaChart>
        </ResponsiveContainer>
    );
};

export const DashboardPurchasesChart = (props) => {
    const classes = useStyles();
    let Icon = ChartLineVariant;
    let IconColor = "#e91e63";
    let content: any;
    let purchases: Purchase[] = props.purchases;
    if (purchases) {
        let data: any[] = [];
        let numberOfPurchases = purchases.length;
        for (let hour = 0; hour <= 23; hour++) {
            data.push({
                name: hour,
                purchases: purchases.filter((purchase: Purchase) => {
                    if (purchase.timestamp) {
                        let date = new Date(purchase.timestamp);
                        return date.getHours() === hour;
                    }
                    return false;

                }).length
            });
        }
        // Divide all values by the number of purchases in order to get percentage values
        for (let item of data) {
            item.purchases = (item.purchases * 100 / numberOfPurchases).toFixed(1);
        }
        // Define area chart
        content = DashboardAreaChart({data: data, xKey: "name", yKey: "purchases"});
    } else {
        // Placeholder for the chart
        content = <Skeleton variant="rect" className={classes.chartSkeleton}/>;
    }

    return (
        <ChartCard Icon={Icon} IconColor={IconColor} Chart={content} Title="Distribution of purchases over the day"/>
    );
};
