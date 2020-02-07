import React, {FC}  from 'react';
import Moment from 'react-moment';
import {FieldProps} from "../interfaces/FieldProps";


export const TimestampField: FC<FieldProps> = (props: FieldProps) => {
    if (props && props.record && props.source && props.record[props.source] !== null) {
        return <Moment format="DD.MM.YYYY HH:mm">{props.record[props.source]}</Moment>
    }
    return null;
};

export default TimestampField;
