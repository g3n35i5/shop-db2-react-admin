import {stringify} from 'query-string';
import simpleRestProvider from 'ra-data-simple-rest';
import {fetchUtils} from "react-admin";
import {deepCompare} from "./shared/compare";

// URL to the API
const apiUrl: string = '';

// Custom httpClient with authorization
const httpClient = (url, options: any = {}) => {
    if (!options.headers) {
        options.headers = new Headers({Accept: 'application/json'});
    }
    const token = localStorage.getItem('token');
    options.headers.set('token', token);
    return fetchUtils.fetchJson(url, options);
};

// Base data provider
const dataProvider = simpleRestProvider(apiUrl, httpClient);

// Custom data provider
const customDataProvider = {
    ...dataProvider,
    // Overriding the getList method of the simple-rest-data-provider
    // In contrast to the reference implementation, all query parameters are specified here as dictionary
    // and not as arrays or similar.
    // Furthermore, the pagination is passed directly and not as range parameters.
    getList: (resource, params) => {
        const query = {
            sort: JSON.stringify(params.sort),
            pagination: JSON.stringify(params.pagination),
            filter: JSON.stringify(params.filter),
        };

        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({headers, json}) => {
            if (!headers.has('content-range')) {
                throw new Error(
                    'The Content-Range header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?'
                );
            }
            return {
                data: json,
                total: parseInt(
                    headers
                        .get('content-range')
                        .split('/')
                        .pop(),
                    10
                ),
            };
        });
    },
    update: (resource, params) => {
        // Only submit changed values
        let params_to_patch = {};
        for (let [key, value] of Object.entries(params.data)) {
            if (!deepCompare(params.previousData[key], value)) {
                params_to_patch[key] = value;
            }
        }

        return httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params_to_patch),
        }).then(({json}) => ({data: json}))
    }


};

export default customDataProvider;
