import React from 'react'
import LatestTasks from '../components/LatestTasks'
import TaskList from '../components/TaskList'
import PieChart from '../components/PieChart'
import Header from '../components/Header'
import Percentage from '../components/Percentage'
import "../components/Task.css"
import DashboardNewTask from "../components/DashboardNewTask"


function NewDashboard() {

    return (<div>
        <Header />

 <div className="newDashboard"> 
        <Percentage />
        <LatestTasks />
        <PieChart />
</div>
        <DashboardNewTask />
        <TaskList />  
    </div>)
}

export default NewDashboard;