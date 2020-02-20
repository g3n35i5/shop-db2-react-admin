import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
    avatar: {
        marginRight: theme.spacing(1),
    },
}));

const ImageField = ({alt, src}) => {
    const classes = useStyles();
    if (src !== null) {
        return <Avatar variant="rounded" alt={alt} src={src} className={classes.avatar}/>;
    }
    return <Avatar alt={alt} className={classes.avatar}/>;

};

export default ImageField;
