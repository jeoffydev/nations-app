 
  
import React, {Component} from 'react';
import ReactDOM from 'react-dom'; 
import {Route, Switch, Redirect} from 'react-router-dom';  
import Navbar from './../common/navbar';
import Dashboard from './dashboard';
import Users from './users';
import {getCurrentUser, logout} from '../auth/authService'; 
import 'react-toastify/dist/ReactToastify.css';

class Admin extends Component{
    state ={
        username : '',
        role: ''
    }

    componentDidMount(){ 
        const {username } = this.state;   
        
        try{
            const {email, role} = getCurrentUser(); 
               console.log(email, role); 
            if(role != 'Admin' ){
                logout();
                this.props.history.push('/') 
            }
            this.setState({ username : email, role: role });   
        }
        catch(e){
            //logout();  
            this.props.history.push('/')
        } 
    }
    render(){
       
        
        return (
            <React.Fragment> 
                
               
                <div className="container"> 

                                <div className="row">
                                        <div className="col-md-12 text-right"> 
                                            <span className="badge badge-success"> Hello, {this.state.username} [{this.state.role}]  </span> 
                                        </div>
                                </div> 
                   
                                <Navbar />
                    
                                <Switch>  
                                    <Route path="/admin/users"  component={Users} /> 
                                    <Route path="/admin"  component={Dashboard} /> 
                                    <Route path="/admin"  component={Dashboard} /> 
                                   
                                </Switch> 

                         
                </div>
            </React.Fragment>     
        )
    }
}

export default Admin; 