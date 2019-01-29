import {observable, decorate, action, toJS} from 'mobx';
import firebase from '../config/fb';
import AuthStore from './AuthStore';
import GlobalStore from './GlobalStore';

const db = firebase.firestore();

class DeckStore{
  constructor(){
    firebase.auth().onAuthStateChanged(user => {
       if(user){
         this.fetchDecks();
       } else {
         this.decks = [...this.globalDecks];
       }
     })
  }

  uidGen(){
    const uid = Math.floor(Math.random() * 1000).toString();
    const time = new Date().getTime().toString();
    return time + uid;
  }

  // Global data for signed out and first time users. You can not edit or delete these decks from the the client.
  globalDecks = [
    { data: { title: 'HTML' },
      id: this.uidGen(),
      isGlobal: true,
      cards: [
        {
          id: this.uidGen(),
          front: 'What does CORS stand for and what issue does it address?',
          back: 'Cross Origin Resource Sharing. It prevents malicious code from being executed on your website.'
        },
        {
          id: this.uidGen(),
          front: 'How many resources will a browser download from a given domain at a time?',
          back: 'It varies, but on average 6.'
        },
        {
          id: this.uidGen(),
          front: 'What is Flash of Unstyled Content? How do you avoid FOUC?',
          back: 'FUOCs occur when the page is visible before its CSS is rendered. We can avoid this by prioritizing "above the fold" resources and optimizing load speed.'
        },
        {
          id: this.uidGen(),
          front: 'What are data-attributes good for?',
          back: 'Allows data to be stored in html elements in non standard attributes, to be accessed by JS.'
        },
        {
          id: this.uidGen(),
          front: 'If you have 5 different stylesheets, how would you best integrate them into the site?',
          back: 'Break them up into partials using CSS preprocessor and then compile them to a main.css file at build time. Page specific CSS is loaded on that page only. Above the fold CSS gets loaded before main.css file'
        },
        {
          id: this.uidGen(),
          front: 'Can you explain any common techniques or recent issues solved in regards to front-end security?',
          back: 'Validating and Sanitizing inputs to prevent Cross site scripting and SQL injection. Setting same origin CORS policy.'
        },
        {
          id: this.uidGen(),
          front: 'Can you describe some SEO best practices or techniques you have used lately?',
          back: 'Semantic markup and sitemaps.'
        },
        {
          id: this.uidGen(),
          front: 'Explain some of the pros and cons for CSS animations versus JavaScript animations.',
          back: 'CSS animations are faster because they use the GPU. But they are also very limited and tend to be simpler. For more complex animations JS is necessary.'
        },
        {
          id: this.uidGen(),
          front: 'What does a doctype do?',
          back: 'It is an instruction to the web browser about what version of the markup language the page is written in. It has implications over how the page is rendered. It allows the page to be validated.'
        },
        {
          id: this.uidGen(),
          front: 'Describe the difference between a cookie, sessionStorage and localStorage.',
          back: 'LocalStorage: No expiration date. SessionStorage: Stores data until browser tab is closed. Good for transferring info between pages, and pop ups. Cookie: Expiration date. Stores data that will be sent back to the server.'
        },
      ]
    },
    { data: { title: 'CSS' },
      id: this.uidGen(),
      isGlobal: true,
      cards: [
        {
          id: this.uidGen(),
          front: 'What is CSS?',
          back: 'The full form of CSS is Cascading Style Sheets. It is a styling language which is simple enough for HTML elements. It is popular in web designing, and its application is common in XHTML also.'
        },
        {
          id: this.uidGen(),
          front: 'Explain the CSS “box model” and the layout components that it consists of. Provide some usage examples.',
          back: 'The CSS box model is a rectangular layout paradigm for HTML elements that consists of the following: Content, Padding, Border, Margin.'
        },
        {
          id: this.uidGen(),
          front: 'What is class selector?',
          back: 'You can define style rules based on the class attribute of the elements. All the elements having that class will be formatted according to the defined rule.'
        },
        {
          id: this.uidGen(),
          front: 'What are the advantages of CSS?',
          back: 'Bandwidth, Site-wide consistency, Page reformatting, Accessibility, Content separated from presentation'
        },
        {
          id: this.uidGen(),
          front: 'What is the purpose of vh measurement unit?',
          back: 'vh − 1% of viewport height.'
        },
        {
          id: this.uidGen(),
          front: 'What are browser safe colors?',
          back: 'There is the list of 216 colors which are supposed to be most safe and computer independent colors. These colors vary from hexa code 000000 to FFFFFF. These colors are safe to use because they ensure that all computers would display the colors correctly when running a 256 color palette.'
        },
        {
          id: this.uidGen(),
          front: 'Which property is used as a shorthand to specify a number of other background properties?',
          back: 'The background property is used as a shorthand to specify a number of other background properties.'
        },
        {
          id: this.uidGen(),
          front: 'What are advantages of SASS?',
          back: 'Allows writing clean CSS in a programming construct. Makes writing CSS faster. Possible to use nested syntax and function for color manipulation and calculating values. Mixins.'
        },
        {
          id: this.uidGen(),
          front: 'What are disadvantages of SASS?',
          back: 'Needs to be programmed and compiled locally. You and your team are locked into it once you begin using it.'
        },
        {
          id: this.uidGen(),
          front: 'What is media directive?',
          back: 'It set style rule to different media types.'
        },
      ]
    },
    { data: { title: 'JS' },
      id: this.uidGen(),
      isGlobal: true,
      cards: [
        {
          id: this.uidGen(),
          front: 'What is closure?',
          back: 'Closures are created whenever a variable that is defined outside the current scope is accessed from within some inner scope.'
        },
        {
          id: this.uidGen(),
          front: 'Explain event delegation.',
          back: 'If an action needs to applied to several sibling elements, the event handler can be attached to the parent element. This is becuase the event triggers the same event on its parent all the way up to the root level (bubbling).'
        },
        {
          id: this.uidGen(),
          front: 'Can you give an example of one of the ways that working with this has changed in ES6?',
          back: 'Due to arrow functions, the this keyword does not get rebound, which means we need to bind this to the element.'
        },
        {
          id: this.uidGen(),
          front: 'Explain how prototypal inheritance works.',
          back: 'Objects inherit directly from other objects. They can inherit from several objects as well. Abstraction is only one level deep.'
        },
        {
          id: this.uidGen(),
          front: 'Whats a typical use case for anonymous functions?',
          back: 'Passing as arguments to other functions.'
        },
        {
          id: this.uidGen(),
          front: 'Explain Function.prototype.bind.',
          back: 'Returns a new function where the parameter in .bind(param) is the this.'
        },
        {
          id: this.uidGen(),
          front: 'Explain "hoisting"',
          back: 'Javascript moves all variable declarations to the top, which means you can refer to them before they have been declared.'
        },
        {
          id: this.uidGen(),
          front: 'Can you give an example for destructuring an object or an array',
          back: '{ prop1, prop2 } = someObject;'
        },
        {
          id: this.uidGen(),
          front: 'Explain the difference between mutable and immutable objects.',
          back: 'Mutable objects can be changed. Immutable objects cant be changed.'
        },
        {
          id: this.uidGen(),
          front: 'What is an example of an immutable object in JavaScript?',
          back: 'Strings and numbers.'
        },
      ]
    }
  ];
  decks = [...this.globalDecks];

  // Firebase CRUD Methods //
  // Decks //

  // Create
  createDeck(title){
      let date = new Date().getTime().toString();
      // Create deck document.
      db.collection("decks").add({
        title: title,
        createdAt: date,
        author: AuthStore.user.uid
      }).then(doc => {
      // Create each card document in component deck.
      GlobalStore.deck.cards.forEach(card => {
        this.createCard(doc.id, card.front, card.back);
      });
      // Reload deck data from db and clear deck component.
      this.fetchDecks();
      GlobalStore.deck.cards = [];
    });
  }

  // READ
  fetchDecks(){
    if(!AuthStore.user) return;
    let newDecks = [...this.globalDecks];
    // Get deck docs from db.
    db.collection("decks").where('author', '==', AuthStore.user.uid).get().then((querySnapshot) => {
      // For each deck, get the cards with the deckID
      querySnapshot.forEach((doc) => {
          let cards = [];
          db.collection("cards").where('author', '==', AuthStore.user.uid).where('deckId', '==', doc.id).get().then(snapshot => {
            //For each card...
            snapshot.forEach(snap => {
              let data = snap.data();
              data.id = snap.id;
              cards.push(data);
            });
            //Add deck to deck array.
            newDecks.push({id: doc.id, data: doc.data(), cards: cards});
            //Sort by createdAt
            newDecks = newDecks.sort((a,b)=>{
              return b.data.createdAt - a.data.createdAt;
            });
            //Set deckArray on DeckStore
            this.decks = newDecks;
          });
      });
    });
  }

  // UPDATE
  updateDeck(globalDeck){
    let cardIDArray = [];
    // Get the deck ref from the DeckStore decks array.
    const deckStoreDeck = this.decks.filter( deck => {
      return deck.id == globalDeck.id;
    })[0];
    // For each card in globalDeck
      globalDeck.cards.forEach(card => {
        // Add card id to cardIdArray.
        cardIDArray.push(card.id);
        // Get matching deckArrayCard
        const deckCard = deckStoreDeck.cards.filter( deckcard => {
          return deckcard.id == card.id;
        })[0];
        // Check if it exists in DeckStore Deck.
        if(!deckCard){
          // If it doesn't exist, then create the card.
          this.createCard(globalDeck.id, card.front, card.back);
        }
        // Check if it matches same card in DeckStore Deck.
        else if(deckCard.front !== card.front || deckCard.back !== card.back){
          // If it doesn't match, then update the card.
          db.collection("cards").doc(card.id).update({
            front: card.front,
            back: card.back
          });
        }
      });
    // Get filtered DeckStore Deck, filter out cardIdArray ids.
    const toDelete = deckStoreDeck.cards.filter((card)=>{
      return cardIDArray.indexOf(card.id) < 0;
    });
    // Delete cards in filtered DeckStore Deck.
    toDelete.forEach(card=>{
      this.deleteCard(card.id);
    })
    // Refetch Decks.
    this.fetchDecks();
  }

  // DELETE
  deleteDeck(id){
    // First delete the deck at ID
    db.collection("decks").doc(id).delete().then(() => {
        this.fetchDecks();
        // Unload deck from Card component.
        GlobalStore.unloadDeck();
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    // Delete each card associated with deckID
    db.collection("cards").where('author', '==', AuthStore.user.uid).where('deckId', '==', id).get().then(snapshot => {
      //For each card...
      snapshot.forEach(snap => {
        db.collection("cards").doc(snap.id).delete();
      });
    });
  }

  // CRUD for cards
  // CREATE
  createCard(deckId, front, back){
    let date = new Date().getTime().toString();
    db.collection("cards").add({
      deckId: deckId,
      front: front,
      back: back,
      createdAt: date,
      author: AuthStore.user.uid
    });
  }

  // READ
  // @TODO: No need for this yet.

  // UPDATE
  updateCard(id, front, back){
    db.collection("cards").doc(id).update({
      front: front,
      back: back
    });
  }

  // DELETE
  deleteCard(id){
    db.collection("cards").doc(id).delete().then(()=>{
      this.fetchDecks();
    });
  }
}

// MOBX config //

decorate(DeckStore, {
  decks: observable,
  createDeck: action,
  fetchDecks: action,
  deleteDeck: action,
  editDeck: action,
  createDeck: action,
  updateCard: action
})

const deckStore = new DeckStore();
export default deckStore;
