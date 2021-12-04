import React from 'react';
import logo from '../../../static/assets/pav_logo.svg';
import '../../../stylesheets/org/Dashboard.scss';
import { useLocation } from 'react-router';

const NavDashboard = () => {
  const current_path = useLocation();

  const NavItem = (props) => {
    if (
      current_path.pathname.includes(props.link.toLowerCase()) ||
      (current_path.pathname == '/admin/' && props.link == 'Dashboard')
    ) {
      return (
        <a href={props.href} className="nav-item-active">
          <span>{props.link}</span>
        </a>
      );
    } else {
      return (
        <a href={props.href} className="nav-item">
          <span>{props.link}</span>
        </a>
      );
    }
  };
  return (
    <nav className="side-nav">
      <img src={logo} alt="Logo" className="logo" />
      <NavItem href="/admin/" link="Dashboard" />
      <NavItem href="/admin/events" link="Event" />
      <NavItem href="/admin/settings" link="Settings" />
    </nav>
  );
};

export default NavDashboard;
