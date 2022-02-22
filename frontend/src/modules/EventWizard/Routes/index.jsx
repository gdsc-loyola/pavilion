import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import EventWizardPage from './EventWizardPage';
import Responses from './Responses';

export const EventWizardRoutes = () => {
  // Path always equal to /organizations
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/:eventName/responses`} component={Responses} />
      <Route exact path={`${path}/:eventName`} component={EventWizardPage} />
    </Switch>
  );
};
