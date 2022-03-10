import React from 'react';

const DownloadIcon = ({ disabled }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.834 7.5H12.5007V2.5H7.50065V7.5H4.16732L10.0007 14.1667L15.834 7.5ZM3.33398 15.8333H16.6673V17.5H3.33398V15.8333Z"
        fill={disabled ? '#9CA3AF' : '#498AF4'}
      />
    </svg>
  );
};

export default DownloadIcon;
