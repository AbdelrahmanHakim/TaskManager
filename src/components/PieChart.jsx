import React, { useEffect, useState ,useRef} from "react";
import { Doughnut, defaults, Pie } from "react-chartjs-2";
import axios from "axios";
import "./PieChart.css"

function PieChart(props) {
  const token = localStorage.getItem("token");
  const options = {
    headers: { Authorization: token }
  };

  
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [triger, setTriger] = useState(false);

  let response;

  useEffect(() => {
    axios
      .get("https://dev.teledirectasia.com:3092/dashboard", options)
      .then(res => {
        response = res.data;
        setTasksCompleted(response.tasksCompleted);         
        setTotalTasks(response.totalTasks);
        // console.log(response.tasksCompleted ,"use 1");
        setTriger((prevValue)=>{
          return !prevValue;
        });
      })
      .catch(err => {
        console.log(err);
      });
  });

  let datArr;

  useEffect(() => {
    // datArr = [tasksCompleted, totalTasks];
    setData({
      labels: ["completed", "pending"],
      title: {
        text: "Date Time Formatting"
      },
      datasets: [
        {
          label: "Temperature",
          data: [tasksCompleted,totalTasks - tasksCompleted],
          tension: 0,
          borderColor: "white",
          backgroundColor: ["#5285EC","#D9DFEB"],
          radius: 0,
          borderWidth: 1,
          pointHitRadius: 5,
        }
      ]
    });
  }, [triger]);

  useEffect(() => {
    setLoading(false);
  }, [loading]);

  //   setLoading(false);

  return loading ? <div>Chart is loading</div> :
  <div className="pieChart">
     <div className ="Pie">
       <Pie  data={data}  options={{ maintainAspectRatio: false  }} />
      </div> 
  </div>;
  // defaults.global.animation = false;
}

export default PieChart;