import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import { UserList } from './models/users/UserListView';
import { AccountGroup, AccountBadgeHorizontal } from 'mdi-material-ui'
import { RankList } from './models/ranks/RankListView';
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
