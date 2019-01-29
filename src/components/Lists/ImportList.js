import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {observer, inject} from 'mobx-react';

class ImportList extends Component{

  state = {
    listTitle: ''
  }

  changeHandler = (e) => {
    this.props.store.flashCardData = e.target.value;
    this.props.store.updateFlashCardData(this.props.store.flashCardData);
  }

  saveChangeHandler = (e) => {
    this.setState({ listTitle: e.target.value});
  }

  deleteHandler = (e) => {
    console.log('delete');
  }

  saveHandler = (e) => {
    var elem = document.getElementById('modal1');
    var instance = window.M.Modal.getInstance(elem);
    instance.open();
  }

  submitHandler = () => {
    this.props.store.createList(this.state.listTitle, this.props.store.flashCardData);
    this.setState({listTitle:''});
  }

  componentDidMount(){
    this.setState({ listText: this.props.store.flashCardData });

    var elems = document.querySelectorAll('.modal');
    var instances = window.M.Modal.init(elems);
  }

  componentDidUpdate(){
    const textarea = document.getElementById('import-textarea');
    window.M.textareaAutoResize(textarea);
  }

  render(){
    return(
      <div className="row">
        <div className="col s12">
          <textarea
            id="import-textarea"
            className="materialize-textarea"
            value={this.props.store.flashCardData}
            onChange={this.changeHandler}
          />
        <Link to={"/List/Test/"}><div className="waves-effect waves-light btn">Run</div></Link>
          <a className="waves-effect waves-light btn" onClick={() => this.saveHandler()}>Save</a>
        </div>

        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>Enter a title for your list.</h4>
            <input type="text" placeholder="List Title" value={this.state.listTitle} onChange={(e)=>{this.saveChangeHandler(e)}}></input>
          </div>
          <div className="modal-footer">
            <a className="modal-close waves-effect waves-green btn-flat" onClick={()=>{this.submitHandler()}}>Save</a>
          </div>
        </div>
      </div>
    )
  }
}

export default inject('store')(observer(ImportList));
