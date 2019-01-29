import {observable, decorate, action, toJS} from 'mobx';
import DeckStore from './DeckStore';

import firebase from '../config/fb';
const db = firebase.firestore();

class GlobalStore{

  // Drawer visiblity state.
  drawerActive = {
    top: false,
    left: false,
    right: false
  };

  // Left drawer view state.
  leftDrawer = {
    login: false,
    signup: false
  };

  // Application state.
  study = false;
  loaded = false;
  loadedId = null;
  creating = false;
  editing = false;

  // User Information
  userInfo = {
    firstInitial: null,
    lastInitial: null,
    settings: {
      randomize: false,
      hide: false,
      tracking: true
    }
  }

  // Deck component state.
  deck = {
    id: null,
    title: '',
    cards: [],
    current: 0,
    right: 0,
    wrong: 0,
    back: false
  }

  addCard(){
    let d = new Date().getTime().toString();
    const cardObj = {
      id: d,
      front: 'This is the front of the card.',
      back: 'This is the back of the card.'
    }
    this.deck.cards.unshift(cardObj);
  }

  updateCard(id, front, back){
    this.deck.cards.forEach((card)=>{
      if(card.id == id){
        card.front = front;
        card.back = back;
      }
    });
  }

  deleteCard(id){
    this.deck.cards = this.deck.cards.filter((card)=>{
      return card.id != id;
    });
  }

  updateDeck(){
    const globalStoreDeck = this.deck;
    DeckStore.updateDeck(globalStoreDeck);
    this.creating = false;
  }

  createDeck(title){
    DeckStore.createDeck(title);
    this.exitCreate();
  }

  loadDeck(id){
    if(id == null) return;
    // Find deck in DeckStore deck array...
    const targetRef = DeckStore.decks.filter(deck => {
      return deck.id == id;
    })[0];
    // Convert to object literal.
    const targetDeck = toJS(targetRef);
    // Populate deck array in this store...
    this.deck = {
      id: targetDeck.id,
      cards: targetDeck.cards,
      current: 0,
      right: 0,
      wrong: 0,
      back: false,
    };
    // Set isGlobal value. This determines whether the Control Panel includes editing and deleting icons.
    (targetRef.isGlobal) ? this.deck.isGlobal = true : this.deck.isGlobal = false;
    this.closeDrawer("top");
    this.loaded = true;
  }

  unloadDeck(){
    // Null out the deck properties.
    this.deck.title = null;
    this.deck.cards = [];
    this.deck.id = null;
    this.loaded = false;
    this.drawerActive.right = false;
  }

  // Helpers for drawer component states.
  openDrawer(drawer){
    this.drawerActive[drawer] = true;
  }

  closeDrawer(drawer){
    this.drawerActive[drawer] = false;
  }

  toggleDrawer(drawer){
    this.drawerActive[drawer] = !this.drawerActive[drawer];
  }

  // Helpers for application state.
  editDeck(){
    this.openDrawer("right");
    this.closeDrawer("left");
    this.closeDrawer("top");
    this.editing = true;
  }

  studyDeck(){
    this.closeDrawer("left");
    this.closeDrawer("top");
    this.closeDrawer("right");
    this.study = true;
    if(this.userInfo.settings.randomize){
      this.deck.current = Math.floor(Math.random()*this.deck.cards.length);
    }
  }

  enterCreate(){
    this.openDrawer("right");
    this.creating = true;
  }

  exitCreate(){
    this.closeDrawer("right");
    this.creating = false;
  }

  exitEdit(){
    this.closeDrawer("right");
    this.editing = false;
  }

  exitStudy(){
    this.study = false;
    this.deck.current = 0;
    this.deck.right = 0;
    this.deck.wrong = 0;
  }

  exitSettings(){
    this.closeDrawer("left");
  }

  exitLoadSelect(){
    this.closeDrawer("top");
  }

  // Left drawer state.
  openLogin(){
    this.leftDrawer.login = true;
    this.leftDrawer.signup = false;
  }

  openSignup(){
    this.leftDrawer.login = false;
    this.leftDrawer.signup = true;
  }

  openSettings(){
    this.leftDrawer.login = false;
    this.leftDrawer.signup = false;
  }

  // Study methods
  nextCard(){
    if(this.userInfo.settings.randomize){
      if(this.deck.cards.length > 1){
        let nextIndex = this.deck.current;
        while(nextIndex == this.deck.current){
          nextIndex = Math.floor(Math.random()*this.deck.cards.length);
        }
        this.deck.current = nextIndex;
      } else{
        this.exitStudy();
        return;
      }
    } else{
      if(this.deck.current == this.deck.cards.length - 1){
        this.exitStudy();
        return;
      }
      this.deck.current++;
      this.deck.back = false;
    }
  }

  rightCount(){
    this.deck.right++;
    this.nextCard();
  }

  wrongCount(){
    this.deck.wrong++;
    this.nextCard();
  }

  flipCard(){
    this.deck.back = !this.deck.back;
  }

  populateUserInfo(user){
    if(user.displayName){
      const displayName = user.displayName;
      const firstInitial = displayName.split(' ')[0][0];
      const lastInitial = displayName.split(' ')[1][0];
      this.userInfo.firstInitial = firstInitial;
      this.userInfo.lastInitial = lastInitial;
    }
  }
}

// Export MOBX observables/actions
decorate(GlobalStore, {
  drawerActive: observable,
  leftDrawer: observable,
  userInfo: observable,
  deck: observable,
  study: observable,
  loaded: observable,
  editing: observable,
  creating: observable,
  userInfo: observable,
  openDrawer: action,
  closeDrawer: action,
  openLogin: action,
  openSignup: action,
  openSettings: action,
  populateUserInfo: action,
  loadDeck: action,
  studyDeck: action,
  exitStudy: action,
  unloadDeck: action,
  addCard: action,
  deleteCard: action,
  updateCard: action,
  updateDeck: action,
  createDeck: action,
  enterCreate: action,
  exitSettings: action
});

const globalStore = new GlobalStore();
export default globalStore;
