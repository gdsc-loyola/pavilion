import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

/**
 * @description A MUI TextField with a react-hook-form Controller wrapper
 * @param {Omit<import('react-hook-form').ControllerProps, 'render'> & React.ComponentPropsWithoutRef<typeof TextField>} props
 * @returns {React.Component}
 */
const ControlledTextField = (props) => {
  const { name, control, rules, ...rest } = props;
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          name={name}
          error={!!error}
          helperText={error ? error.message : null}
          onChange={onChange}
          value={value || ''}
          {...rest}
        />
      )}
    />
  );
};

export default ControlledTextField;
