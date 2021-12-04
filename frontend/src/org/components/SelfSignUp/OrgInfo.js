// import essential dependencies
import React from 'react';
import auth from '../../authentication/auth';

// import stylesheets
import '../../../../stylesheets/PrimaryButton.scss';
import PrimaryButton from '../../components/PrimaryButton.js';
import Progress from './Progress.js';
import SideBar from './SideBar';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { spacing } from '@material-ui/system';

// const useStyles = makeStyles((theme) => ({
//     formControl: {
//       margin: theme.spacing(20%),
//       minWidth: 120,
//     },
//     selectEmpty: {
//       marginTop: theme.spacing(2),
//     },
//   }));

// const classes = useStyles();

const OrgInfoForm = (props) => {
  const [orgName, setOrgName] = React.useState('');
  const [orgShortName, setOrgShortName] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [orgBody, setOrgBody] = React.useState('');
  const [orgForm, setOrgForm] = React.useState({
    name: null,
    short_name: null,
    desc: null,
    org_body: null,
    logo: null,
    facebook: null,
    instagram: null,
    twitter: null,
    linkedin: null,
    website: null,
  });

  const handleOrgNameChange = (e) => {
    setOrgName(e);
    setOrgForm((prevState) => {
      return {
        ...prevState,
        name: e,
      };
    });
  };

  const handleOrgShorthandChange = (e) => {
    setOrgShortName(e);
    setOrgForm((prevState) => {
      return {
        ...prevState,
        short_name: e,
      };
    });
  };

  const handleOrgDescChange = (e) => {
    setDesc(e);
    setOrgForm((prevState) => {
      return {
        ...prevState,
        desc: e,
      };
    });
  };

  const handleOrgBodyChange = (e) => {
    setOrgBody(e);
    setOrgForm((prevState) => {
      return {
        ...prevState,
        org_body: e,
      };
    });
  };

  const moveToOrgLogo = () => {
    props.history.push({
      pathname: '/org-logo/',
      state: { detail: orgForm },
    });
  };

  return (
    <div className="form-container">
      <SideBar />
      <Progress progress_state="one" />
      <h1>Tell us more about your organization.</h1>
      <div className="org-info-form">
        <TextField
          // className={}
          size={'small'}
          margin={'dense'}
          label={'Organization Name*'}
          variant={'outlined'}
          value={orgName}
          style={{ width: '464px' }}
          onChange={(e) => handleOrgNameChange(e.target.value)}
        />
        <TextField
          // className={}
          size={'small'}
          margin={'dense'}
          label={'Shorthand Name (ex. GDSC-L)*'}
          variant={'outlined'}
          style={{ width: '464px' }}
          value={orgShortName}
          onChange={(e) => {
            handleOrgShorthandChange(e.target.value);
          }}
        />
        <TextField
          // className={}
          size={'small'}
          margin={'dense'}
          label={'Short Description*'}
          variant={'outlined'}
          style={{ width: '464px' }}
          multiline
          rows={8}
          value={desc}
          onChange={(e) => {
            handleOrgDescChange(e.target.value);
          }}
        />
        <FormControl variant="outlined" margin="dense">
          <InputLabel>Org body*</InputLabel>
          <Select
            variant={'outlined'}
            // value={age}
            // onChange={handleChange}
            margin="dense"
            label={'Org Body*'}
            style={{ width: '464px' }}
            value={orgBody}
            onChange={(e) => handleOrgBodyChange(e.target.value)}
          >
            <MenuItem value="COA">COA</MenuItem>
            <MenuItem value="LIONS">LIONS</MenuItem>
            <MenuItem value="Sanggu">Sanggu</MenuItem>
          </Select>
        </FormControl>
        <Box mt={3}>
          <Button variant="outlined" color="primary" onClick={moveToOrgLogo}>
            Next
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default OrgInfoForm;
