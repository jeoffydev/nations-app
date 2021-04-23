import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Joi from 'joi-browser'; 
import Form from './form/form'; 
import axios from 'axios'; 
import { apiEndPoint } from './config/apiEndPoint';  
import {getCurrentUser, login} from './auth/authService'; 
import AlertMessage from './common/alert';

class Home extends Form{

    state={
        data: {
            email: '',
            password: ''
        },
        errors : { },
        loginError: false,
        userLoggedIn : {}
    }

    //Joi schema
    schema = {
        email : Joi.string().required().email().label("Email Address"),
        password: Joi.string().required().min(3).label("Password")
    }

    

    componentDidMount(){  
        //console.log(apiEndPoint('get'));  
        try{
            const userdata = getCurrentUser();
            if(userdata.email != null){
                this.props.history.push('/admin')
            }
        }
        catch(e){ } 

    }

   

    doSubmit = async () =>{ 
        const { loginError } = this.state;
        try{
            //console.log("Form submitted" );
            //console.log(apiEndPoint('login'));
            const {data}  = await axios.post( apiEndPoint('login'), this.state.data );   
            login(data);
        }
        catch(e){
            //console.log(e.response.data.error); 
            //console.log(e.response.error + '/' + e.response.status);

            const loginError =  e.response.data.error;
            this.setState({ loginError });
        }
    }
    
    render(){
        
        const { loginError } = this.state;

        return (
            <React.Fragment>
                <div className="row login-form">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 text-left">

                    <div className="text-center mb-4">
                            <img className="mb-4" src={"/logo-nations.png"}  className="img-thumbnail"    alt="logo"  />
                            <h1 className="h3 mb-3 font-weight-normal">Nations Roster App</h1>
                            <p>“Advancing the kingdom”. We exist to make disciples who in turn make disciples.</p>
                    </div>

                    {loginError && <AlertMessage value={loginError} classes='alert-danger' /> }        

                    <form className="form-signin" onSubmit={this.handleSubmit} noValidate> 

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