import React from "react";

type CurrencyInCentsProps = {
    source: string,
    record?: any,  //TODO This works but i dont know why
    currency: string
}

export function CurrencyInCentsField (props: CurrencyInCentsProps) {
    // Divide the amount in cents by 100 to get the currency amount in EUR
    const cents = props.record[props.source] / 100;
    return (
        <span>{cents.toLocaleString('de-DE', {style: 'currency', currency: props.currency})}</span>
    )
}
