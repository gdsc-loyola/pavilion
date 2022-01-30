import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardPage from './DashboardPage';

export const DashboardRoutes = () => {
  return (
    <Switch>
      <Route exact path="/admin" component={DashboardPage} />
    </Switch>
  );
};
