 
import React, {Component} from 'react';
import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom'; 
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
    role: '',
    authenticated: ''
  }

  componentDidMount(){ 
    const { email, nameid, role, authenticated } = this.state;    
    try{
        const {email, nameid, role} = getCurrentUser();  
 
        if(email && nameid && role){ 
          this.setState({ email, nameid, role, authenticated:email  });   
        }
       
      
    }
    catch(e){  } 
}
   
  render(){
    
    const {email, nameid, role, authenticated } = this.state;    
    
    return (
        <div className="App container">  
            <ToastContainer />  
            <BrowserRouter>
              <Switch>   
                      
                      {/*<Route path="/admin" render={() => {
                        if (authenticated) { 
                          (<Admin itemState = {this.state } itemProps = {props}  />)
                        } else {
                          ( <Route path="/" exact component={Home} />  )
                        }
                      }} />
                       <Route path="/admin"  render={ (props)=> <Admin itemState = {this.state } itemProps = {props}  />} />  
                      
                      */}
                    
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
            </BrowserRouter>
        </div>
      );
    }
}

export default App;
