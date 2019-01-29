import React from 'react';
import './Login.css';

import AuthLogin from '../../../../components/Auth/SignIn';

import {inject, observer} from 'mobx-react';

const Login = (props) => {
  return(
    <div className="Login">
      <div className="title-bar">
        <i className="icon ion-md-arrow-back" onClick={ ()=> props.globalStore.openSettings() }></i>
        <h2>Login</h2>
      </div>
      <AuthLogin />
    </div>
  );
}

export default inject('globalStore')(observer(Login));
