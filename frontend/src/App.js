import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Admin } from './org/components/Router';
import Dashboard from './org/views/Dashboard';
import Events from './org/views/Events';
import Settings from './org/views/Settings';
import { OrgInfo, OrgLogo, OrgLinks, Login } from '$modules/SelfSignUp/routes';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '$lib/theme';

import { OrgPageRoutes } from '$modules/OrgPage/routes/index';
import { EventPagesRoutes } from '$modules/EventPage/routes/index';
import { Landing } from '$modules/StudentLanding/routes';
import { OrgCatalogue } from '$modules/OrgCatalogue/routes';
import { Comp, EventCreationRoutes } from '$modules/EventCreation';
import { DashboardRoutes } from '$modules/Dashboard';

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
        <Admin exact path="/admin/" component={DashboardRoutes} />

        <Admin exact path="/old/admin/" component={Dashboard} />
        <Admin exact path="/admin/events/" component={Comp} />
        <Admin exact path="/admin/settings/" component={Settings} />

        {/* SSU routes */}
        <Route exact path="/org-info/" component={OrgInfo} />
        <Route exact path="/org-logo/" component={OrgLogo} />
        <Route exact path="/org-links/" component={OrgLinks} />
      </Switch>
    </ThemeProvider>
  );
};

export default App;
