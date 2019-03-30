import React from "react";
import Button from '../../../components/UI/Button/Button'
import  "./Modal.css";



const modal = props => {
  return (
    <div >

          <div className={props.style}>
            <h1>Update Success!</h1>
            <Button btnType="Success" clicked={props.closed}>
              Okay
            </Button>
          </div>
            {props.show ? <div className="Backdrop" onClick={props.closed} /> : null
            }
         
    </div>
  );
};

export default modal;

