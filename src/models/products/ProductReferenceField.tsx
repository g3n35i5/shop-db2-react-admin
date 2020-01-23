import React from 'react';
import {ReferenceField} from 'react-admin';
import {makeStyles} from '@material-ui/core/styles';
import ImageField from '../../shared/fields/ImageField';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
    }
}));

const ProductWithImageField = props => {
    const classes = useStyles();
    let src = props.record.imagename ? 'images/' + props.record.imagename : 'images';
    let name = props.record.name;
    return (
        <div className={classes.root}>
            <ImageField alt={name} src={src}/>
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
