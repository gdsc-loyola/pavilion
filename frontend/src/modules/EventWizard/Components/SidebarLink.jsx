import React from 'react';
import { Link } from 'react-router-dom';
import { colors } from '$lib/theme';

const SidebarLink = ({ label, href, active }) => {
  return (
    <Link to={href}>
      <div style={{
        padding: '24px 0px 24px 32px',
        color: colors.gray[700],
        backgroundColor: active ? colors.blue[100] : 'transparent',
      }}>
        { label }
      </div>
    </Link>
  );
};

export default SidebarLink;
