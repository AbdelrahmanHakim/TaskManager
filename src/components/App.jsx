import React from 'react';
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import { Route } from 'react-router-dom';
import NewDashboard from '../pages/NewDashboard';



function App(){
    return( <div>
         <Route exact path="/" component={Login} /> 
         <Route  path="/Dashboard" component={Dashboard} />
         <Route  path ="/NewDashboard" component = {NewDashboard}/>

        </div>
    )}

export default App;