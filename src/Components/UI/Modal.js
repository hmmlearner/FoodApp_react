import React from "react";
import ReactDOM from "react-dom";
import classes from './Modal.module.css';
import Card from './Card';

const BackDrop = (props)=>{
    return (<div className={classes.backdrop} onClick={props.onClose}></div>);
}

const ModalOverLay = (props)=>{
    return (
      <div className={classes.modal}>
        <div className="content">{props.children}</div>
      </div>
    );
}


const Modal = (props) => {
 return  <React.Fragment>
    {ReactDOM.createPortal(<BackDrop onClose={props.onClose} />,document.getElementById('modal-root'))}
    {ReactDOM.createPortal(<ModalOverLay>{props.children}</ModalOverLay>,document.getElementById('modal-root'))}
  </React.Fragment>
    
};

export default Modal;

