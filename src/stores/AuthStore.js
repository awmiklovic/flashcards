import {observable, decorate, action} from 'mobx';
import firebase from '../config/fb';

import GlobalStore from './GlobalStore';

const db = firebase.firestore();

class AuthStore{
  constructor(){
    this.user = null;
    // @TODO Create loading prop. Show spinner to fix navbar flash.
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.user = user;
        console.log(user);
        GlobalStore.populateUserInfo(user);
        // @TODO Set loading to false.
      } else {
        this.user = null;
        GlobalStore.userInfo.firstInitial = "?";
        GlobalStore.userInfo.lastInitial = "?";
        // @TODO Set loading to false.
      }
    })
  }

  createUser(email, password, first, last){
    return new Promise(function(resolve, reject) {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(()=>{
          let user = firebase.auth().currentUser;
          user.updateProfile({
            displayName: first + ' ' + last
          }).then(() => {
              resolve('success');
            });
          })
        .catch(function(error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          resolve(errorMessage);
        });
    });
  }

  loginUser(email, password){
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
          //this.user = this.currentUser();
          resolve('success');
        })
        .catch(function(error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          resolve(errorMessage);
        });
    });
  }

  signOut(){
    firebase.auth().signOut().then(()=>{
      //this.user = false;
      console.log('user logged out');
    })
    .catch(function(error) {
      console.log('there was a problem');
    });
  }

}

decorate(AuthStore, {
  user: observable,
  createUser: action,
  currentUser: action,
  isLoggedIn: action,
  signOut: action
})

const authStore = new AuthStore();
export default authStore;
