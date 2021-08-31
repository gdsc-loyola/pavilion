// import essential dependencies
import React from 'react'

// import stylesheets
import "../../stylesheets/org/SecondaryButton.scss"
import PrimaryButton from '../PrimaryButton.js'

const OrgInfoForm = () => {
    return (
        <div className="org-info-form">
            {/* 3 dots or progress bar, this can be turned into a component if time permits */}
            <ul>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <h1>Tell us more about your organization.</h1>
            <form method="POST" target="">
                <input type="text" name="org_name" placeholder="Organization Name*" />
                <input type="text" name="org_shorthand" placeholder="Shorthand Name (ex. GDSC-L)*" />
                <input type="textarea" name="org_short_desc" placeholder="Short Description*" />
                <select name="org_body">
                    <option value="COA">COA</option>
                    <option value="LIONS">LIONS</option>
                    <option value="Sanggu">Sanggu</option>
                </select>
                <p className="error_msg">Please fill out the fields.</p>
                <PrimaryButton button_copy="Next"/>
            </form>
        </div>
    )
}

export default OrgInfoForm;

