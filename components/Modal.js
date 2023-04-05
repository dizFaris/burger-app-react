import classes from "../styles/Modal.module.css";
import React, { memo } from "react";
import buttonStyle from "../styles/Button.module.css";

function Modal(props) {
  const cssClasses = [
    classes.modal,
    props.show ? classes.modalOpen : classes.modalClosed,
  ];

  return (
    <div className={cssClasses.join(" ")}>
      <h1>Thanks for subscribing!</h1>
      <h3>Our newsletter comes out every sunday.</h3>
      <h3>Hope you enjoy!</h3>
      <button onClick={props.closed} className={buttonStyle.button}>
        Dismiss
      </button>
    </div>
  );
}

export default memo(Modal);
