import React, {useEffect} from 'react'
import Cotter from 'cotter';
import auth from './auth';
import authService from '../../services/auth.service'
import axios from 'axios';

const Login = props => {
    useEffect(() => {
        const cotter = new Cotter('aa2398ab-3950-42dd-b3d1-4e383734a5ac')
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
                registerBackend = await authService.register(res.email)
                loginBackend = await authService.login(registerBackend.data.username)
                await auth.saveToken(loginBackend.data.access)
                
                // Redirect to signup
                auth.signup(() => {
                    props.history.push("/signup/")
                })

            // Login
            } else {
                loginBackend = await authService.login(isRegistered.data.username)
                await auth.saveToken(loginBackend.data.access)

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
        <div id="cotter-form-container" style={{ width: 300, height: 300 }} />
    )
}

export default Login
