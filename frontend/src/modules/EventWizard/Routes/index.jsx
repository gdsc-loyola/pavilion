import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import EventWizardPage from './EventWizardPage';
import Responses from './Responses';
import Details from './Details';
import Registration from './Registration';
export const EventWizardRoutes = () => {
  // Path always equal to /organizations
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/:eventName`} component={EventWizardPage} />
      <Route exact path={`${path}/:eventName/details`} component={Details} />
      <Route exact path={`${path}/:eventName/registration`} component={Registration} />
      <Route exact path={`${path}/:eventName/responses`} component={Responses} />
    </Switch>
  );
};
