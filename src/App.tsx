import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import { UserList } from './models/users/users';
import { RankList } from './models/ranks/ranks';
import { AccountGroup, AccountBadgeHorizontal } from 'mdi-material-ui'
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
        <Resource name="users" list={UserList} icon={AccountGroup}/>
        <Resource name="ranks" list={RankList} icon={AccountBadgeHorizontal}/>
    </Admin>
);

export default App;
