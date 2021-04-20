 
import {Route, Switch, Redirect} from 'react-router-dom';
import './App.css';  
import Rosteraccess from './rosteraccess';
import Home from './home';

import Dashboard from './admin/dashboard';


function App() { 
   
  return (
    <div className="App container">  
        <Switch>  
                <Route path="/admin/dashboard" component={Dashboard} />
                <Route path="/roster/:accesscode" component={Rosteraccess} />
                <Route path="/" exact component={Home} /> 
               
               
        </Switch> 
    </div>
  );
}

export default App;
