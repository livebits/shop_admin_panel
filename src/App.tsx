import * as React from 'react';
import { useState, useEffect } from 'react';
import { fetchUtils, Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import './App.css';

import authProvider from './authProvider';
import themeReducer from './themeReducer';
import { Login, Layout } from './layout';
import { Dashboard } from './dashboard';
import customRoutes from './routes';

import managers from './components/managers';
import visitors from './visitors';
import orders from './orders';
// import products from './products';
import invoices from './invoices';
// import categories from './categories';
import reviews from './reviews';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

import dataProviderFactory from './dataProvider';
import farsiMessages from 'ra-language-farsi';
import customers from './components/customers';
import tenants from './components/tenants';
import roles from './components/roles';
import actions from './components/actions';
import brands from './components/brands';
import categories from './components/categories';
import departments from './components/departments';
import discounts from './components/discounts';
import messages from './components/messages';
import productFields from './components/productFields';
import products from './components/products';

const i18nProvider = polyglotI18nProvider(locale => {
    if (locale === 'en') {
        return import('./i18n/en').then(messages => messages.default);
    }
    if (locale === 'fr') {
        return import('./i18n/fr').then(messages => messages.default);
    }

    // Always fallback on farsi
    return farsiMessages;
}, 'fa');

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

export const API_URL = process.env.REACT_APP_SERVER_ADDRESS

const App = () => {
    const [dataProvider, setDataProvider] = useState<any>(null);

    useEffect(() => {
        const fetchDataProvider = async () => {
            const fetchJson = (url:string, options:any = {}) => {
                if (!options.headers) {
                    options.headers = new Headers({ Accept: 'application/json' });
                }
                
                // options.headers.set('X-Custom-Header', 'foobar');
                const token = localStorage.getItem('token');
                options.headers.set('Authorization', `Bearer ${token}`);
                return fetchUtils.fetchJson(url, options);
            }
            const dataProviderInstance = dataProviderFactory(API_URL, fetchJson);
            setDataProvider(() => dataProviderInstance);
        };

        fetchDataProvider();
    }, []);

    if (!dataProvider) {        
        return (
            <div className="loader-container">
                <div className="loader">Loading...</div>
            </div>
        );
    }

    return (
        <StylesProvider jss={jss}>
            <Admin
                title="Shop Administration"
                dataProvider={dataProvider}
                customReducers={{ theme: themeReducer }}
                customRoutes={customRoutes}
                authProvider={authProvider}
                dashboard={Dashboard}
                loginPage={Login}
                layout={Layout}
                i18nProvider={i18nProvider}
            >
                <Resource name="managers" label="Managers" {...managers} />
                <Resource name="customers" label="Customers" {...customers} />
                <Resource name="tenants" label="Tenants" {...tenants} />
                <Resource name="roles" label="Roles" {...roles} />
                <Resource name="actions" label="Actions" {...actions} />
                <Resource name="brands" label="Brands" {...brands} />
                <Resource name="categories" label="Categories" {...categories} />
                <Resource name="departments" label="Departments" {...departments} />
                <Resource name="discounts" label="Discounts" {...discounts} />
                <Resource name="messages" label="Messages" {...messages} />
                <Resource name="products" label="Products" {...products} />
                {/* <Resource name="roles" list={ListGuesser} edit={EditGuesser} /> */}
                {/* <Resource name="customers" {...visitors} />
                <Resource
                name="commands"
                {...orders}
                options={{ label: 'Orders' }}
                />
                <Resource name="products" {...products} />
                <Resource name="categories" {...categories} />
            <Resource name="reviews" {...reviews} /> */}

                <Resource name="user-addresses"/>
                <Resource name="category-fields" />
            </Admin>
        </StylesProvider>
    );
};

export default App;
