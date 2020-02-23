import React from "react";

export const CurrencyInCentsField = (props) => {
    let cents: number;
    console.log(props);
    // Divide the amount in cents by 100 to get the currency amount in EUR
    if (props.record && props.source && props.record[props.source] !== null) {
        cents = props.record[props.source] / 100;
    } else if (props.hasOwnProperty('record') && !isNaN(props.record)) {
        cents = props.record / 100;
    } else {
        return null;
    }
    return (
        <span>{cents.toLocaleString('de-DE', {style: 'currency', currency: 'EUR'})}</span>
    );
};
