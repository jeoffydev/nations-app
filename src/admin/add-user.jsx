import React, {Component} from 'react';   
//import Form from './../form/form'; 
//import Joi from 'joi-browser'; 

import {PopupHeader, EditButton, AddButton} from './popup/popup-helper';


//Import these 2 for api and http post
import { apiEndPoint } from '../config/apiEndPoint'; 
import axiosApiInstance from '../auth/httpService';  

class AddUser extends Component{


    state = { 
        
        errors : { },
        errordisplay: {},
        errorMsg: '',
        register: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            errorReg: ''
        } 
        
    }

  /* data: { fullName: "", email : "", password: "", confirmPassword: ""},
    schema = {
        fullName : Joi.string().required().label("Full name"),
        email : Joi.string().required().email().label("Email"),
        password: Joi.string().required().min(3).label("Password"),
        confirmPassword : Joi.string().required().label('Confirm password')
    } */

    constructor(){
        super();
        
    } 



    componentDidMount(){   
        
    }

    submitRegister = (e)=>{
        e.preventDefault();

    }

    
    doSubmit = () =>{
        const { data, errordisplay } = this.state;
        console.log(data);
        console.log("Register  submitted"); 

        if(data){
              
                    axiosApiInstance.post(apiEndPoint('add'),  data)
                    .then(res => {
                        console.log(res);
                        //location.reload(); // refreshes the page 
                      })
                      .catch(error => {
                         
                        console.log(error.response.status);
                      })
                    /*
                    .then(response => {
                         if (response.data.status == 200) {
                            alert("Good");
                          } else {
                            alert("Ay");
                          }
                        
                     }) 
                     .catch(error => {

                        if(error){
                            const errordisplay = error.response.data;   
                            if(errordisplay.ConfirmPassword ){ 
                                const errorMsg = errordisplay.ConfirmPassword[0];
                                this.setState( { errorMsg  });  
                            }  
                            if(errordisplay.error ){ 
                                const errorMsg = errordisplay.error;
                                this.setState( { errorMsg  });  
                            }   
                        }
                        
                       
                     }) */

                     
                
        }
       


    }

    ChangeThisForm = (e) => {
        const { currentTarget: input } = e; 
        const {  register, errorMsg } = this.state; 
        
        if(input.name === "fullName"){
            register.fullName = input.value;
            this.setState({register})
        }
        if(input.name === "email"){
            register.email = input.value;
            this.setState({register})
        }
        if(input.name === "password"){
            register.password = input.value;
            this.setState({register})
        }
        if(input.name === "confirmPassword"){
            register.confirmPassword = input.value;
            this.setState({register})
        } 
        
        if(register.password && register.confirmPassword){
            const  errorMsgs = false;
            if(register.password === register.confirmPassword){ 
                this.setState({errorMsg :  errorMsgs})
            }else{
                const  errorMsgs = 'Password didn\'t match';
                this.setState({errorMsg :  errorMsgs})
            }
            console.log(errorMsgs)
            
        }
        
         
    }

    render(){  
        
        const {  errorMsg } = this.state;

       
        return ( 
            <React.Fragment> 
                    
                    <AddButton idname="AddUser" id="user" label="Add User"  />
                    
                   

                    {/* Passwrd Modal here */} 
                    <div className="modal fade" id="AddUserModaluser" tabIndex="-1" role="dialog" aria-labelledby="popModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content"> 

                                <div className="modal-body"> 

                                    <PopupHeader idname="user" label="Add new user" />  

                                    {errorMsg && <div className="alert alert-danger" role="alert"> {errorMsg} </div>}


                                    <form className="form-signin" onSubmit={this.submitRegister} noValidate  >
                                        <div className="form-group">
                                            <label htmlFor="fullName">Full Name</label>
                                            <input type="text" name="fullName" className="form-control" id="fullName"  onChange={this.ChangeThisForm}  />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email Address</label>
                                            <input type="email" name="email" className="form-control" id="email"  onChange={this.ChangeThisForm} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" name="password" className="form-control" id="password"   onChange={this.ChangeThisForm}   />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="confirmPassword">Confirm Password</label>
                                            <input type="password" name="confirmPassword" className="form-control" id="confirmPassword"   onChange={this.ChangeThisForm} />
                                        </div>
                                        <button type="submit" disabled={errorMsg ? true: ''} className="btn btn-primary">Register</button>
                                    </form>

                                    {/*<form onSubmit={this.handleSubmit}>
                                        {this.renderInput('fullName', 'Full Name', 'text')}
                                        {this.renderInput('email', 'Email Address', 'email')}
                                        {this.renderInput('password', 'Password', 'password')}
                                        {this.renderInput('confirmPassword', 'Confirm Password', 'password')}
                                        {this.renderButton('Register')} 
        </form>*/}


                                                                                                    
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> 
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Modal here */} 
                    
           </ React.Fragment>
        )
    }
}

export default  AddUser;