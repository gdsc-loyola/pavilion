// import essential dependencies
import React from 'react'

// import stylesheets
import "../../stylesheets/org/SecondaryButton.scss"
import PrimaryButton from '../PrimaryButton.js'
import SecondaryButton from '../SecondaryButton'

const OrgInfoForm = () => {
    return (
        <div className="org-logo-form">
            {/* 3 dots or progress bar, this can be turned into a component if time permits */}
            <ul>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <h1>Upload your org's logo!</h1>
            <form method="POST" target="">
                <input type="text" name="fb_link" placeholder="https://facebook.com/gdsc.loyola" />
                <input type="text" name="ig_link" placeholder="https://instagram.com/gdsc.loyola" />
                <input type="text" name="twt_link" placeholder="https://twitter.com/GDSCLoyola" />
                <input type="text" name="linkedin_link" placeholder="https://linkedin.com/company/GDSC-Loyola" />
                <input type="text" name="website_link" placeholder="https://dscadmu.org" />
                {/* Need to make this the submit button */}
                <SecondaryButton button_copy="Back"/>
                <PrimaryButton button_copy="Save details" />
            </form>
        </div>
    )
}

export default OrgInfoForm;

