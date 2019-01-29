import React, { Component } from 'react';
import './RightDrawer.css';

import CardItem from './CardItem/CardItem';
import Modal from '../../Modal/Modal';

import { inject, observer } from 'mobx-react';

class RightDrawer extends Component{

  constructor(props){
      super(props);
      this.saveDeck = this.saveDeck.bind(this);
      this.closeModal = this.closeModal.bind(this);
  }

  state = {
    modal: false
  }

  addCard(){
    this.props.globalStore.addCard();
  }

  saveDeck(title){
    console.log(this.props.globalStore.creating);
    if(this.props.globalStore.creating){
      this.props.globalStore.createDeck(title);
      this.setState({modal: false});
      this.props.globalStore.drawerActive.top = true;
      this.props.globalStore.drawerActive.right = false;
    }
  }

  openModal(){
    this.setState({modal:true});
  }

  closeModal(){
    this.setState({modal: false});
  }

  updateDeck(){
    this.props.globalStore.updateDeck();
  }

  render(){
    let cards = [];
    if(this.props.globalStore.deck.cards){
      //console.log(this.props.globalStore.deck.cards);
      cards = this.props.globalStore.deck.cards.map((card) => {
        //console.log(card.id);
        return(
          <CardItem key={card.id} id={card.id} q={card.front} a={card.back} />
        )}
      );
    }

    let classes = "RightDrawer";
    if(this.props.active) classes += " active";

    let authMessage = "";
    if(!this.props.authStore.user) authMessage = "You must login/signup to save your deck."

    return(
      <div className={classes}>
        {(this.props.globalStore.creating) ? (
          <div>
            <h2>Create Deck</h2>
            <button onClick={()=>this.addCard()}>Add Card</button>
            <button onClick={()=>this.openModal()} disabled={!this.props.authStore.user}>Save Deck</button>
            <small>{authMessage}</small>
            { this.state.modal && <Modal submitHandler={this.saveDeck} closeHandler={this.closeModal} /> }
          </div>
        ) : (
          <div>
            <h2>Edit Deck</h2>
            <button onClick={()=>this.addCard()}>Add Card</button>
            <button onClick={()=>this.updateDeck()}>Update Deck</button>
          </div>
        )}
        <ul>
          { cards }
        </ul>
      </div>
    );
  }
}

export default inject('globalStore', 'deckStore', 'authStore')(observer(RightDrawer));
