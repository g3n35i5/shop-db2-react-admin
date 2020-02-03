import React, {FC}  from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import {FieldProps} from "../interfaces/FieldProps";


export const TimestampField: FC<FieldProps> = (props: FieldProps) => {
    if (props && props.record && props.source) {
        return <Moment format="DD.MM.YYYY HH:mm" utc>{props.record[props.source]}</Moment>
    }
    return null;
};

export default TimestampField;
