import React from 'react';
import './ControlPanelItem.css';

const ControlPanelItem = (props) => {
  return (
    <div className="ControlPanelItem" onClick={() => props.clickHandler()}>
      <div className="ControlPanel__icon-wrap">
        <i className={`icon ion-md-${props.icon}`}></i>
        <label>{props.label}</label>
        <number>{props.number}</number>
      </div>
    </div>
  );
}

export default ControlPanelItem;
