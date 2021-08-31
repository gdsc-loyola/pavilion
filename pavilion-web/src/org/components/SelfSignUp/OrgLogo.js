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
                <div className="draggable-area">
                    <input type="file" name="org_name" placeholder="Organization Name*" />
                </div>
                <p>Suggested ratio - 1:1 (ex. 800x800px)</p>
                <p className="error_msg">Please fill out the fields.</p>
                <SecondaryButton button_copy="Back" />
                {/* Need to make this the submit button */}
                <PrimaryButton button_copy="Next"/>
            </form>
        </div>
    )
}

export default OrgInfoForm;

