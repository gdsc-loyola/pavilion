// import essential dependencies
import React from 'react'

// import stylesheets
import Button from '@material-ui/core/Button';
import SideBar from './SideBar';
import Progress from './Progress';
import TextField from '@material-ui/core';

const OrgLogoForm = () => {

    // const [orgLogo, setOrgLogo] = React.useState('');

    // const handleOrgLogoChange = (e) => {
    //     setOrgLogo(e.target.value);
    // }

    return (
        <div className="form-container">
            <SideBar />
            <Progress progress_state="two"/>
            <h1>Upload your org's logo!</h1>
            {/* <TextField
                size={'small'}
                margin={'dense'}
                label={'Organization Logo*'}
                variant={'outlined'}
                // value={orgLogo}
                style = {{width: '464px'}}
                // onChange={ (e) => {
                //     handleOrgLogoChange
                // }}
            /> */}
            <section className="org-logo-form">
                <input
                    type="file"
                    accept="image/*"
                    style={{display: 'none'}}
                    id="org_logo_input"
                />
                <label htmlFor="org_logo_input">
                    <div className="org_logo_upload">
                    <img src="../../static/assets/image.png" alt=""/>
                        <p>Browse through your files</p>
                    </div>
                </label>
            </section>
        </div>
    )
}

export default OrgLogoForm;

