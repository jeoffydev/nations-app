import React, {Component} from 'react';  
import {authAdminAccess } from '../auth/authService'; 

//Import these 2 for api and http post
import { apiEndPoint } from '../config/apiEndPoint'; 
import axiosApiInstance from '../auth/httpService';


class Users extends Component{

    state = {
        dataUsers : {} 
    }

    constructor(){
        super();
        
    }  

   

    componentDidMount(){  

        const { dataUsers } = this.state;

        //Only admin access only
        authAdminAccess(this.props.itemProps);

        //Get users for admin only
        axiosApiInstance.get(apiEndPoint('get') )
            .then(res => {
                //console.log(res.data);  
                this.setState( { dataUsers : res.data });
        }) 

    }

    render(){ 
        const { dataUsers } = this.state; 
        console.log(dataUsers) 

        return ( 
            <React.Fragment> 
                    <main className="container whitebg text-left body-content">
                        
                        USERS
                         
                        

                    </main>  
           </ React.Fragment>
        )
    }
}

export default  Users;