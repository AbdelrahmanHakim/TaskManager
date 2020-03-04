// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Task from "./Task";
// import Spinner from "./UI/Spinner"
// import { useHistory } from "react-router-dom";

//  function TaskList () {

//   const [data, setData] = useState("");
//   const [id, setId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [renderer, setRenderer] = useState(false);

//   const token = localStorage.getItem("token");
//   let response;
//   const options = {
//     headers: { Authorization: token }
//   };

//   let history = useHistory();

//   useEffect(() => {
//     axios
//       .get("https://dev.teledirectasia.com:3092/tasks", options)
//       .then(res => {
//         response = res.data;
//         console.log(response.tasks);
//         setData(response);
//         setLoading(true);
//         setRenderer(false);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }, [data]);

//   const deleteHandler = taskId => {
//     console.log(taskId);
//     setRenderer(true);
    
//     setId(taskId);
//   };

//   const editHandler = taskId => {
//     console.log(taskId);
//     setRenderer(true);
    
//     setId(taskId);
//   };
  
//   useEffect(() => {
//     axios
//       .delete("https://dev.teledirectasia.com:3092/tasks/" + id, options)
//       .then(res => {
//         console.log("deleted");
//             })
//       .catch(err => {
//         console.log(err);
//       });
//   }, [deleteHandler,renderer]);

//   useEffect(() => {
//     axios
//       .delete("https://dev.teledirectasia.com:3092/tasks/" + id, options)
//       .then(res => {
//         console.log("deleted");
       
//             })
//       .catch(err => {
//         console.log(err);
//       });
//   }, [editHandler,renderer]);


//   return (
//     <div className="listoftasks">
    
//       {!loading ? (
//         <Spinner />
//       ) : (
        
//         data.tasks.map(task => {
          
//   function editTask(){
//     editHandler(task._id)
//     history.push("/Dashboard")
//   }
//           return (
//             <Task
//               key={task._id}
//               taskName={task.name}
//               taskStatus={task.completed ? "Done" : "Not complete"}
//               deleteButtonClicked={() => deleteHandler(task._id)}
//               editButtonClicked={editTask}

//             />
//           );
//         })
//       )}

      
      
//     </div>
//   );
// };

// export default TaskList;
import React, { useEffect, useState } from "react";
import axios from "axios";
import Task from "./Task";
import Spinner from "./UI/Spinner";
import { useHistory } from "react-router-dom";


function TaskList() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkedBox, setCheckedBox] = useState(false);
  const [deletedId, setDeletedId] = useState();
  const [editId, setEditId] = useState();
  const [renderer, setRenderer] = useState();
  const [filteredTask,setFilteredTask] = useState({});
  let history = useHistory();

  const token = localStorage.getItem("token");
  let response;
  const options = {
    headers: { Authorization: token }
  };

  useEffect(() => {
    axios
      .get("https://dev.teledirectasia.com:3092/tasks", options)
      .then(res => {
        response = res.data;
        console.log(response.tasks);
        setData(response);
        setLoading(true);
        
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteHandler = taskId => {
    
    setDeletedId(taskId);
  };

  const editBoxCheckedHandler = id => {
    setCheckedBox((prevValue)=>{
      return !prevValue;
    })
    console.log("Filtered Task ",filteredTask);
    setEditId(id);
  };

  useEffect(() => {
    if (deletedId) {
      axios
        .delete(
          "https://dev.teledirectasia.com:3092/tasks/" + deletedId,
          options
        )
        .then(res => {
          setRenderer(prevValue => {
            return !prevValue;
          });
          console.log(deletedId);
          console.log("deleted");
        })
        .catch(err => {
          console.log(err, "m3mlsh delete");
        });
    }
  }, [deletedId]);
  
  useEffect(() => {
    if (editId) {
      const taskFiltered =  data.tasks.filter(task => {
        return task._id === editId;
      });
      setFilteredTask(taskFiltered);
      console.log(filteredTask,"filtered task");
      // console.log(data.tasks);
      console.log(editId);
      axios
        .put(
          "https://dev.teledirectasia.com:3092/tasks/" + editId,
          { name: filteredTask.name , completed: true },
          options
        )
        .then(res => {
          // response = res.data;
          console.log("edited");
          setRenderer(prevValue => {
            return !prevValue;
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [editId]);

useEffect(() => {
    axios
      .get("https://dev.teledirectasia.com:3092/tasks", options)
      .then(res => {
        response = res.data;
        console.log(response.tasks);
        setData(response);
        setLoading(true);
      })
      .catch(err => {
        console.log(err);
      });
  }, [filteredTask]);


  useEffect(() => {
    axios
      .get("https://dev.teledirectasia.com:3092/tasks", options)
      .then(res => {
        response = res.data;
        console.log(response.tasks);
        setData(response);
        setLoading(true);
      })
      .catch(err => {
        console.log(err);
      });
  }, [renderer]);

  function editTask(){
      deleteHandler(deletedId)
        history.push("/Dashboard")
      }

  return (
    <div>
      {!loading ? (
        <Spinner />
      ) : (
        data.tasks.map(task => {
          return (
            <Task
              key={task._id}
              taskName={task.name}
              taskStatus={task.completed ? "completed" : "Not completed"}
              editBoxChecked={() => editBoxCheckedHandler(task._id)}
              deleteButtonClicked={() => deleteHandler(task._id)}
              // isChecked = {checkedBox}
              style = {{textDecoration: checkedBox === true && task._id === editId ? "line-through" : "none"}}

              editButtonClicked={editTask}
              
            />
              

          );
        })
      )}
    </div>
  );
}

export default TaskList;