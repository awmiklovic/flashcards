import React from 'react';
import './TopDrawer.css';
import DrawerCard from './DrawerCard/DrawerCard';
import { inject, observer } from 'mobx-react';

const TopDrawer = (props) => {
  let classes = "TopDrawer";
  if(props.active) classes += " active";
  const decks = props.deckStore.decks.map((deck)=> {
    if(props.globalStore.userInfo.settings.hide && deck.isGlobal) return;
    return(
      <DrawerCard key={ deck.id } title={ deck.data.title } clickHandler={ () => props.globalStore.loadDeck(deck.id)} global={ deck.isGlobal } />
    );
  });
  return(
    <div className={classes}>
      { decks }
    </div>
  );
}

export default inject('globalStore', 'deckStore')(observer(TopDrawer));
