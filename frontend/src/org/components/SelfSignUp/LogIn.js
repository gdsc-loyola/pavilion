// import essential dependencies
import React from 'react'
import TextField  from '@material-ui/core/Textfield'
// import stylesheets
// import "../../stylesheets/org/SecondaryButton.scss"
import PrimaryButton from '../PrimaryButton.js'

const LogInForm = () => {
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
                <div id="cotter-form-container" style={{ width: 300, height: 300 }} />
                {/* <PrimaryButton button_copy="Log In"/> */}
            </div>
        </div>
    )
}

export default LogInForm;

