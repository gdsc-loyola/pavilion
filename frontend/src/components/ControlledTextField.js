import React from "react";
import { Controller, ControllerProps } from "react-hook-form";
import { TextField } from "@mui/material";

/**
 * @description A MUI TextField with a react-hook-form Controller wrapper
 * @param {Omit<ControllerProps, 'render'> & React.ComponentPropsWithoutRef<typeof TextField>} props
 * @returns {React.Component}
 */
const ControlledTextField = (props) => {
  const { name, control, defaultValue, rules, shouldUnregister, ...rest } = props;
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          name={name}
          error={!!error}
          helperText={error ? error.message : null}
          {...field}
          {...rest}
        />
      )}
    />
  );
};

<ControlledTextField />;

export default ControlledTextField;
