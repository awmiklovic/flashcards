import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

class SignIn extends Component{
  state = {
    email: '',
    password: '',
    errorMsg: ''
  }

  handleChange = (e) => {
    this.setState({[e.target.id]: e.target.value});
  }

  async handleSubmit(e){
    e.preventDefault();
    const response = await this.props.authStore.loginUser(this.state.email, this.state.password);
    if(response == "success"){
      this.props.globalStore.populateUserInfo(this.props.authStore.user);
      this.props.globalStore.openSettings();
    } else{
      this.setState({errorMsg: response});
    }
  }

  render(){
    return(
      <div>
        <form id="signup-form" onSubmit={(e)=>this.handleSubmit(e)}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" id="email" onChange={this.handleChange} placeholder="Email"/>
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" id="password" onChange={this.handleChange} placeholder="Password"/>
          </div>
          {this.state.errorMsg && this.state.errorMsg}
          <div className="input-group">
            <button>Login</button>
          </div>
        </form>
      </div>
    )
  }
}

export default inject('authStore','globalStore')(observer(SignIn));
