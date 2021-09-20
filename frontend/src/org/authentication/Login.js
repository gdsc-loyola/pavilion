import React, {useEffect} from 'react'
import Cotter from 'cotter';
import auth from './auth';

const Login = props => {
    useEffect(() => {
        const cotter = new Cotter('aa2398ab-3950-42dd-b3d1-4e383734a5ac')
        cotter
          .withFormID("form_default") // Use customization for form "form_default"
          .signInWithLink() // use .signInWithOTP() to send an OTP
          .showEmailForm()  // use .showPhoneForm() to send magic link to a phone number 
          .then(res => {
            console.log(res) // show the response in our state
            
            auth.login(() => {
                props.history.push("/admin/")
            })
          })
          .catch(err => console.log(err))
    }, [])

    return (
        <div id="cotter-form-container" style={{ width: 300, height: 300 }} />
        // <button 
        //     onClick={() => {
        //         auth.login(() => {
        //             props.history.push("/admin/")
        //         })
        //     }}>
        //     login
        // </button>
    )
}

export default Login
