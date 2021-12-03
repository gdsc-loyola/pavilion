import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import EventPage from "./EventPage";

export const EventPagesRoutes = () => {
  // Path always equal to /organizations
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/:shortName/:id`} component={EventPage} />
    </Switch>
  );
};
