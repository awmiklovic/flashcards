import React, { Component } from 'react';
import './CardItem.css';

import { inject, observer } from 'mobx-react';

class CardItem extends Component{
  state = {
    editing: false,
    q: '',
    a: ''
  }
  componentDidMount(){
    this.setState({q: this.props.q, a: this.props.a});
  }

  changeHandler(e){
    this.setState({[e.target.name]: e.target.value});
  }

  saveChanges(){
    this.setState({editing: false});
    this.props.globalStore.updateCard(this.props.id, this.state.q, this.state.a);
  }

  startEdit(){
    this.setState({editing: true});
  }

  discardEdit(){
    this.setState({
      editing: false,
      q: this.props.q,
      a: this.props.a,
    });
  }

  deleteCard(id){
    this.props.globalStore.deleteCard(id);
  }

  render(){
    return(
      <div key={this.props.id} className="CardItem">
          <li className="card-group">
            <div className="card-group-question">
              { (this.state.editing) ? (
                <textarea name="q" value={this.state.q} onInput={e => this.changeHandler(e)} onChange={()=>{}}></textarea>
              ) : (
                <div>Q: {this.state.q}</div>
              )}
            </div>
            <div className="card-group-answer">
              { (this.state.editing) ? (
                <textarea name="a" value={this.state.a} onInput={e => this.changeHandler(e)} onChange={()=>{}}></textarea>
              ) : (
                <div>A: {this.state.a}</div>
              )}
            </div>
            <div className="card-group-action">
              {(this.state.editing) ? (
                <div>
                  <i className="icon ion-md-checkmark" onClick={()=>this.saveChanges()}></i>
                  <i className="icon ion-md-close" onClick={()=>this.discardEdit()}></i>
                </div>
              ) : (
                <div>
                  <i className="icon ion-md-create" onClick={()=>this.startEdit()}></i>
                  <i className="icon ion-md-trash" onClick={()=>this.deleteCard(this.props.id)}></i>
                </div>
              )}
            </div>
          </li>
      </div>
    );
  }
}

export default inject('globalStore')(observer(CardItem));
