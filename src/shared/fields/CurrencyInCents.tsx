import React, {FC} from "react";

import {FieldProps} from "../interfaces/FieldProps";

export const CurrencyInCentsField: FC<FieldProps> = (props: FieldProps) => {
    if (props.record && props.source && props.record[props.source] !== null) {
        // Divide the amount in cents by 100 to get the currency amount in EUR
        const cents = props.record[props.source] / 100;
        return (
            <span>{cents.toLocaleString('de-DE', {style: 'currency', currency: 'EUR'})}</span>
        )
    }
    return null;
};
