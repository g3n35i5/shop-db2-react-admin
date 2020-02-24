import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
    avatar: {
        marginRight: theme.spacing(1),
    },
}));

const ImageField = (props) => {
    const classes = useStyles();

    if (props.fallback) {
        return (<Avatar alt={props.alt} src={props.src} className={classes.avatar}>
            {props.fallback}
        </Avatar>)
    } else {
        return <Avatar alt={props.alt} src={props.src} className={classes.avatar}/>;
    }

};

export default ImageField;
