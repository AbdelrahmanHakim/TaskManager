import React, { useState, useEffect } from "react";
import { useHistory ,useLocation} from "react-router-dom";
import image from "../donn-gabriel.png"
import "./Header.css"

function Header(){

    const name = localStorage.getItem("name");


    let history = useHistory();
    

    function handleClick() {
      
      localStorage.clear();
      history.replace("/");

    }

return (
 <div className="header">
       <div> <img src= {image}/> </div>
        <h3>{name}</h3>
    <div className="labelHeader">   <label onClick={handleClick}>Logout</label> </div> 
      </div>

)}

export default Header;