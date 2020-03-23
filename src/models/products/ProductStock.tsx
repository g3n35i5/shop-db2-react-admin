import React, {useCallback, useEffect, useState} from 'react';
import {useDataProvider} from "react-admin";
import {CircleOffOutline} from 'mdi-material-ui';
import Skeleton from '@material-ui/lab/Skeleton';

export const ProductStock = (props) => {
    const [stock, setStock] = useState<number|undefined>(undefined);
    const dataProvider = useDataProvider();

    const getTheoreticalProductStock = useCallback(async () => {
        const params = {id: props.record.id, property: 'stock'};
        const {data: stock} = await dataProvider.getDetails('products', params);

        setStock(stock);
    }, [dataProvider]);
    useEffect(() => {
        getTheoreticalProductStock();
    }, []);

    if (stock !== undefined) {
        return stock !== null ? <span>{stock}</span> : <CircleOffOutline/>;
    } else {
        return <Skeleton variant="text"/>;
    }
};


