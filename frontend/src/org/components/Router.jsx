import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export const Admin = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <>
      <Route
        {...rest}
        render={(props) => {
          // if (isLoading) {
          //   return null;
          // }
          // if (isAuthenticated) {
          return <Component {...props} />;
          // }

          // return <Redirect to="/admin/login " />;
        }}
      />
    </>
  );
};
