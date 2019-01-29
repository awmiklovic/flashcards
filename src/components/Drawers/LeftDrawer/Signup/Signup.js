import React from 'react';
import './Signup.css';

import AuthSignup from '../../../../components/Auth/SignUp';

import {inject, observer} from 'mobx-react';

const Signup = (props) => {
  return(
    <div className="Signup">
      <div className="title-bar">
        <i className="icon ion-md-arrow-back" onClick={ ()=> props.globalStore.openSettings() }></i>
        <h2>Signup</h2>
      </div>
      <AuthSignup />
    </div>
  );
}

export default inject('globalStore')(observer(Signup));
