import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import OrgPage from "./OrgPage";

export const OrgPageRoutes = () => {
  // Path always equal to /organizations
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/:id`} component={OrgPage} />
    </Switch>
  );
};
