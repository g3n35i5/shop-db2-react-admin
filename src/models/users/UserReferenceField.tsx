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

const UserWithImageField = props => {
    const classes = useStyles();
    let label : string;
    if (props.record.firstname) {
        label = `${props.record.firstname} ${props.record.lastname}`;
    } else {
        label = `${props.record.lastname}`;
    }
    let src = props.record.imagename ? 'images/' + props.record.imagename : null;
    return (
        <div className={classes.root}>
            <ImageField alt={label} src={src}/>
            {label}
        </div>
    );
};

const UserReferenceField = props => {
    return (
        <ReferenceField source={props.source} reference="users" {...props}>
            <UserWithImageField/>
        </ReferenceField>
    )
};

UserReferenceField.defaultProps = {
    source: 'user_id',
    addLabel: true,
};

export default UserReferenceField;
