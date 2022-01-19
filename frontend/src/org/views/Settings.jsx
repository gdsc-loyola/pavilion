import React, { useEffect } from 'react';
import DashboardBase from '../components/DashboardBase';
import '../../../stylesheets/org/Settings.scss';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OrgsDataService from '../../services/orgs.service';
import { styled } from '@mui/material';
import { colors } from '$lib/theme';
const Settings = () => {
  const FormField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: colors.gray[400],
      },
    },
  });

  const StyledControl = styled(FormControl)({
    '& .MuiInputBase-root': {
      '& fieldset': {
        borderColor: colors.gray[400],
      },
    },
  });

  const [orgLogoFile, setOrgLogoFile] = React.useState({ file: '../../static/assets/image.png' });
  const [logoUploaded, setLogoUploaded] = React.useState(false);
  const [orgForm, setOrgForm] = React.useState({
    name: '',
    short_name: '',
    desc: '',
    org_body: '',
    logo: '',
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    website: '',
  });

  useEffect(() => {
    OrgsDataService.get(1).then((res) => {
      setOrgForm({
        name: res.data.name,
        short_name: res.data.short_name,
        desc: res.data.desc,
        org_body: res.data.org_body,
        logo: res.data.logo,
        facebook: res.data.facebook,
        instagram: res.data.instagram,
        twitter: res.data.twitter,
        linkedin: res.data.linkedin,
        website: res.data.website,
      });
    });
  }, []);

  const uploadChange = (evt) => {
    setOrgLogoFile({
      file: URL.createObjectURL(evt.target.files[0]),
    });
    setLogoUploaded(true);
  };

  const handleOrgNameChange = (e) => {
    setOrgForm((prevState) => {
      return {
        ...prevState,
        name: e,
      };
    });
  };

  const handleOrgShortHandChange = (e) => {
    setOrgForm((prevState) => {
      return {
        ...prevState,
        short_name: e,
      };
    });
  };

  const handleOrgDescChange = (e) => {
    setOrgForm((prevState) => {
      return {
        ...prevState,
        desc: e,
      };
    });
  };

  const handleOrgBodyChange = (e) => {
    setOrgForm((prevState) => {
      return {
        ...prevState,
        org_body: e,
      };
    });
  };

  const handleFacebookChange = (e) => {
    setOrgForm((prevState) => {
      return {
        ...prevState,
        facebook: e,
      };
    });
  };

  const handleTwitterChange = (e) => {
    setOrgForm((prevState) => {
      return {
        ...prevState,
        twitter: e,
      };
    });
  };

  const handleInstagramChange = (e) => {
    setOrgForm((prevState) => {
      return {
        ...prevState,
        instagram: e,
      };
    });
  };

  const handleLinkedInChange = (e) => {
    setOrgForm((prevState) => {
      return {
        ...prevState,
        linkedin: e,
      };
    });
  };

  const handleWebsiteChange = (e) => {
    setOrgForm((prevState) => {
      return {
        ...prevState,
        website: e,
      };
    });
  };

  return (
    <div>
      <DashboardBase />
      <div className="settings">
        <h1 className="title">Org Information</h1>
        <FormField
          label={'Organization Name*'}
          margin="dense"
          variant={'outlined'}
          value={orgForm.name}
          style={{ width: '464px' }}
          onChange={(e) => {
            handleOrgNameChange(e.target.value);
          }}
        />
        <FormField
          label={'Shorthand Name*'}
          margin="dense"
          value={orgForm.short_name}
          variant={'outlined'}
          style={{ width: '464px' }}
          onChange={(e) => {
            handleOrgShortHandChange(e.target.value);
          }}
        />
        <FormField
          label={'Short Description*'}
          value={orgForm.desc}
          margin="dense"
          variant={'outlined'}
          style={{ width: '464px' }}
          multiline
          rows={8}
          onChange={(e) => {
            handleOrgDescChange(e.target.value);
          }}
        />
        <StyledControl variant="outlined" margin="dense">
          <InputLabel>Org body*</InputLabel>
          <Select
            variant={'outlined'}
            margin="dense"
            label={'Org Body*'}
            style={{ width: '464px' }}
            value={orgForm.org_body}
            onChange={(e) => handleOrgBodyChange(e.target.value)}
          >
            <MenuItem value="COA">COA</MenuItem>
            <MenuItem value="LIONS">LIONS</MenuItem>
            <MenuItem value="Sanggu">Sanggu</MenuItem>
          </Select>
        </StyledControl>
        <h1 className="body-title">Org Logo</h1>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          id="org_logo_input"
          onChange={(evt) => uploadChange(evt)}
        />
        <label htmlFor="org_logo_input">
          <div className="org_logo_upload">
            <img
              src={`${logoUploaded ? orgLogoFile.file : '../../static/assets/image.png'}`}
              alt=""
            />
          </div>
        </label>
        <p className="image-subtitle">Suggested ratio — 1:1 (ex. 800x800px)</p>
        <h1 className="body-title">Org Social Media</h1>
        <h5 className="social-media-header">Facebook</h5>
        <FormField
          margin="dense"
          variant={'outlined'}
          value={orgForm.facebook}
          style={{ width: '464px' }}
          onChange={(e) => {
            handleFacebookChange(e.target.value);
          }}
        />
        <h5 className="social-media-header">Instagram</h5>
        <FormField
          margin="dense"
          variant={'outlined'}
          value={orgForm.instagram}
          style={{ width: '464px' }}
          onChange={(e) => {
            handleInstagramChange(e.target.value);
          }}
        />
        <h5 className="social-media-header">Twitter</h5>
        <FormField
          margin="dense"
          variant={'outlined'}
          value={orgForm.twitter}
          style={{ width: '464px' }}
          onChange={(e) => {
            handleTwitterChange(e.target.value);
          }}
        />
        <h5 className="social-media-header">LinkedIn</h5>
        <FormField
          margin="dense"
          variant={'outlined'}
          value={orgForm.linkedin}
          style={{ width: '464px' }}
          onChange={(e) => {
            handleLinkedInChange(e.target.value);
          }}
        />
        <h5 className="social-media-header">Website</h5>
        <FormField
          margin="dense"
          variant={'outlined'}
          value={orgForm.website}
          style={{ width: '464px', marginBottom: '64px' }}
          onChange={(e) => {
            handleWebsiteChange(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Settings;
