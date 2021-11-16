import React from "react";
import { useForm, Controller } from "react-hook-form";

import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  FormHelperText,
  Box,
  useTheme,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import ControlledTextField from "$components/ControlledTextField";
import * as yup from "yup";
import { useOrgFormStore } from "../store/useOrgFormStore";
import Layout from "../components/Layout";

const ValidationSchema = yup.object().shape({
  name: yup.string().required("Name is a required"),
  shortName: yup.string().required("Short Name is required"),
  description: yup.string().required("Description is required"),
  orgBody: yup.string().required("Org Body is required"),
});

const OrgInfo = (props) => {
  const theme = useTheme();
  const { orgForm, setOrgForm } = useOrgFormStore((state) => ({
    orgForm: state.orgForm,
    setOrgForm: state.setOrgForm,
  }));

  const { control, handleSubmit } = useForm({
    defaultValues: orgForm,
    resolver: yupResolver(ValidationSchema),
  });

  const onSubmit = (data) => {
    setOrgForm({
      ...data,
      step: 2,
    });
    props.history.push({
      pathname: "/org-logo/",
      state: { detail: orgForm },
    });
  };

  return (
    <Layout step={1} title="Tell us more about your organization.">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "468px",
            [theme.breakpoints.down("sm")]: {
              maxWidth: "unset",
            },
          }}
        >
          <ControlledTextField
            fullWidth
            label="Organization Name*"
            control={control}
            name="name"
            size="medium"
          />
          <ControlledTextField
            fullWidth
            label="Shorthand Name (ex. GDSC-L)*"
            control={control}
            name="shortName"
            size="medium"
          />

          <ControlledTextField
            name="description"
            label={"Short Description*"}
            control={control}
            multiline
            fullWidth
            rows={8}
          />

          <Controller
            name="orgBody"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormControl fullWidth margin="dense" error={!!error}>
                <InputLabel id="org-body"> Org Body* </InputLabel>
                <Select id="org-body" label={"Org Body*"} fullWidth error={!!error} {...field}>
                  <MenuItem value="COA">COA</MenuItem>
                  <MenuItem value="LIONS">LIONS</MenuItem>
                  <MenuItem value="Sanggu">Sanggu</MenuItem>
                </Select>
                {error ? <FormHelperText> {error.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Button
            sx={{ marginTop: "2rem", marginLeft: "auto", display: "block" }}
            type="submit"
            color="primary"
          >
            Next
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default OrgInfo;
