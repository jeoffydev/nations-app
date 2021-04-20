 
import {Route, Switch, Redirect} from 'react-router-dom';
import './App.css';  
import Rosteraccess from './rosteraccess';
import Home from './home'; 
 
 
function App() {
  return (
    <div className="App container">  
        <Switch>  
                <Route path="/" exact component={Home} /> 
                <Route path="/roster/:accesscode" component={Rosteraccess} />
        </Switch> 
    </div>
  );
}

export default App;
