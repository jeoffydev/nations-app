 
import {Route, Switch, Redirect} from 'react-router-dom';
import './App.css';  
import Rosteraccess from './rosteraccess';
import Home from './home';
import axios from 'axios'; 
import { getJwt } from './auth/authService';
 

/*
const jwtToken = localStorage.getItem('token');

console.log("jwtToken", jwtToken);

axios.interceptors.request.use(
  config => {
    config.headers.authorization = 'Bearer ' +  jwtToken;
    return config;
  },
  error => {
    return Promise.reject.error;
  }
) */

 axios.defaults.headers.common["x-auth-token"] = getJwt();
axios.interceptors.response.use(null, error => {
  const expectedError = 
  error.response && 
  error.response.status >= 400 &&
  error.response.status < 500;

  if(!expectedError){
    console.log("An unexpected error");

  }

  return Promise.reject(error);

}) 

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
