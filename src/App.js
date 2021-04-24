 
import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'; 
import Rosteraccess from './rosteraccess';
import Home from './home';
import { ToastContainer } from 'react-toastify';
import {getCurrentUser } from './auth/authService';  
import Admin from './admin/admin';   
import MyRosters from './admin/my-rosters'; 
import Errorpage from './error';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';  



class App extends Component{
//function App() { 
  
  state ={
    email : '',
    nameid : '',
    role: ''
  }
  componentDidMount(){ 
    const { email, nameid, role } = this.state;    
    try{
        const {email, nameid, role} = getCurrentUser();  
        this.setState({ email, nameid, role  });   
    }
    catch(e){  } 
}
   
  render(){
    
    const {email, nameid, role } = this.state;    
    
    return (
        <div className="App container">  
            <ToastContainer />  
            <Switch>   
                    
                   
                    <Route path="/error-page" component={Errorpage} />
                    <Route path="/roster/:accesscode" component={Rosteraccess} />  

                    {/* PRivate pages */}
                    <Route path="/admin/my-rosters"   render={ (props)=> <MyRosters itemState = {this.state } itemProps = {props}  />} />  
                    <Route path="/admin"  render={ (props)=> <Admin itemState = {this.state } itemProps = {props}  />} />  
                      {/* PRivate pages */}

                    <Route path="/" exact component={Home} />   
                    <Redirect from ="/home" to = "/" />  
                    <Redirect to="/error-page"   />
                  
            </Switch> 
        </div>
      );
    }
}

export default App;
