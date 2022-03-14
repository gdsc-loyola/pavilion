import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import EventWizardPage from './EventWizardPage';
import Responses from './Responses';
import Details from './Details';
import Registration from './Registration';
import Preview from './Preview';
export const EventWizardRoutes = () => {
  // Path always equal to /organizations
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/:eventName`} component={EventWizardPage} />
<<<<<<< HEAD:frontend/src/modules/EventWizard/routes/index.jsx
      <Route exact path={`${path}/:eventName/details`} component={Responses} />
      <Route exact path={`${path}/:eventName/registration`} component={Responses} />
=======
      <Route exact path={`${path}/:eventName/details`} component={Details} />
      <Route exact path={`${path}/:eventName/preview`} component={Preview} />
      <Route exact path={`${path}/:eventName/registration`} component={Registration} />
>>>>>>> feature/charles/registration:frontend/src/modules/EventWizard/Routes/index.jsx
      <Route exact path={`${path}/:eventName/responses`} component={Responses} />
    </Switch>
  );
};
