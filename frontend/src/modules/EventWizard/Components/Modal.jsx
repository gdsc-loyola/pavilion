import React from 'react';
import { Box, Grid, Button, Modal as MuiModal, Typography } from '@mui/material';
import ControlledTextField from '$components/ControlledTextField';
import { Error } from '@mui/icons-material';
/**
 * @param {import('@mui/material').ModalProps & {
 * title: string,
 * subtitle: string,
 * withTextField?: boolean,
 * TextFieldProps?: import('$components/ControlledTextField').ControlledTextFieldProps,
 * leftButtonProps?: import('@mui/material').ButtonProps & {label: string},
 * rightButtonProps?: import('@mui/material').ButtonProps & {label: string},
 * onSubmit?: React.FormEventHandler<HTMLFormElement>,
 * }} props
 * @returns {React.FunctionComponent}
 */
const Modal = (props) => {
  const {
    title,
    subtitle,
    withTextField = true,
    onSubmit,
    TextFieldProps,
    leftButtonProps,
    rightButtonProps,
    warning = false,
    ...rest
  } = props;
  return (
    <MuiModal {...rest}>
      <Box
        sx={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '550px',
          maxWidth: '80vw',
          boxShadow: 24,
          borderRadius: '4px',
          // To fix weird background clipping bug
          background: 'linear-gradient(to bottom, transparent 0%, transparent 20%, #fff 20%)',
        }}
        component={'form'}
        onSubmit={onSubmit}
      >
        <Box
          sx={({ background }) => ({
            alignItems: 'center',
            display: 'flex',
            background: warning ? background.red.upDown : background.blue.upDown,
            flexDirection: 'column',
            color: '#fff',
            p: '3rem 40px',
          })}
        >
          <h2>{title}</h2>
          <p style={{ fontWeight: '500' }}>{subtitle}</p>
        </Box>
        <Box sx={{ p: '32px 40px' }}>
          {withTextField && (
            <ControlledTextField
              variant="outlined"
              helperTextCb={(message) => {
                return (
                  <Typography
                    style={{}}
                    sx={(theme) => ({
                      position: 'relative',
                      paddingLeft: '5px',
                      fontSize: theme.fontSize.xs,
                      fontWeight: theme.fontWeight.reg,
                    })}
                  >
                    <Error
                      sx={{
                        position: 'absolute',
                        width: '15px',
                        left: '-14px',
                        top: '-3px',
                      }}
                    />

                    {message}
                  </Typography>
                );
              }}
              fullWidth
              {...TextFieldProps}
            />
          )}
          <Grid container spacing={4} paddingTop={3} sx={{}}>
            <Grid item xs={6}>
              <Button size="medium" variant="outlined" fullWidth {...leftButtonProps}>
                {leftButtonProps?.label}
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button size="small" fullWidth {...rightButtonProps}>
                {rightButtonProps?.label}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </MuiModal>
  );
};

export default Modal;
