import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import EventWizardPage from './EventWizardPage';
import Responses from './Responses';
import Details from './Details';
import Registration from './Registration';
import Preview from './Preview';
export const EventWizardRoutes = () => {
  // Path always equal to /admin/events
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/:id`} component={EventWizardPage} />
      <Route exact path={`${path}/:id/details`} component={Details} />
      <Route exact path={`${path}/:id/preview`} component={Preview} />
      <Route exact path={`${path}/:id/registration`} component={Registration} />
      <Route exact path={`${path}/:id/responses`} component={Responses} />
    </Switch>
  );
};
