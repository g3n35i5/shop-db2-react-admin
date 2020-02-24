import * as React from 'react';
import {Admin, Resource} from 'react-admin';
import Dashboard from "./dashboard/Dashboard";
import authProvider from './authentication/AuthProvider';
import LogoutButton from "./authentication/LogoutButton";
import LoginPage from "./authentication/LoginPage";
import {AccountBadgeHorizontal, AccountGroup, Basket, Cart, CurrencyUsd, FoodApple, Tag} from 'mdi-material-ui'
import {createMuiTheme} from '@material-ui/core/styles';
import customDataProvider from './DataProvider';
import {deepPurple, lime} from '@material-ui/core/colors';
// Resource imports
import {UserCreate, UserEdit, UserList} from './models/users/User';
import {PurchaseCreate, PurchaseList} from './models/purchases/Purchase';
import {ProductCreate, ProductEdit, ProductList} from './models/products/Product';
import {TagCreate, TagEdit, TagList} from './models/tags/Tag';
import {RankCreate, RankEdit, RankList} from './models/ranks/Rank';
import {DepositCreate, DepositList} from './models/deposits/Deposit';
import {
    ReplenishmentCollectionCreate,
    ReplenishmentCollectionEdit,
    ReplenishmentCollectionList
} from "./models/replenishments/Replenishments";

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
        <Resource name="replenishmentcollections" list={ReplenishmentCollectionList}
                  create={ReplenishmentCollectionCreate} edit={ReplenishmentCollectionEdit} icon={Basket}/>
    </Admin>
);

export default App;
