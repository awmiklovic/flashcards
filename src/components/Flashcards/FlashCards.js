import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {observer, inject} from 'mobx-react';

class FlashCards extends Component{

  state = {
    flashcards: [],
    currentIndex: 1,
    showBack: false
  }

  componentDidMount(props){
    let flashArray = this.props.store.flashCardData.split('#');
    flashArray.forEach((el,i)=>{
      el = el.split('@');
      flashArray[i] = el;
    });
    this.setState({flashcards: flashArray});
  }

  nextHandler(){
    this.setState({
      currentIndex: this.state.currentIndex + 1,
      showBack: false
    });
  }

  flipHandler(){
    this.setState({showBack: !this.state.showBack});
  }

  render(){
    let cardValue = "You've reached the end of your deck! Click done to go back to the dashboard.";
    let backValue = "";
    if(this.state.currentIndex < this.state.flashcards.length){
      cardValue = this.state.flashcards[this.state.currentIndex][0];
      backValue = this.state.flashcards[this.state.currentIndex][1];
    }

    console.log(this.state.flashcards);
    return(
      <div className="row">
        <div className="col s6 offset-s3">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <p>{this.state.showBack ? backValue : cardValue}</p>
            </div>
            <div className="card-action">
              <a onClick={() => this.flipHandler()}>Flip</a>
              <a onClick={() => this.nextHandler()}>Next</a>
              <Link to="/">Done</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default inject('store')(observer(FlashCards));
