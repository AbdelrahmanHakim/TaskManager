import React,{useState} from 'react'
import "./DashboardNewTask.css"
import AddTask from './AddTask'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


function DashboardNewTask(){
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
  
  
return (<div className="taskheading">

     <div className="taskLabel">
            <label>Tasks</label>
    </div>

    <div >
        <input className="searchBar" placeholder="Please enter a task"/>
    </div>

      <div>
        <Button class="newTaskButton" variant="contained"  color="primary" onClick={handleClickOpen}>
          +New Task
        </Button>

        
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
  
          <DialogContent>
            <DialogContentText>
           <AddTask />
            </DialogContentText>
 
          </DialogContent>

        </Dialog>
      </div>
    

</div>)
}

export default DashboardNewTask;