import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    card: {
        float: 'left',
        margin: '-20px 20px 0 15px',
        zIndex: 100,
        borderRadius: 3,
        position: 'fixed'
    },
    icon: {
        float: 'right',
        width: 32,
        height: 32,
        padding: 16,
        color: '#fff',
    },
});

const CardIcon = ({ Icon, bgColor }) => {
    const classes = useStyles();
    return (
        <Card className={classes.card} style={{ backgroundColor: bgColor }}>
            <Icon className={classes.icon} />
        </Card>
    );
};

export default CardIcon;
