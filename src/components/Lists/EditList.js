import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

class EditList extends Component{
  state = {
    listText: ''
  }

  componentWillMount(){
    this.state.listText = this.props.store.lists.filter((el)=>{
      return el.id;
    }).data;
  }

  submitHandler(){
    console.log(this.state.listText);
  }

  changeHandler = (e) => {
    this.setState({listText: e.target.value});
  }

  render(){
    return(
      <div className="row">
        <div className="col s12">
          <h1>Edit List</h1>
          <textarea className="materialize-textarea" value={this.state.listText} onChange={this.changeHandler} />
          <a className="waves-effect waves-light btn" onClick={() => this.submitHandler()}>Save</a>
        </div>
      </div>
    )
  }
}

export default inject('store')(observer(EditList));
