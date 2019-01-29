import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';

class SignUp extends Component{
  state = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    errorMsg: ''
  }

  handleChange = (e) => {
    this.setState({[e.target.id]: e.target.value});
  }

  async handleSubmit(e){
    e.preventDefault();
    const response = await this.props.authStore.createUser(this.state.email, this.state.password, this.state.first_name, this.state.last_name);
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
            <label>First Name</label>
            <input type="text" id="first_name" onChange={this.handleChange} placeholder="First Name"/>
          </div>
          <div className="input-group">
            <label>Last Name</label>
            <input type="text" id="last_name" onChange={this.handleChange} placeholder="Last Name"/>
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" id="email" onChange={this.handleChange} placeholder="Email"/>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange} placeholder="Password"/>
          </div>
          { this.state.errorMsg && this.state.errorMsg }
          <button>SignUp</button>
        </form>
      </div>
    )
  }
}

export default inject('authStore', 'globalStore')(observer(SignUp));
