import React from 'react';
import './LeftDrawer.css';

import UserDetails from './UserDetails/UserDetails';
import Settings from './Settings/Settings';
import Login from './Login/Login';
import Signup from './Signup/Signup';

import { inject, observer } from 'mobx-react';

const LeftDrawer = (props) => {
  const { login, signup } = props.globalStore.leftDrawer;
  let classes = "LeftDrawer";
  if(props.active) classes += " active";
  return(
    <div className={classes}>
      { !login && !signup && (
        <div>
          <UserDetails />
          <Settings />
        </div>
      ) }
      { login && <Login /> }
      { signup && <Signup /> }
    </div>
  );
}

export default inject('globalStore')(observer(LeftDrawer));
