import React from 'react';
import './UserDetails.css';

import {inject, observer} from 'mobx-react';

const UserDetails = (props) => {
  const { firstInitial, lastInitial } = props.globalStore.userInfo;
  return(
    <div className="UserDetails">
      <div className="initials">
        {firstInitial}{lastInitial}
      </div>
      { !props.authStore.user ? (
        <div>
          <button onClick={() => props.globalStore.openLogin() }>Login</button>
          <button onClick={ () => props.globalStore.openSignup() }>Signup</button>
        </div>
      ) : (
        <div className="sign-out" onClick={ () => props.authStore.signOut() }>Sign Out</div>
        )}
    </div>
  );
}

export default inject('globalStore', 'authStore')(observer(UserDetails));
