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
    withTextField,
    onSubmit,
    TextFieldProps,
    leftButtonProps,
    rightButtonProps,
    warning,
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
          {warning ? (
            <svg
              width="76"
              height="44"
              fill="none"
              style={{ position: 'absolute', bottom: '37%', right: '1%' }}
            >
              <path
                d="M24 76c0 4.4 3.6 8 8 8h32c4.4 0 8-3.6 8-8V28H24v48Zm52-60H62l-4-4H38l-4 4H20v8h56v-8Z"
                fill="#fff"
                opacity=".1"
              />
            </svg>
          ) : (
            <>
              <svg
                style={{ position: 'absolute', top: '0', left: '0' }}
                width="96"
                height="72"
                fill="none"
              >
                <path
                  d="M12 45.84V58c0 1.12.88 2 2 2h12.16c.52 0 1.04-.2 1.4-.6l43.68-43.64-15-15L12.6 44.4c-.4.4-.6.88-.6 1.44ZM82.84 4.16a3.983 3.983 0 0 0 0-5.64l-9.36-9.36a3.983 3.983 0 0 0-5.64 0l-7.32 7.32 15 15 7.32-7.32Z"
                  fill="#fff"
                  opacity=".1"
                />
              </svg>
              <svg
                style={{ position: 'absolute', bottom: '37%', right: '0' }}
                width="76"
                height="44"
                fill="none"
              >
                <path
                  d="M68 48H48v20h20V48ZM64 4v8H32V4h-8v8h-4c-4.44 0-7.96 3.6-7.96 8L12 76c0 4.4 3.56 8 8 8h56c4.4 0 8-3.6 8-8V20c0-4.4-3.6-8-8-8h-4V4h-8Zm12 72H20V32h56v44Z"
                  fill="#fff"
                  opacity=".1"
                />
              </svg>
            </>
          )}

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
          <Grid container spacing={4}>
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
