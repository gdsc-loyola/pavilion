import ControlledTextField from "$components/ControlledTextField";
import { useOrgFormStore } from "../stores/useOrgFormStore";
import { Stack, Box, InputLabel, Button } from "@mui/material";
import * as yup from "yup";
import { styled } from "@mui/material/styles";
import { Redirect } from "react-router-dom";
import React from "react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { yupResolver } from "@hookform/resolvers/yup";

const Label = styled(InputLabel)(({ theme }) => ({
  fontWeight: 600,
  color: theme.colors.gray["700"],
  fontSize: "14px",
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
    label: "Facebook",
    placeholder: "https://facebook.com/",
    name: "facebook",
  },

  {
    label: "Instagram",
    placeholder: "https://instagram.com/",

    name: "instagram",
  },
  {
    label: "LinkedIn",
    placeholder: "https://linkedin.com/",
    name: "linkedin",
  },
  {
    label: "Website",
    placeholder: "https://website.com/",
    name: "website",
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

  const { control, handleSubmit } = useForm({
    defaultValues: orgForm,
    resolver: yupResolver(ValidationSchema),
  });

  const onSubmit = (data) => {
    setOrgForm(data);
  };

  if (!orgForm.step || orgForm.step < 3) {
    // Redirect to the previous step
    return <Redirect to={`/org-logo`} />;
  }

  return (
    <Layout step={3} title="Let’s link your other pages.">
      <Stack spacing={2} component="form" sx={{ width: "464px" }} onSubmit={handleSubmit(onSubmit)}>
        {links.map(({ label, placeholder, name }) => (
          <OrgLinkInput
            key={label}
            name={name}
            control={control}
            label={label}
            placeholder={placeholder}
          />
        ))}
        <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ width: "100%" }}>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={() => {
              props.history.push("/org-logo");
            }}
          >
            Back
          </Button>

          <Button size="small" color="primary" type="submit">
            Save Details
          </Button>
        </Stack>
      </Stack>
    </Layout>
  );
};

export default OrgLinks;
