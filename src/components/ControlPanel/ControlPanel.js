import React from 'react';
import './ControlPanel.css';
import { toJS } from 'mobx';
import {inject, observer} from 'mobx-react';
import ControlPanelItem from './ControlPanelItem/ControlPanelItem';

const ControlPanel = (props) => {
  let id = null;
  if(props.globalStore.loaded) id = props.globalStore.deck.id;
  const {type} = props;
  let iconArray = [];

  if(type == 'main'){
    iconArray.push(['settings', 'Settings', () => props.globalStore.toggleDrawer("left") ]);
    iconArray.push(['cloud-download', 'Load', () => props.globalStore.toggleDrawer("top") ]);
    iconArray.push(['add-circle', 'Create', () => props.globalStore.enterCreate() ]);
    if(props.globalStore.deck.cards.length > 0){
      iconArray.push(['play', 'Study Deck', () => props.globalStore.studyDeck()]);
    }
  }

  if(type == 'loaded' & !props.globalStore.deck.isGlobal){
    iconArray.push(['play', 'Study Deck', () => props.globalStore.studyDeck() ]);
    iconArray.push(['create', 'Edit', () => props.globalStore.editDeck() ]);
    iconArray.push(['qr-scanner', 'Unload', () => props.globalStore.unloadDeck() ]);
    iconArray.push(['trash', 'Delete', () => props.deckStore.deleteDeck(id) ]);
  }

  if(type == 'loaded' & props.globalStore.deck.isGlobal){
    iconArray.push(['settings', 'Settings', () => props.globalStore.toggleDrawer("left") ]);
    iconArray.push(['play', 'Study Deck', () => props.globalStore.studyDeck() ]);
    iconArray.push(['qr-scanner', 'Unload', () => props.globalStore.unloadDeck() ]);
  }

  if(type == 'study'){
    iconArray.push(['sync', 'Flip Card', () => props.globalStore.flipCard() ]);
    if(props.globalStore.userInfo.settings.tracking){
      const right = toJS(props.globalStore.deck).right;
      const wrong = toJS(props.globalStore.deck).wrong;
      iconArray.push(['thumbs-up', 'Right', () => props.globalStore.rightCount(), right ]);
      iconArray.push(['thumbs-down', 'Wrong', () => props.globalStore.wrongCount(), wrong ]);
    }
    iconArray.push(['skip-forward', 'Next', () => props.globalStore.nextCard() ]);
    iconArray.push(['exit', 'Done', () => props.globalStore.exitStudy() ]);
  }

  if(type == 'creating'){
    iconArray.push(['arrow-back', 'Go Back', () => props.globalStore.exitCreate() ]);
  }

  if(type == 'editing'){
    iconArray.push(['arrow-back', 'Go Back', () => props.globalStore.exitEdit() ]);
  }

  if(type == 'loadSelect'){
    iconArray.push(['arrow-down', 'Go Back', () => props.globalStore.exitLoadSelect() ]);
  }

  if(type == 'settings'){
    iconArray.push(['arrow-forward', 'Go Back', () => props.globalStore.exitSettings() ]);
  }

  const icons = iconArray.map((el, i)=>(
    <ControlPanelItem key={i} icon={el[0]} label={el[1]} clickHandler={el[2]} number={el[3]}/>
  ));

  return(
    <div className="ControlPanel">
      { icons }
    </div>
  );
}

export default inject('globalStore', 'deckStore')(observer(ControlPanel));
