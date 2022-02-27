import React from 'react';
import App from './App';
import '../stylesheets/index.scss';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { theme } from '$lib/theme';
import { Auth0Provider } from '@auth0/auth0-react';
import { AdminProvider } from '$lib/context/AdminContext';

const run = async () => {
  ReactDOM.render(
    <Auth0Provider
      domain="dev-i0r0l2o0.us.auth0.com"
      clientId="wezRoSYI3nSyPhGKdpKqkUGdJGEVfaq1"
      audience="http://pavilion/api"
      redirectUri={window.location.origin}
    >
      <AdminProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </AdminProvider>
    </Auth0Provider>,
    document.getElementById('app')
  );
};

run();
