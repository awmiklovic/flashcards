import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {observer, inject} from 'mobx-react';

class ListSummary extends Component{

  deleteHandler(e){
    this.props.store.deleteList(e.target.id);
  }

  editHandler(id){
    this.props.store.editList(id);
  }

  loadList(id){
    this.props.store.loadList(id);
  }

  render(){
    return(
      <a className="collection-item" onClick={()=>this.loadList(this.props.id)}>
        {this.props.title}
        <i id={this.props.id} className="material-icons right delete" onClick={(e) => this.deleteHandler(e)}>delete</i>
        <i className="material-icons right edit" onClick={(e) => this.editHandler(this.props.id)}>edit</i>
      </a>
    )
  }
}

export default inject('store')(observer(ListSummary));
