import React from 'react';
import './DrawerCard.css';

const DrawerCard = (props) => {
  return(
    <div className="DrawerCard" onClick={ props.clickHandler }>
      { props.title }
    </div>
  );
}

export default DrawerCard;
