import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,HashRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import configureStore from './redux/configureStore';
import App from "./App";

require('./styles');



const store = configureStore(window.REDUX_STATE)


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('Root')
)