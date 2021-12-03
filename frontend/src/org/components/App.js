import React from "react";
import { Switch, Route } from "react-router-dom";
import { Admin, CreateOrg } from "./Router";
import Dashboard from "../views/Dashboard";
import Events from "../views/Events";
import Settings from "../views/Settings";
import { OrgInfo, OrgLogo, OrgLinks, Login } from "$modules/SelfSignUp/routes";

import OrgInfoOld from "./SelfSignUp/OrgInfo";
import OrgLogoOld from "./SelfSignUp/OrgLogo";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "$lib/theme";

import { OrgPageRoutes } from "$modules/OrgPage/routes/index";
import { EventPagesRoutes } from "$modules/EventPage/routes/index";
import { Landing, OrgCatalog } from "$modules/StudentLanding/routes";
import { OrgCatalogue } from "$modules/OrgCatalogue/routes"

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/organizations" component={OrgCatalogue} />

        <Route exact path="/admin/login/" component={Login} />

        {/* <Route path="/events" component={EventPagesRoutes} /> */}
        <Route
          path="/organizations"
          component={() => (
            <>
              <EventPagesRoutes />
              <OrgPageRoutes />
            </>
          )}
        />

        {/* Protected admin routes */}
        <Admin exact path="/admin/" component={Dashboard} />
        <Admin exact path="/admin/events" component={Events} />

        <Admin exact path="/admin/settings" component={Settings} />

        {/* SSU routes */}
        <Route exact path="/org-info/" component={OrgInfo} />
        <Route exact path="/org-logo/" component={OrgLogo} />

        <Route exact path="/org-info-old/" component={OrgInfoOld} />
        <Route exact path="/org-logo-old/" component={OrgLogoOld} />
        <Route exact path="/org-links/" component={OrgLinks} />
      </Switch>
    </ThemeProvider>
  );
};

export default App;
