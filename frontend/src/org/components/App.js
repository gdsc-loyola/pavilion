import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {Admin, CreateOrg} from './Router';
import Dashboard from '../views/Dashboard';
import Events from '../views/Events';
import Login from './SelfSignUp/LogIn';
import OrgInfo from './SelfSignUp/OrgInfo'
import OrgLogo from './SelfSignUp/OrgLogo'
import OrgLinks from './SelfSignUp/OrgLinks'

const App = () => {
  return (
      <Switch>
        <Route exact path="/admin/login/" component={Login}/>

        {/* Protected admin routes */}
        <Admin 
          exact path="/admin/"
          component={Dashboard}
        />
        <Admin 
          exact path="/admin/events"
          component={Events}
        />

        {/* SSU routes */}
        <CreateOrg exact path="/org-info/" component={OrgInfo}/>
        <CreateOrg exact path="/org-logo/" component={OrgLogo}/>
        <CreateOrg exact path="/org-links/" component={OrgLinks}/>
        
      </Switch>
  )
}

export default App;