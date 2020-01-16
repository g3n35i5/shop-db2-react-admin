import React from 'react';
import {Datagrid, List, TextField} from 'react-admin';
import {string, number} from "prop-types";

const rank = {
    id: number,
    name: string,
    debt_limit: number
};

CurrencyInCentsField.propTypes = {
    source: string,
    record: rank,
    currency: string
};

function CurrencyInCentsField (props) {
    // Divide the amount in cents by 100 to get the currency amount in EUR
    const cents = props.record[props.source] / 100;
    return (
        <span>{cents.toLocaleString('de-DE', {style: 'currency', currency: props.currency})}</span>
    )
}

export const RankList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id"/>
            <TextField source="name"/>
            <CurrencyInCentsField source="debt_limit" currency="EUR"/>
        </Datagrid>
    </List>
);
