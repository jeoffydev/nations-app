 
  
import React, {Component} from 'react';
import ReactDOM from 'react-dom'; 
import {Route, Switch, Redirect} from 'react-router-dom';  
import Navbar from './../common/navbar';
import Dashboard from './dashboard';
import Users from './users';
import Categories from './categories';
import Instruments from './instruments';
import LoggedinHeader from '../auth/loggedin-header';
import {checkLogin } from '../auth/authService'; 
import 'react-toastify/dist/ReactToastify.css';


class Admin extends Component{

    constructor(){
        super();
        
    }  

    componentDidMount(){  
        checkLogin(this.props.itemProps)
    }
    render(){ 

        const {email, nameid, role } = this.props.itemState;    
        
        return (
            <React.Fragment>  
                <div className="container">  
                                <LoggedinHeader email={email} role={role} nameid={nameid} />
                                <Navbar /> 
                                
                                <Switch>   
                                    <Route path="/admin/instruments"   render={ (props)=> <Instruments itemState = {this.props.itemState} itemProps = {this.props.itemProps}  />}   />   
                                    <Route path="/admin/categories"   render={ (props)=> <Categories itemState = {this.props.itemState} itemProps = {this.props.itemProps}  />}   />   
                                    <Route path="/admin/users"   render={ (props)=> <Users itemState = {this.props.itemState} itemProps = {this.props.itemProps}  />}   />   
                                    <Redirect from ="/admin" to = "/admin/my-rosters" />  
                                </Switch>  
                         
                </div>
            </React.Fragment>     
        )
    }
}

export default Admin; 