import React from 'react';
import {Button, Card, CardActions} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';

import CardIcon from './CardIcon';

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
    }
});

const DashboardCard = ({Icon, IconColor, Content, ButtonLink, ButtonParams, ButtonText}) => {
    const classes = useStyles();
    return (
        <div className={classes.main}>
            <CardIcon Icon={Icon} bgColor={IconColor}/>
            <Card className={classes.card}>
                {Content}
                {ButtonLink ?
                    <CardActions>
                        <Button color="primary" size="small" component={Link} to={{
                            pathname: ButtonLink,
                            search: ButtonParams,
                        }}>{ButtonText}</Button>
                    </CardActions>
                    : null
                }
            </Card>
        </div>
    );
};

export default DashboardCard;
