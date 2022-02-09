import React, { useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import '$stylesheets/org/SelfSignUp.scss';
import { Button } from '@mui/material';

const Login = (props) => {
  const { loginWithRedirect, getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently({ audience: 'http://pavilion/api' }).then(async (accessToken) => {
        const metadataResponse = await axios(`http://localhost:8000/api/orgs/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        });
      });
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  return (
    <div className="form-container login">
      <div className="blue-bg"></div>
      <div className="login-form">
        <h1>Log in to the Pavilion</h1>
        <Button onClick={() => loginWithRedirect()}>Log in</Button>
      </div>
    </div>
  );
};

export default Login;
