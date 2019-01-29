import React, { Component } from 'react';
import ListSummary from './ListSummary';
import { inject, observer } from 'mobx-react';

class DisplayLists extends Component{

  componentDidMount(){
    this.props.store.fetchLists();
  }
  
  render(){
    console.log(this.props.store.lists);
    const lists = this.props.store.lists.map( (item, i) => (
      <ListSummary key={item.id} title={item.data.title} id={item.id}/>
    ));

    return(
      <ul className="collection">
        { lists }
      </ul>
    )
  }

}

export default inject('store')(observer(DisplayLists));
