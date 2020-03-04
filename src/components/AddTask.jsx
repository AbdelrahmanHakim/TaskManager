import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";


//{"name": "New Task test",
// "completed": true}

function Tasks() {
  const [task, setTask] = useState({name: '', completed: false});
  const [add, setAdd] = useState("");
  const [showDiv, setShowDiv] = useState(true);
  let history = useHistory();

  function toggleDiv(){
    return   setShowDiv(false)
}

  function handleNewTask(event) {
    // task = {name : "", completed : false};
    setTask({name: event.target.value});
  }

  function addTask() {
    // setAdd(task);
    
    const token = localStorage.getItem("token");
   
    const options = {
      headers: {'Authorization': token}
    };
    axios
      .post(
        "https://dev.teledirectasia.com:3092/tasks",task,options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
      history.push('/NewDashboard')
      
  }

  return (
    <div className="notask2">
      <h2>+ New Task </h2>
      <input
        className="input"
        onChange={handleNewTask}
        type="text"
        placeholder="Task Name"
        // value={task}
      />

      <button onClick={addTask}> + New Task</button>
    </div>
  );
}

export default Tasks;
