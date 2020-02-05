import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import Dashboard from "./dashboard/Dashboard";
import authProvider from './authentication/AuthProvider';
import LogoutButton from "./authentication/LogoutButton";
import LoginPage from "./authentication/LoginPage";
import { UserList } from './models/users/UserListView';
import { UserCreate } from './models/users/UserCreate';
import { UserEdit } from './models/users/UserEdit';
import { PurchaseList } from './models/purchases/PurchaseListView';
import { ProductList } from './models/products/ProductListView';
import { ProductEdit } from "./models/products/ProductEdit";
import { TagList } from './models/tags/TagListView';
import { TagCreate } from './models/tags/TagCreate';
import { TagEdit } from './models/tags/TagEdit';
import { RankList } from './models/ranks/RankListView';
import { AccountGroup, AccountBadgeHorizontal, FoodApple, Tag, Cart } from 'mdi-material-ui'
import {createMuiTheme} from '@material-ui/core/styles';
import customDataProvider from './DataProvider';
import {deepPurple, lime} from '@material-ui/core/colors';
import {DepositList} from "./models/deposits/DepositListView";
import {DepositCreate} from "./models/deposits/DepositCreate";

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: lime,
        secondary: deepPurple
    },
});


const App = () => (
    <Admin
        theme={theme}
        dashboard={Dashboard}
        dataProvider={customDataProvider}
        authProvider={authProvider}
        loginPage={LoginPage}
        logoutButton={LogoutButton}>
        {/*Resources*/}
        <Resource name="users" list={UserList} create={UserCreate} edit={UserEdit} icon={AccountGroup}/>
        <Resource name="purchases" list={PurchaseList} icon={Cart}/>
        <Resource name="products" list={ProductList} edit={ProductEdit} icon={FoodApple}/>
        <Resource name="deposits" list={DepositList} create={DepositCreate} icon={CurrencyUsd}/>
        <Resource name="tags" list={TagList} create={TagCreate} edit={TagEdit} icon={Tag}/>
        <Resource name="ranks" list={RankList} icon={AccountBadgeHorizontal}/>
    </Admin>
);

export default App;
