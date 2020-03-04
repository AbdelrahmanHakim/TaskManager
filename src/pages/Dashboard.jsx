import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AddTask from "../components/AddTask";
import Header from "../components/Header"

function Dashboard() {


  const history = useHistory();
  const [showDiv, setShowDiv] = useState(true);
  const [task, setTask] = useState("");
  const [add, setAdd] = useState("");

  function toggleDiv() {
    return setShowDiv(false);
  }

  function handleNewTask(event) {
    setTask(event.target.value);
  }

  function addTask() {
    setAdd(task);
    history.push("/Tasks");
  }
  let divToggler =<div className="container">
  {showDiv ? (
    <div className="notask">
      <h2>+Add New Task</h2>
      <button onClick={toggleDiv}>+ New Task</button>
    </div>
  ) : (
    <AddTask />
  )}
</div>

  return (
    <div >
    <Header />
    {divToggler}
    </div>
  );
}

export default Dashboard;
