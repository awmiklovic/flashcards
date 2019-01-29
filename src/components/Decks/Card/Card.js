import React, {Component} from 'react';
import './Card.css';

import { inject, observer } from 'mobx-react';

class Card extends Component{

  render(){
    console.log(this.props.globalStore.deck);
    let { cards, current, back } = this.props.globalStore.deck;
    let card = <div className="centered"><p>No deck loaded. Click "Load" to load a deck, or click "Create" to create a deck.</p></div>;
    if( cards.length > 0 ){
      (back) ? card = cards[current].back : card = cards[current].front;
    }
    let classes = 'Card';
    if(cards.length == 0) classes += ' empty'
    return(
      <div className={classes}> { card } </div>
    );
  }
}

export default inject('globalStore')(observer(Card));
