// import essential dependencies
import React from 'react';

// import stylesheets
import '$stylesheets/org/SelfSignUp.scss';
import PrimaryButton from '../PrimaryButton.js';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const SignUpForm = () => {
  return (
    // Will return to this. For now it's pushed back and will focus on Log In.
    <div className="form-container login">
      <div className="blue-bg"></div>
      <form method="POST" target="" className="login-form">
        <div>
          <h1>Welcome to the Pavilion.</h1>
          <p>Sign up now to create an account for your organization.</p>
        </div>
        <div className="inputs">
          <TextField type="text" name="email" label="Organization Email*" />
          <TextField type="password" name="password" label="Password*" />
          <TextField type="password" name="confirm_password" label="Confirm Password*" />
        </div>

        <div className="checkboxes">
          <input type="checkbox" name="auth_org_rep" />
          <span>I am an authorized representative of this organization.</span>
        </div>
        {/* <input type="submit"><PrimaryButton button_copy="Create an account"/> */}
        {/* <p className="error_msg">Please fill out the fields to create an account.</p> */}
        <Button sx={{ alignSelf: 'stretch' }}>Create an account</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
