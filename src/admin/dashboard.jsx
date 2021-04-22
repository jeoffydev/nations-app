import React, {Component} from 'react'; 
import { apiEndPoint } from '../config/apiEndPoint'; 
import axiosApiInstance from '../auth/httpService';
import {getCurrentUser, logout} from '../auth/authService';

class Dashboard extends Component{
    state ={
        username : ''
    }

    componentDidMount(){

        const {username } = this.state;
       
        try{
            const {email} = getCurrentUser();
            this.setState({ username : email });  
        }
        catch(e){ } 
    }

    getUsers= async () =>{ 
        // sample axios.get(apiEndPoint('get'), { headers: {"Authorization" : `Bearer ${getJwt()}`} })

        axiosApiInstance.get(apiEndPoint('get') )
        .then(res => {
            console.log(res.data); 
        }) 
    }




    render(){
        
        return ( 
            <React.Fragment>
                    <h1> Dashboard / Hello {this.state.username}</h1>
                    <span className="btn btn-danger" onClick={this.getUsers}> Get Users </span> 
                    <button type="button" class="btn btn-link" onClick={logout}>Logout</button>
 
           </ React.Fragment>
        )
    }
}

export default  Dashboard;