import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Admin from './Router';
import { CotterProvider, LoginForm } from 'cotter-react'
import SessionStorageService from '../auth/SessionStorageService';

const App = () => {
  const onLoginSuccess = async (payload) => {
    console.log(payload)
  }

  const onLoginError = (err) => {
    alert("Login Error! See the console log for more info.");
    console.log(err);
  }

  const onSignupBegin = async (payload) => {
    SessionStorageService.setUser(payload.identifier)
  }

  return (
    <CotterProvider apiKeyID='aa2398ab-3950-42dd-b3d1-4e383734a5ac'>
      <BrowserRouter>
        <Switch>
          <LoginForm 
            path='/admin/login' 
            formID={'form_default'}
            type='EMAIL'
            authMethod='OTP'
            onSuccess={onLoginSuccess}
            onError={onLoginError}
            onBegin={onSignupBegin}
          />
          <Admin />
        </Switch>
      </BrowserRouter>
    </CotterProvider>
  )
}

export default App;