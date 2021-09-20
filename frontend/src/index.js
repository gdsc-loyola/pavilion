import App from './org/components/App';
import '../stylesheets/index.scss';
import ReactDOM from 'react-dom'
import React from 'react';
import {BrowserRouter} from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('app')
)
