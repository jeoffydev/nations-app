 
import {Route, Switch, Redirect} from 'react-router-dom'; 
import Rosteraccess from './rosteraccess';
import Home from './home';
import { ToastContainer } from 'react-toastify';
import {getCurrentUser } from './auth/authService';  
import Admin from './admin/admin'; 
import 'react-toastify/dist/ReactToastify.css';
import './App.css';  
import Users from './admin/users';




function App() { 
  
   
  return (
    <div className="App container">  
        <ToastContainer /> 
        <Switch>   
                 
                <Redirect from ="/home" to = "/" />

                <Route path="/roster/:accesscode" component={Rosteraccess} /> 
                <Route path="/admin" component={Admin} /> 
                <Route path="/" exact component={Home} />   
               
        </Switch> 
    </div>
  );
}

export default App;
