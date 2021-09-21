import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {Admin} from './Router';
import Dashboard from '../views/Dashboard';
import Events from '../views/Events';
import Login from '../authentication/Login'

const App = () => {
  return (
      <Switch>
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
  )
}

export default App;