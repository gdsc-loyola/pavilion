// import essential dependencies
import React from 'react';

// import stylesheets
import Button from '@material-ui/core/Button';
import SideBar from './SideBar';
import Progress from './Progress';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core';

const OrgLogoForm = (props) => {
  // const [orgLogo, setOrgLogo] = React.useState('');

  // const handleOrgLogoChange = (e) => {
  //     setOrgLogo(e.target.value);
  // }

  const [orgForm, setOrgForm] = React.useState(props.location.state.detail);
  const [orgLogoFile, setOrgLogoFile] = React.useState({ file: '../../static/assets/image.png' });

  const [logoUploaded, setLogoUploaded] = React.useState(false);

  function uploadChange(evt) {
    setOrgLogoFile({
      file: URL.createObjectURL(evt.target.files[0]),
    });
    setLogoUploaded(true);
  }

  console.log(orgForm);

  return (
    <div className="form-container">
      <SideBar />
      <Progress progress_state="two" />
      <h1>Upload your org's logo!</h1>
      <section className="org-logo-form">
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          id="org_logo_input"
          onChange={(evt) => uploadChange(evt)}
        />
        <label htmlFor="org_logo_input">
          {/* <div className="org_logo_upload" onClick={clear()}> */}
          <div className="org_logo_upload">
            <img
              src={`${logoUploaded ? orgLogoFile.file : '../../static/assets/image.png'}`}
              alt=""
            />
            <p
              style={{
                display: logoUploaded ? 'none' : 'flex',
              }}
            >
              Browse through your files
            </p>
          </div>
        </label>
      </section>
      <Button variant="outlined">Back</Button>
      <Box mt={3}>
        <Button variant="outlined" color="primary">
          Next
        </Button>
      </Box>
    </div>
  );
};

export default OrgLogoForm;
