import React from 'react';

import './styles.css';

const Modal = (props) => {
  return (
    <div className="modal-wrapper"
      style={{
        transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
      }}>
      <div className="modal-header">
        <h3>{props.modalHeader}</h3>
        <span className="close-modal-btn" onClick={props.close}>×</span>
      </div>
      <div className="modal-body">
        {props.children}
      </div>
    </div>
  )
}

export default Modal;