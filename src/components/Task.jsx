import React, { useState } from "react";
import "./Task.css";
import trash from "../trash-solid.svg"
import pen  from "../pen-solid.svg"

function Task(props) {



  return (
    <div>
    
        <div className="Task">
        <input className="checkbox" type="checkbox" onChange={props.editBoxChecked} />
        <div style= {props.style}> {props.taskName}</div>
        <div> {props.taskStatus}</div>
        <div className="icons">
        <img src={pen} onClick={props.editButtonClicked}/>
        <img src={trash} onClick={props.deleteButtonClicked} />
        </div>
        
        
      </div>
    </div>
  );
}

export default Task;