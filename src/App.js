import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import ListDetails from './components/Lists/ListDetails';
import EditList from './components/Lists/EditList';
import ImportList from './components/Lists/ImportList';
import FlashCards from './components/Flashcards/FlashCards';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import './css/main.css';
import Card from './components/Decks/Card/Card';
import ControlPanel from './components/ControlPanel/ControlPanel';
import TopDrawer from './components/Drawers/TopDrawer/TopDrawer';
import LeftDrawer from './components/Drawers/LeftDrawer/LeftDrawer';
import RightDrawer from './components/Drawers/RightDrawer/RightDrawer';

import {observer, inject} from 'mobx-react';

import './css/main.css';

class App extends Component {
  render() {
    const { top, left, right } = this.props.globalStore.drawerActive;
    return (
      <BrowserRouter>
        <div className="App">
          <div id="main">
            <Switch>
              <Route exact path="/" component={Card} />
            </Switch>
            <TopDrawer active={top} />
            <LeftDrawer active={left} />
            <RightDrawer active={right} />
            <ControlPanel type={ this.props.globalStore.study ? "study" :
              this.props.globalStore.creating ? "creating" :
              this.props.globalStore.editing ? "editing" :
              this.props.globalStore.drawerActive.top ? "loadSelect" :
              this.props.globalStore.drawerActive.left ? "settings" :
              this.props.globalStore.loaded ? "loaded" : "main"} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default inject('globalStore')(observer(App));
