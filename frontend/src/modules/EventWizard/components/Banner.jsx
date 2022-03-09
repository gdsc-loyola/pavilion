import React from 'react';
import { colors } from '$lib/theme';
import { styled } from '@mui/material';

const Banner = ({ show, warning, label }) => {
  const Container = styled('div')({
    backgroundColor: warning ? colors.red[100] : colors.green[100],
    padding: '16px 32px',
    marginBottom: '10px',
    marginTop: '18px',
    gap: '12px',
    alignContent: 'center',
    alignItems: 'center',
    opacity: show ? 1 : 0,
    display: show ? 'flex' : 'none',
    transition: 'all 0.2s linear',
  });

  const WarningIcon = () => {
    return (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.9993 2.66675C8.63935 2.66675 2.66602 8.64008 2.66602 16.0001C2.66602 23.3601 8.63935 29.3334 15.9993 29.3334C23.3594 29.3334 29.3327 23.3601 29.3327 16.0001C29.3327 8.64008 23.3594 2.66675 15.9993 2.66675ZM17.3327 22.6667H14.666V20.0001H17.3327V22.6667ZM17.3327 17.3334H14.666V9.33342H17.3327V17.3334Z"
          fill="#EB4A3D"
        />
      </svg>
    );
  };

  const CheckIcon = () => {
    return (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.9993 2.66675C8.63935 2.66675 2.66602 8.64008 2.66602 16.0001C2.66602 23.3601 8.63935 29.3334 15.9993 29.3334C23.3594 29.3334 29.3327 23.3601 29.3327 16.0001C29.3327 8.64008 23.3594 2.66675 15.9993 2.66675ZM12.386 21.7201L7.59935 16.9334C7.07935 16.4134 7.07935 15.5734 7.59935 15.0534C8.11935 14.5334 8.95935 14.5334 9.47935 15.0534L13.3327 18.8934L22.506 9.72008C23.026 9.20008 23.866 9.20008 24.386 9.72008C24.906 10.2401 24.906 11.0801 24.386 11.6001L14.266 21.7201C13.7593 22.2401 12.906 22.2401 12.386 21.7201Z"
          fill="#4FB36A"
        />
      </svg>
    );
  };

  return (
    <Container>
      {warning ? <WarningIcon /> : <CheckIcon />}
      <p
        style={{
          color: warning ? colors.red[300] : colors.green[300],
          fontSize: '16px',
          margin: 'auto 0',
        }}
      >
        {label}
      </p>
    </Container>
  );
};

export default Banner;
