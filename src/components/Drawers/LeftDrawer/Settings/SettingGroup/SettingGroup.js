import React, { Component } from 'react';
import './SettingGroup.css';
import { inject, observer } from 'mobx-react';

class SettingGroup extends Component{
  state = {
    active: false
  };

  componentDidMount(){
    this.setState({active: this.props.active});
  }

  toggleHandler(){
    const settingRef = this.props.globalStore.userInfo.settings;
    settingRef[this.props.setting] = !settingRef[this.props.setting];
    this.setState({active:!this.state.active});
  }
  render(){
    let classes = 'toggle';
    if(this.state.active) classes += ' active';
    return(
      <div className="SettingGroup">
        <label>{this.props.label}</label>
        <div className={classes} onClick={() => this.toggleHandler()}>
          <div className="toggle__track"></div>
          <div className="toggle__switch"></div>
        </div>
      </div>
    );
  }
}

export default inject('globalStore')(observer(SettingGroup));
