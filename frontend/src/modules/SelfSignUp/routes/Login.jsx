import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '$stylesheets/org/SelfSignUp.scss';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import http from '$lib/http';

const Login = () => {
  const { loginWithPopup, getAccessTokenSilently } = useAuth0();

  const router = useHistory();

  return (
    <div className="form-container login">
      <div className="blue-bg"></div>
      <div className="login-form">
        <h1>Log in to the Pavilion</h1>
        <Button
          fullWidth
          onClick={async () => {
            await loginWithPopup();
            const token = await getAccessTokenSilently();

            if (!token) {
              return;
            }

            // This call to the api creates a user row in the table for newly signed up users
            await http.get(`/orgs/`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            });

            router.push('/admin');
          }}
        >
          Log in
        </Button>
      </div>
    </div>
  );
};

export default Login;
