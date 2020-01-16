import {string, any} from "prop-types";
import React from "react";

CurrencyInCentsField.propTypes = {
    source: string,
    record: any,
    currency: string
};

export function CurrencyInCentsField (props) {
    // Divide the amount in cents by 100 to get the currency amount in EUR
    const cents = props.record[props.source] / 100;
    return (
        <span>{cents.toLocaleString('de-DE', {style: 'currency', currency: props.currency})}</span>
    )
}
