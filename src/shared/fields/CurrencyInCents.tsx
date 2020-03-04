import React from "react";

export const CentsToEuro = (cents: number|undefined): number => {
    return cents ? cents / 100 : 0;
};

export const CurrencyInCentsField = (props) => {
    let cents: number;
    // Divide the amount in cents by 100 to get the currency amount in EUR
    if (props.record && props.source && props.record[props.source] !== null) {
        cents =  CentsToEuro(props.record[props.source]);
    } else if (props.hasOwnProperty('record') && !isNaN(props.record)) {
        cents = CentsToEuro(props.record);
    } else {
        return null;
    }
    return (
        <span>{cents.toLocaleString('de-DE', {style: 'currency', currency: 'EUR'})}</span>
    );
};
