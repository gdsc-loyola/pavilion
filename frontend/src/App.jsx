import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Admin } from './org/components/Router';
import Dashboard from './org/views/Dashboard';
import Settings from './org/views/Settings';
import { OrgInfo, OrgLogo, OrgLinks, Login } from '$modules/SelfSignUp/routes';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '$lib/theme';

import { OrgPageRoutes } from '$modules/OrgPage/routes/index';
import { EventPagesRoutes } from '$modules/EventPage/routes/index';
import { Landing } from '$modules/StudentLanding/routes';
import { OrgCatalogue } from '$modules/OrgCatalogue/routes';
import { EventCreationRoutes } from '$modules/EventCreation';
import { DashboardRoutes } from '$modules/Dashboard';
import { EventWizardRoutes } from '$modules/EventWizard';

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
        <Admin exact path="/admin/events/" component={EventCreationRoutes} />
        <Admin exact path="/admin/settings/" component={Settings} />

        <Route
          path="/admin/events"
          component={() => (
            <>
              <EventWizardRoutes />
            </>
          )}
        />

        {/* SSU routes */}
        <Admin exact path="/org-info/" component={OrgInfo} />
        <Admin exact path="/org-logo/" component={OrgLogo} />
        <Admin exact path="/org-links/" component={OrgLinks} />
      </Switch>
    </ThemeProvider>
  );
};

export default App;
