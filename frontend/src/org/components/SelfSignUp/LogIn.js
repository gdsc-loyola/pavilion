import React, {useEffect} from 'react'
import Cotter from 'cotter';
import auth from '../../authentication/auth';
import authService from '../../../services/auth.service'
import "../../../../stylesheets/org/SelfSignUp.scss"
import axios from 'axios';

const Login = props => {
    useEffect(() => {
        const cotter = new Cotter('aa2398ab-3950-42dd-b3d1-4e383734a5ac') //process.env.ENV VARIABle
        cotter
          .withFormID("form_default") // Use customization for form "form_default"
          .signInWithLink() // use .signInWithOTP() to send an OTP
          .showEmailForm()  // use .showPhoneForm() to send magic link to a phone number 
          .then(async (res) => {
            let registerBackend
            let loginBackend

            const isRegistered = await authService.get(res.email)

            // Signup
            if (isRegistered.data === "signup") {
                registerBackend = await authService.register(res.email) // Store email in django backend
                loginBackend = await authService.login(registerBackend.data.username) 
                await auth.saveToken(loginBackend.data.access) // Sace token in session storage
                
                // Redirect to signup
                auth.signup(() => {
                    props.history.push("/org-info/")
                })

            // Login
            } else {
                loginBackend = await authService.login(isRegistered.data.username)
                await auth.saveToken(loginBackend.data.access) // Save token in session storage

                // Redirect to login
                auth.login(() => {
                    axios.defaults.headers.common['Authorization'] = auth.getToken()
                    props.history.push("/admin/")
                })
            }
        })
        .catch(err => console.log(err))
    }, [])

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
    )
}

export default Login
