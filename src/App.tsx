import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import authProvider from './authentication/AuthProvider';
import LogoutButton from "./authentication/LogoutButton";
import { UserList } from './models/users/UserListView';
import { UserCreate } from './models/users/UserCreate';
import { UserEdit } from './models/users/UserEdit';
import { ProductList } from './models/products/ProductListView';
import { TagList } from './models/tags/TagListView';
import { RankList } from './models/ranks/RankListView';
import { AccountGroup, AccountBadgeHorizontal, FoodApple, Tag } from 'mdi-material-ui'
import {createMuiTheme} from '@material-ui/core/styles';
import customDataProvider from './DataProvider';
import {indigo, lime} from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: lime,
        secondary: indigo
    },
});


const App = () => (
    <Admin
        theme={theme}
        dataProvider={customDataProvider}
        authProvider={authProvider}
        logoutButton={LogoutButton}>
        {/*Resources*/}
        <Resource name="users" list={UserList} create={UserCreate} edit={UserEdit} icon={AccountGroup}/>
        <Resource name="products" list={ProductList} icon={FoodApple}/>
        <Resource name="tags" list={TagList} icon={Tag}/>
        <Resource name="ranks" list={RankList} icon={AccountBadgeHorizontal}/>
    </Admin>
);

export default App;
