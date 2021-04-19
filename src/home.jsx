import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Joi from 'joi-browser'; 
import Form from './form/form'; 
import axios from 'axios'; 
import { apiEndPoint } from './config/apiEndPoint';
import { getJwt } from './auth/authService';

/*const jwtToken = localStorage.getItem('token');
const authAxios = axios.create(
    { 
        headers : { Authorization: `Bearer ${jwtToken}` }
    }
) */

class Home extends Form{

    state={
        data: {
            email: '',
            password: ''
        },
        errors : { },
        userLoggedIn : {}
    }

    //Joi schema
    schema = {
        email : Joi.string().required().email().label("Email Address"),
        password: Joi.string().required().min(3).label("Password")
    }

    

    async componentDidMount(){ 
        
        //console.log(apiEndPoint('get')); 
      
        
    }

    getUsers= async () =>{
       // const { data: users } = await  authAxios.get(apiEndPoint('get'));  
        //console.log(users);

        axios.get(apiEndPoint('get'), { headers: {"Authorization" : `Bearer ${getJwt()}`} })
        .then(res => {
            console.log(res.data); 
        })


    }

    doSubmit = async () =>{
       

        try{
            console.log("Form submitted" );
            console.log(apiEndPoint('login'));
            const {data}  = await axios.post( apiEndPoint('login'), this.state.data );  
            console.log(data);
            localStorage.setItem('token', data.token);
        }
        catch(e){
            console.log(e.response.data.error)
            
            //console.log(e.response.error + '/' + e.response.status);
        }
    }
    
    render(){
       
        
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 text-left">

                        <span className="btn btn-danger" onClick={this.getUsers}> Get Users </span>

                    <form className="form-signin" onSubmit={this.handleSubmit} noValidate>

                        <div className="text-center mb-4">
                            <img className="mb-4" src={"/logo-nations.png"}  className="img-thumbnail"    alt="logo"  />
                            <h1 className="h3 mb-3 font-weight-normal">Nations Roster App</h1>
                            <p>“Advancing the kingdom”. We exist to make disciples who in turn make disciples.</p>
                        </div>

                        {this.renderInput('email', 'Email Address', 'email')}
                        {this.renderInput('password', 'Password', 'password')}
                        {this.renderButton('Login')}
                        
                        
                        
                    </form>

                    </div>
                    <div className="col-md-4"></div>
                </div>
                  
        </React.Fragment>
        )
    }
}

export default Home;