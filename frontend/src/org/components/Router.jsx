import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useAdminUser } from '$lib/context/AdminContext';

const adminPathRegex = /^\/admin(\/|$)/;
const orgFormPathRegex = /^\/org-\w+(\/|$)/;

const checkPathKind = (path) => {
  if (adminPathRegex.test(path)) {
    return 'admin';
  }

  if (orgFormPathRegex.test(path)) {
    return 'orgForm';
  }
  return '';
};
export const Admin = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth0();
  const location = useLocation();

  const pathKind = checkPathKind(location.pathname);

  const admin = useAdminUser();

  return (
    <>
      <Route
        {...rest}
        render={(props) => {
          if (admin.isLoading) {
            return null;
          }
          if (isAuthenticated) {
            if (!admin.hasOrg && pathKind === 'admin') {
              return <Redirect to="/org-info/" />;
            }

            if (admin.hasOrg && pathKind === 'orgForm') {
              return <Redirect to="/admin/" />;
            }

            return <Component {...props} />;
          }
          return <Redirect to="/admin/login" />;
        }}
      />
    </>
  );
};
