import React, {Component} from 'react';  
import {checkLogin } from '../auth/authService'; 
import Navbar from './../common/navbar';
import LoggedinHeader from '../auth/loggedin-header';

class MyRosters extends Component{
    constructor(){
        super();
        
    } 
    componentDidMount(){   
        //Get the user loggedIn
        checkLogin(this.props.itemProps)
        
    }

    render(){  
        const {email, nameid, role } = this.props.itemState;    
        
        return ( 
            <React.Fragment> 
                    <LoggedinHeader email={email} role={role} nameid={nameid} />
                    <Navbar />
                    <main className="container whitebg text-left body-content">
                        
                        My Rosters for admin and users

                    </main>  
           </ React.Fragment>
        )
    }
}

export default  MyRosters;