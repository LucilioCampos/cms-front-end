import React from 'react';
import "./styles.css";

import Fragment from "../Fragment"
const Button = ({ classes, text, handleClick }) => {

  return (
    <Fragment>
      <button onClick={handleClick} className={classes}>{text}</button>
    </Fragment>
  )
}

export default Button;