// import essential dependencies
import React from 'react'

// import stylesheets
// import "../../stylesheets/org/SecondaryButton.scss"
import Progress from './Progress.js'
import TextField from '@material-ui/core/TextField';
import SideBar from './SideBar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
// import PrimaryButton from '../PrimaryButton.js'
// import SecondaryButton from '../SecondaryButton'

const OrgLinksForm = () => {

    return (
        <div className = "form-container">
            <SideBar />
            <Progress progress_state="three"/>
            <h1>Let's link your other pages.</h1>
            <div className="org-links-form">
                {/* 3 dots or progress bar, this can be turned into a component if time permits */}
                {/* <form method="POST" target="">
                    <input type="text" name="fb_link" placeholder="https://facebook.com/gdsc.loyola" />
                    <input type="text" name="ig_link" placeholder="https://instagram.com/gdsc.loyola" />
                    <input type="text" name="twt_link" placeholder="https://twitter.com/GDSCLoyola" />
                    <input type="text" name="linkedin_link" placeholder="https://linkedin.com/company/GDSC-Loyola" />
                    <input type="text" name="website_link" placeholder="https://dscadmu.org" />
                    {/* Need to make this the submit button */}
                    {/*<SecondaryButton button_copy="Back"/>
                    <PrimaryButton button_copy="Save details" />
                </form> */}
                <p>Facebook</p>
                <TextField
                    size={'small'}
                    margin={'dense'}
                    label={'Facebook'}
                    variant={'outlined'}
                    // value={orgName}
                    style = {{width: '464px'}}
                    // onChange={(e) => {
                    //     handleFbChange
                    // }} 
                />
                <p>Instagram</p>
                <TextField
                    size={'small'}
                    margin={'dense'}
                    label={'Instagram'}
                    variant={'outlined'}
                    // value={orgName}
                    style = {{width: '464px'}}
                    // onChange={(e) => {
                    //     handleIgChange
                    // }} 
                />
                <p>Twitter</p>
                <TextField
                    size={'small'}
                    margin={'dense'}
                    label={'Twitter'}
                    variant={'outlined'}
                    // value={orgName}
                    style = {{width: '464px'}}
                    // onChange={(e) => {
                    //     handleTwitChange
                    // }} 
                />
                <p>Linkedin</p>
                <TextField
                    size={'small'}
                    margin={'dense'}
                    label={'Linkedin'}
                    variant={'outlined'}
                    // value={orgName}
                    style = {{width: '464px'}}
                    // onChange={(e) => {
                    //     handleOrgNameChange
                    // }} 
                />
                <p>Mobile</p>
                <TextField
                    size={'small'}
                    margin={'dense'}
                    label={'Mobile'}
                    variant={'outlined'}
                    // value={orgName}
                    style = {{width: '464px'}}
                    // onChange={(e) => {
                    //     handleOrgNameChange
                    // }} 
                />
                <div className="cta">
                    <Button variant="outlined">Back</Button>
                    <Button variant="contained">Save details</Button>
                </div>
                {/* <SecondaryButton button_copy="Back"/>
                <PrimaryButton button_copy="Save Details"/>  */}
            </div>
        </div>
    )
}

export default OrgLinksForm;

