// import essential dependencies
import React from 'react'

// import stylesheets
import "../../stylesheets/org/SecondaryButton.scss"
import PrimaryButton from './PrimaryButton.js'

const LogInForm = () => {
    return (
        <div class="welcome-form">
            <h1>Log in to the Pavilion.</h1>
            <form method="POST" target="">
                <input type="text" name="email" placeholder="Organization email*" />
                <input type="password" name="password" placeholder="Password*" />
                <p className="error_msg">Please fill out the fields to log in to the Pavilion.</p>
                <PrimaryButton button_copy="Log In"/>
            </form>
        </div>
    )
}

export default LogInForm;

