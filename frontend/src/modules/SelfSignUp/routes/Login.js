import React, { useEffect } from "react";
import Cotter from "cotter";
import * as auth from "$lib/auth";
import axios from "axios";

const Login = (props) => {
  useEffect(() => {
    const cotter = new Cotter("aa2398ab-3950-42dd-b3d1-4e383734a5ac");
    cotter
      .withFormID("form_default") // Use customization for form "form_default"
      .signInWithLink() // use .signInWithOTP() to send an OTP
      .showEmailForm() // use .showPhoneForm() to send magic link to a phone number
      .then(async (res) => {
        const user = await auth.getUser({ email: res.email });

        // Signup
        if (user.data === "signup") {
          const registerRes = await auth.register({ email: res.email });
          await auth.login({
            email: registerRes.data.username,
          });

          props.history.push("/org-info/");

          // Login
        } else {
          await auth.login(user.data.username);

          axios.defaults.headers.common["Authorization"] = auth.getToken();

          props.history.push("/admin/");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="form-container login">
      <div className="blue-bg"></div>
      <div className="login-form">
        <h1>Log in to the Pavilion</h1>
        {/* <input type="text" name="email" placeholder="Organization email*" />
                <input type="password" name="password" placeholder="Password*" />
                <p className="error_msg">Please fill out the fields to log in to the Pavilion.</p> */}
        {/* <TextField
                    // className={}
                    size={'small'}
                    margin={'dense'}
                    label={'Email'}
                    variant={'outlined'}
                    // value={orgName}
                    style = {{width: '464px'}}
                    onChange={(e) => {
                        handleOrgNameChange
                    }}
                /> */}
        <div id="cotter-form-container" style={{ width: 300, height: 150 }} />
        {/* <PrimaryButton button_copy="Log In"/> */}
      </div>
    </div>
  );
};

export default Login;
