import React from 'react';
import Moment from 'react-moment';


export const TimestampField = (props) => {
    if (props && props.record && props.source && props.record[props.source] !== null) {
        return <Moment format="DD.MM.YYYY HH:mm">{props.record[props.source]}</Moment>
    }
    return null;
};

export default TimestampField;
