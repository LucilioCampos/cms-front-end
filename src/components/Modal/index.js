import React from 'react';

import './styles.css';

const modal = (props) => {
  return (
    <>
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
        <div className="modal-footer">
          <button className="btn-cancel" onClick={(e) => props.handleClose(e)}>Fechar</button>
          <button className="btn-continue" onClick={(e) => props.handleOn(e)}>Continuar</button>
        </div>
      </div>
    </>
  )
}

export default modal;