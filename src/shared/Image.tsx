import React from 'react';

import {getImageURL} from "../DataProvider";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    productImage: {
        borderRadius: '50%',
        width: '128px',
        height: '128px',
        backgroundColor: '#303030',
        padding: '5px'
    }
}));

export const PreviewImage = ({record, ...props}) => {
    const classes = useStyles();
    const src = getImageURL(record);
    if (src) {
        return <img src={src} className={classes.productImage}/>;
    }
    return <span>No image</span>;
};

PreviewImage.defaultProps = { addLabel: true };
