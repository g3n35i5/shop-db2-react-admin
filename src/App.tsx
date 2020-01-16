import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import { UserList } from './models/users/UserListView';
import { ProductList } from './models/products/ProductListView';
import { TagList } from './models/tags/TagListView';
import { RankList } from './models/ranks/RankListView';
import { AccountGroup, AccountBadgeHorizontal, FoodApple, Tag } from 'mdi-material-ui'
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
        <Resource name="products" list={ProductList} icon={FoodApple}/>
        <Resource name="tags" list={TagList} icon={Tag}/>
        <Resource name="ranks" list={RankList} icon={AccountBadgeHorizontal}/>
    </Admin>
);

export default App;
