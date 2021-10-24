import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import './index.css';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, {persistor} from "./redux/store";

import HomePage from "./pages/home/homepage.js";
import Dashboard from './pages/seller/dashboard/dashboard';
import LoginDash from './pages/seller/login/login.dashboard';
import { ProductList } from './pages/product/product.list';
import { ProductInfo } from './pages/info/product.info';
import { CartPage } from './pages/cart/cart';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route path="/dashboard">
                    <Dashboard/>
                </Route>
                <Route path="/product">
                    <ProductList/>
                </Route>
                <Route path="/info">
                    <ProductInfo/>
                </Route>
                <Route path="/cart">
                    <CartPage />
                </Route>
                <Route path="/logindash">
                    <LoginDash/>
                </Route>
            </Switch>
        </Router>
    )
}

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

// export default App;
