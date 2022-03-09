import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '$stylesheets/org/SelfSignUp.scss';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import http from '$lib/http';
import { useAdminUser } from '$lib/context/AdminContext';

const Login = () => {
  const { loginWithPopup } = useAuth0();
  const { refetchAll, accessToken } = useAdminUser();

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
            await refetchAll();

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
