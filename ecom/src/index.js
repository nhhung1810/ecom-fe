import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './index.css';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, {persistor} from "./redux/store";


import HomePage from "./pages/home/homepage.js";
import Dashboard from './pages/dashboard/dashboard';
import LoginDash from './pages/dashboard/login.dashboard';

const App = () => {
    return (
        <Router>
            <div>   
                <Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route path="/dashboard">
                        <Dashboard/>
                    </Route>
                    <Route path="/logindash">
                        <LoginDash/>
                    </Route>
                </Switch>
            </div>
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
