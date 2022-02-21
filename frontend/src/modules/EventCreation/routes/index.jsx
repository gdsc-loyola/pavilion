import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Events from './Events';

export const EventCreationRoutes = () => {
  return (
    <Switch>
      <Route exact path={`/admin/events/`} component={Events} />
    </Switch>
  );
};
