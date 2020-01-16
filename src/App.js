import React from 'react';
import {Admin, Resource} from 'react-admin';
import { UserList } from './models/users';
import { RankList } from './models/ranks';
import {createMuiTheme} from '@material-ui/core/styles';
import simpleRestProvider from 'ra-data-simple-rest';

const theme = createMuiTheme({
    palette: {
        type: 'dark'
    },
});

const dataProvider = simpleRestProvider('');
const App = () => (
    <Admin theme={theme} dataProvider={dataProvider}>
        <Resource name="users" list={UserList}/>
        <Resource name="ranks" list={RankList}/>
    </Admin>
);

export default App;
