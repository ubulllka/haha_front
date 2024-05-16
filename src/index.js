import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {store} from './store/store'
import {Provider} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'
import './index.css';
import {disableReactDevTools} from "@fvilers/disable-react-devtools";

disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);

