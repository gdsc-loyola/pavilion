import React, { useState } from 'react';
import Layout from '../components/Layout';
import { styled } from '@mui/material/styles';
import { Button, Stack } from '@mui/material';
import { useOrgFormStore } from '../stores/useOrgFormStore';
import { Redirect } from 'react-router-dom';

const HelperText = styled('p')(({ theme }) => ({
  color: theme.colors.gray['500'],
  margin: 0,
  fontSize: '14px',
  fontWeight: 'normal',
}));

const Label = styled('label')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '240px',
  width: '464px',
  maxWidth: '80vw',
  border: `1px dashed ${theme.colors.blue['400']}`,
  borderRadius: '2px',
  backgroundColor: theme.colors.blue['bg10'],
  transitionDuration: '0.2s',
  fontFamily: 'inherit',
  color: theme.colors.blue['400'],
  '&:hover': {
    backgroundColor: theme.colors.gray['300'],
  },
  img: {
    width: '100px',
    height: 'auto',
    maxWidth: '24%',
  },
}));

const OrgLogo = (props) => {
  const [logo, setLogo] = useState(null);

  const handleLogoChange = (file) => {
    const url = URL.createObjectURL(file);
    setLogo(url);
    setOrgForm({
      logo: url,
      step: 3,
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.includes('image')) {
      handleLogoChange(file);
    }
  };
  const { orgForm, setOrgForm } = useOrgFormStore();

  if (!orgForm.step || orgForm.step < 2) {
    // Redirect to the previous step
    return <Redirect to={`/org-info`} />;
  }

  return (
    <Layout step={2} title="Upload your org's logo!">
      <input
        type="file"
        accept="image/*"
        id="org-logo"
        style={{ display: 'none' }}
        onChange={(e) => {
          handleLogoChange(e.target.files[0]);
        }}
      />
      <Stack sx={{ textAlign: 'center' }} spacing={1}>
        <Label
          htmlFor="org-logo"
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e)}
        >
          <img src={!!logo ? logo : '../../../static/assets/image.png'} alt="logo" />
          {!logo && <p>Browse through your files</p>}
        </Label>
        <HelperText>Suggested ratio — 1:1 (ex. 800x800px)</HelperText>
      </Stack>
      <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ width: '100%' }}>
        <Button
          variant="outlined"
          size="small"
          color="primary"
          onClick={() => {
            props.history.push('/org-info');
          }}
        >
          Back
        </Button>

        <Button size="small" color="primary" onClick={() => props.history.push('/org-links')}>
          Next
        </Button>
      </Stack>
    </Layout>
  );
};

export default OrgLogo;
