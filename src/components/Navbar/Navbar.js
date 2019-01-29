import React from 'react';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

const Navbar = (props) => (
  <nav className="nav-wrapper light-blue darken-2">
    {props.authStore.user ? (
      <SignedInLinks />
    ) : (
      <SignedOutLinks />
    )}
    <ul className="right">
      <li><Link to="/">Home</Link></li>
    </ul>
  </nav>
);

export default inject('authStore')(observer(Navbar));
