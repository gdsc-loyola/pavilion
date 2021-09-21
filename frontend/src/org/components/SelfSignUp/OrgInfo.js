// import essential dependencies
import React from 'react'

// import stylesheets
import "../../../../stylesheets/PrimaryButton.scss";
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

const OrgInfoForm = () => {
    const [orgName, setOrgName] = React.useState('');

    const handleOrgNameChange = (e) => {
        setOrgName(e.target.value);
    }

    const handleOrgShorthandChange = (e) => {
        set_org_name(e.target.value);
    }

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
                    style = {{width: '464px'}}
                    onChange={(e) => {
                        handleOrgNameChange
                    }}
                />
                <TextField
                    // className={}
                    size={'small'}
                    margin={'dense'}
                    label={'Shorthand Name (ex. GDSC-L)*'}
                    variant={'outlined'}
                    style = {{width: '464px'}}
                    // value={org_name}
                    onChange={(e) => {
                        handleOrgShorthandChange
                    }}
                />
                <TextField
                    // className={}
                    size={'small'}
                    margin={'dense'}
                    label={'Short Description*'}
                    variant={'outlined'}
                    style = {{width: '464px'}}
                    multiline
                    rows={8}
                    // value={org_name}
                    // onChange={(e): void => {
                    // }}
                />
                <FormControl variant="outlined" margin="dense">
                <InputLabel>Org body*</InputLabel>
                    <Select
                        variant={'outlined'}
                        // value={age}
                        // onChange={handleChange}
                        margin="dense"
                        label={'Org Body*'}
                        style = {{width: '464px'}}
                    >
                        <MenuItem value="COA">COA</MenuItem>
                        <MenuItem value="LIONS">LIONS</MenuItem>
                        <MenuItem value="Sanggu">Sanggu</MenuItem>
                    </Select>
                </FormControl>
                <Box mt={3}>
                    <Button variant="outlined" color="primary">Next</Button>
                </Box>
            </div>
        </div>
    )
}

export default OrgInfoForm;
