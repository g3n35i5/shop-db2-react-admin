import {AutocompleteInput, Error, required, useDataProvider} from "react-admin";
import React, {useEffect, useState} from "react";

export const ProductAutoComplete = (props) => {

    const dataProvider = useDataProvider();
    const [products, setProducts] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        dataProvider.getList('products', {})
            .then(({data}) => {
                setProducts(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            })
    }, [dataProvider]);

    if (error) return <Error error="Error in ProductAutoComplete"/>;

    return (
        <AutocompleteInput {...props} source="product_id" choices={products} validate={required()} optionText="name"/>
    )
};
