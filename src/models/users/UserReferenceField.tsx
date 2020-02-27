import React from 'react';
import {ReferenceField} from 'react-admin';
import {makeStyles} from '@material-ui/core/styles';
import ImageField from '../../shared/fields/ImageField';
import {getImageURL} from "../../DataProvider";
import {Account} from 'mdi-material-ui'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
    }
}));

export const UserWithImageField = props => {
    const classes = useStyles();
    let label: string = props.record.fullname;
    return (
        <div className={classes.root}>
            <ImageField alt={label} src={getImageURL(props.record)} fallback={<Account/>}/>
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
