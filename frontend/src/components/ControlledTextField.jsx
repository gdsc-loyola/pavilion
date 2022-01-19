import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

/**
 * @typedef  ControlledTextFieldProps
 * @type {Omit<import('react-hook-form').ControllerProps, 'render'> & import('react').ComponentPropsWithoutRef<typeof TextField>
 * & {helperTextCb?: (error: string) => React.ReactNode}}
 */

/**
 * @description A MUI TextField with a react-hook-form Controller wrapper
 * @param {ControlledTextFieldProps } props
 * @returns {React.Component}
 */
const ControlledTextField = (props) => {
  const { name, control, rules, helperTextCb, ...rest } = props;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          name={name}
          error={!!error}
          helperText={error ? (helperTextCb ? helperTextCb(error.message) : error.message) : null}
          onChange={onChange}
          value={value || ''}
          {...rest}
        />
      )}
    />
  );
};

export default ControlledTextField;
