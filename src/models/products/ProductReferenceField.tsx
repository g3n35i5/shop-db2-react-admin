import React from 'react';
import {ReferenceField} from 'react-admin';
import {makeStyles} from '@material-ui/core/styles';
import ImageField from '../../shared/fields/ImageField';
import {getImageURL} from '../../DataProvider';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
    }
}));

const ProductWithImageField = props => {
    const classes = useStyles();
    let name = props.record.name;
    return (
        <div className={classes.root}>
            <ImageField alt={name} src={getImageURL(props.record)}/>
            {name}
        </div>
    );
};

const ProductReferenceField = props => {
    return (
        <ReferenceField source="product_id" reference="products" {...props}>
            <ProductWithImageField/>
        </ReferenceField>
    )
};

ProductReferenceField.defaultProps = {
    source: 'product_id',
    addLabel: true,
};

export default ProductReferenceField;
