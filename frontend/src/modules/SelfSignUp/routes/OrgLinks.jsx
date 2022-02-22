import ControlledTextField from '$components/ControlledTextField';
import { useHistory } from 'react-router-dom';
import { useOrgFormStore } from '../stores/useOrgFormStore';
import { Stack, Box, InputLabel, Button } from '@mui/material';
import * as yup from 'yup';
import { styled } from '@mui/material/styles';
import { Redirect } from 'react-router-dom';
import React from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAdminUser } from '$lib/context/AdminContext';
import { kebabCase } from '$lib/utils/kebabCase';
import http from '$lib/http';

const Label = styled(InputLabel)(({ theme }) => ({
  fontWeight: 600,
  color: theme.colors.gray['700'],
  fontSize: '14px',
}));
/**
 * @param {Parameters<typeof ControlledTextField>[0]} props
 * @returns {React.Component}
 */
const OrgLinkInput = (props) => {
  const { label, ...rest } = props;
  return (
    <Box>
      <Label htmlFor={props.name}> {label} </Label>
      <ControlledTextField hiddenLabel fullWidth size="medium" id={props.name} {...rest} />
    </Box>
  );
};

const links = [
  {
    label: 'Facebook',
    placeholder: 'https://facebook.com/',
    name: 'facebook',
  },

  {
    label: 'Instagram',
    placeholder: 'https://instagram.com/',

    name: 'instagram',
  },
  {
    label: 'Twitter',
    placeholder: 'https://twitter.com/',
    name: 'twitter',
  },
  {
    label: 'LinkedIn',
    placeholder: 'https://linkedin.com/',
    name: 'linkedin',
  },
  {
    label: 'Website',
    placeholder: 'https://website.com/',
    name: 'website',
  },
];

const ValidationSchema = yup.object().shape({
  facebook: yup.string().url(),
  instagram: yup.string().url(),
  linkedin: yup.string().url(),
  website: yup.string().url(),
});

const OrgLinks = (props) => {
  const { orgForm, setOrgForm } = useOrgFormStore();
  const { userData, setOrg, accessToken } = useAdminUser();
  const router = useHistory();

  const { control, handleSubmit, formState } = useForm({
    defaultValues: orgForm,
    resolver: yupResolver(ValidationSchema),
  });

  const onSubmit = async (data) => {
    setOrgForm(data);

    const fd = new FormData();

    Object.entries(orgForm).forEach(([key, value]) => {
      if (key === 'step') {
        return;
      }
      fd.append(key, value);
    });

    fd.append('user', userData.id);

    fd.append('slug', kebabCase(orgForm.short_name));

    const res = await http.post('/orgs/', fd, {
      headers: {
        authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    if (res.status === 200) {
      setOrg(res.data);
      router.push('/admin');
    }
  };

  if (!orgForm.step || orgForm.step < 3) {
    // Redirect to the previous step
    return <Redirect to={`/org-logo`} />;
  }

  return (
    <Layout step={3} title="Let’s link your other pages.">
      <Stack spacing={2} component="form" sx={{ width: '464px' }} onSubmit={handleSubmit(onSubmit)}>
        {links.map(({ label, placeholder, name }) => (
          <OrgLinkInput
            key={label}
            name={name}
            control={control}
            label={label}
            placeholder={placeholder}
          />
        ))}
        <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ width: '100%' }}>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={() => {
              props.history.push('/org-logo');
            }}
          >
            Back
          </Button>

          <Button size="small" color="primary" type="submit" disabled={formState.isSubmitting}>
            Save Details
          </Button>
        </Stack>
      </Stack>
    </Layout>
  );
};

export default OrgLinks;
