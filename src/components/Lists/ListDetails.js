import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ListDetails extends Component{

  render(){
    return(
      <div className="row">
        <div className="col s12">
          <h1>List Details</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, cum non soluta fuga! Provident, tempore. Ratione eligendi saepe possimus nostrum labore fugit atque aspernatur aut soluta reprehenderit consequatur, magnam necessitatibus!</p>
          <Link to="/List/Test/3"><div className="waves-effect waves-light btn">Run</div></Link>
          <Link to="/List/Edit/3"><div className="waves-effect waves-light btn">Edit</div></Link>
          <Link to="/"><div className="waves-effect waves-light btn">Delete</div></Link>
        </div>
      </div>
    )
  }
}

export default ListDetails;
