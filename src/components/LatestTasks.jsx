import React, { useState, useEffect } from 'react'
import axios from "axios";
import "./LatestTasks.css"


function LatestTasks(props) {

    const token = localStorage.getItem("token");
    const options = {
        headers: { Authorization: token }
    };

    const [taskName, setTaskName] = useState("");
    const [taskStatus, setTaskStatus] = useState(false);
    const [latestTaskArray, setLatestTaskArray] = useState([]);
    const [taskArray, setTaskArray] = useState([]);
    const [loading, setLoading] = useState(true);
    let response;
    let latestTask;

    useEffect(() => {
        axios
            .get("https://dev.teledirectasia.com:3092/dashboard", options)
            .then(res => {
                response = res.data;
                setLatestTaskArray(res.data.latestTasks);
                console.log(latestTaskArray);
                setTaskName(response.latestTasks[0].name);
                setTaskStatus(response.latestTasks[0].completed);                
            })
            .catch(err => {
                console.log(err);
            });
    });
    

    
    useEffect(()=>{
        for(let obj in latestTaskArray){
              taskArray.push(latestTaskArray[obj].name);
        }
    },[latestTaskArray]);


    return (
        <div className="latestTasks">
        <label>Latest Created Tasks</label>
        <div>
            <li>{taskArray[0] ? taskArray[0] : null}</li>
        </div>

        <div>
            <li>{taskArray[1] ? taskArray[1] : null}</li>
        </div>

        <div>
            <li>{taskArray[2] ? taskArray[2] : null}</li>
        </div>
        </div>
    )

}

export default LatestTasks;