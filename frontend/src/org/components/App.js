import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import {Admin} from './Router';
import { CotterProvider, LoginForm } from 'cotter-react'
import SessionStorageService from '../authentication/SessionStorageService';
import Dashboard from '../views/Dashboard';
import Events from '../views/Events';
import Login from '../authentication/Login'

const App = () => {
  // const onLoginSuccess = async (payload) => {
  //   console.log("LOGINSUCCESS", payload)
  //   try {
  //     auth.login(() => {
  //       props.history.push("/admin/")
  //     })
  //   } catch(err) {
  //     console.log(err)
  //   }
  // }

  // const onLoginError = (err) => {
  //   alert("Login Error! See the console log for more info.");
  //   console.log(err);
  // }

  // const onSignupBegin = async (payload) => {
  //   SessionStorageService.setUser(payload.identifier)
  // }

  return (
    // <CotterProvider apiKeyID='aa2398ab-3950-42dd-b3d1-4e383734a5ac'>
      <Switch>
        {/* <LoginForm 
          path='/admin/login' 
          formID={'form_default'}
          type='EMAIL'
          authMethod='MAGIC_LINK'
          onSuccess={onLoginSuccess}
          onError={onLoginError}
          onBegin={onSignupBegin}
        /> */}
        <Route exact path="/admin/login/" component={Login}/>
        <Admin 
          exact path="/admin/"
          component={Dashboard}
        />
        <Admin 
          exact path="/admin/events"
          component={Events}
        />
      </Switch>
    // </CotterProvider>
  )
}

export default App;