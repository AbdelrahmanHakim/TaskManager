import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Percentage.css"

const Percentage = (props) => {
    const token = localStorage.getItem("token");
    const options = {
      headers: { Authorization: token }
    };
  
    const [tasksCompleted, setTasksCompleted] = useState(0);
    const [totalTasks, setTotalTasks] = useState(0);
    const [triger, setTriger] = useState(false);

  
    let response;
  
    useEffect(() => {
      axios
        .get("https://dev.teledirectasia.com:3092/dashboard", options)
        .then(res => {
          response = res.data;
          setTotalTasks(response.totalTasks);
          setTasksCompleted(response.tasksCompleted);
          setTriger((prevValue)=>{
            return !prevValue;
          });
          console.log(response,"use 1");
        })
        .catch(err => {
          console.log(err);
        });
    });


    useEffect(() => {
      axios
        .get("https://dev.teledirectasia.com:3092/dashboard", options)
        .then(res => {
          response = res.data;
          setTriger((prevValue)=>{
            return !prevValue;
          });
          console.log(response,"use 2");
        })
        .catch(err => {
          console.log(err);
        });
    },[totalTasks,tasksCompleted]);

    useEffect(() => {
      axios
        .get("https://dev.teledirectasia.com:3092/dashboard", options)
        .then(res => {
          response = res.data;
          setTotalTasks(response.totalTasks);
          setTasksCompleted(response.tasksCompleted);
          console.log(response,"etndhna");
        })
        .catch(err => {
          console.log(err);
        });
    },[triger]);

    
    
    return (
        <div className="percentage">
            <label>Tasks Completed</label>
            <h1> {tasksCompleted ? tasksCompleted : 0}</h1><h3>/{totalTasks}</h3>
        </div>
    );
};

export default Percentage;