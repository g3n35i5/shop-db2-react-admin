import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import Dashboard from "./dashboard/Dashboard";
import authProvider from './authentication/AuthProvider';
import LogoutButton from "./authentication/LogoutButton";
import LoginPage from "./authentication/LoginPage";
import { AccountGroup, AccountBadgeHorizontal, FoodApple, Tag, Cart, CurrencyUsd, Basket} from 'mdi-material-ui'
import {createMuiTheme} from '@material-ui/core/styles';
import customDataProvider from './DataProvider';
import {deepPurple, lime} from '@material-ui/core/colors';

// Resource imports
import { UserList, UserCreate, UserEdit } from './models/users/User';
import { PurchaseList, PurchaseCreate } from './models/purchases/Purchase';
import { ProductList, ProductCreate, ProductEdit } from './models/products/Product';
import { TagList, TagCreate, TagEdit } from './models/tags/Tag';
import { RankList, RankCreate, RankEdit } from './models/ranks/Rank';
import { DepositList, DepositCreate } from './models/deposits/Deposit';
import { ReplenishmentCollectionList, ReplenishmentCollectionEdit } from "./models/replenishments/Replenishments";

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
        <Resource name="purchases" list={PurchaseList} create={PurchaseCreate} icon={Cart}/>
        <Resource name="products" list={ProductList} create={ProductCreate} edit={ProductEdit} icon={FoodApple}/>
        <Resource name="deposits" list={DepositList} create={DepositCreate} icon={CurrencyUsd}/>
        <Resource name="tags" list={TagList} create={TagCreate} edit={TagEdit} icon={Tag}/>
        <Resource name="ranks" list={RankList} create={RankCreate} edit={RankEdit} icon={AccountBadgeHorizontal}/>
        <Resource name="replenishmentcollections" list={ReplenishmentCollectionList} edit={ReplenishmentCollectionEdit} icon={Basket}/>
    </Admin>
);

export default App;
