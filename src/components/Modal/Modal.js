import React, { Component } from 'react';

import './Modal.css';

class Modal extends Component{
  state = {
    input: ""
  }

  changeHandler(e){
    this.setState({input: e.target.value})
  }

  submitHandler(){
    this.props.submitHandler(this.state.input);
  }

  closeHandler(){
    this.props.closeHandler();
  }

  render(){
    return(
      <div className="Modal">
        <div className="Modal__inner">
          <i className="Modal__inner__close icon ion-md-close" onClick={() => this.closeHandler()}></i>
          <label>Enter a title for your deck.</label>
          <input value={this.state.input} type="text" onInput={(e)=>this.changeHandler(e)} />
          <button onClick={()=>this.submitHandler()}>Save</button>
        </div>
      </div>
    );
  }
}

export default Modal;
