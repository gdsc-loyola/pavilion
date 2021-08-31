// import essential dependencies
import React from 'react'

// import stylesheets
import "../../stylesheets/org/SecondaryButton.scss"
import PrimaryButton from './PrimaryButton'

const WelcomeForm = () => {
    return (
        <div class="welcome-form">
            <h1>Welcome to the Pavilion.</h1>
            <form method="POST" target="">
                <input type="text" name="email" placeholder="Organization email" />
                <input type="password" name="password" placeholder="Password" />
                <input type="password" name="confirm_password" placeholder="Confirm password" />
                <input type="checkbox" name="auth_org_rep" />
                <span>I am an authorized representative of this organization.</span>
                {/* <input type="submit"><PrimaryButton button_copy="Create an account"/> */}
                <p>Please fill out the fields to create an account.</p>
            </form>
        </div>
    )
}

export default WelcomeForm;

