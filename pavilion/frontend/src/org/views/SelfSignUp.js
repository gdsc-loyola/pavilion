import React from 'react' 
// import LogInForm from "../components/SelfSignUp/LogIn"
import OrgInfoForm from '../components/SelfSignUp/OrgInfo.js'
import "../../../stylesheets/org/SelfSignUp.scss"
import OrgLinksForm from '../components/SelfSignUp/OrgLinks.js'
import OrgLogoForm from '../components/SelfSignUp/OrgLogo.js'

const SSUOrgSide = () => {
    return (
        <div className="self-sign-up">
            <OrgLogoForm />
        </div>
    )
}

export default SSUOrgSide;
