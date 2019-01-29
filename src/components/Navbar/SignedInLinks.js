import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

const SignedInLinks = (props) => (
  <ul className="right">
    <a><li onClick={() => props.authStore.signOut()}>Sign Out</li></a>
  </ul>
);

export default inject('authStore')(observer(SignedInLinks));
