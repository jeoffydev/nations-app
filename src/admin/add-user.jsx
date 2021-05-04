import React, {Component} from 'react';   
import Form from './../form/form'; 
import Joi from 'joi-browser'; 

import {PopupHeader, EditButton, AddButton} from './popup/popup-helper';

class AddUser extends Form{


    state = { 
        data: { name: "", email : "", password: "", passwordconfirm: ""},
        errors : { }
        
    }

  
    schema = {
        name : Joi.string().required().label("Full name"),
        email : Joi.string().required().email().label("Email"),
        password: Joi.string().required().min(3).label("Password"),
        passwordconfirm : Joi.string().valid(Joi.ref('password')).required().label('Confirm password').options({
            language: {
              any: {
                allowOnly: 'Passwords do not match',
              }
            } 
          })
    }

    constructor(){
        super();
        
    } 



    componentDidMount(){   
        
    }

    
    doSubmit = () =>{
        console.log("Register  submitted"); 
    }

    render(){  
        
        
        return ( 
            <React.Fragment> 
                    
                    <AddButton idname="AddUser" id="user" label="Add User"  />

                    {/* Passwrd Modal here */} 
                    <div className="modal fade" id="AddUserModaluser" tabIndex="-1" role="dialog" aria-labelledby="popModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content"> 

                                <div className="modal-body"> 

                                    <PopupHeader idname="user" label="Add new user" />  

                                    <form onSubmit={this.handleSubmit}>
                                        {this.renderInput('name', 'Full Name', 'text')}
                                        {this.renderInput('email', 'Email Address', 'email')}
                                        {this.renderInput('password', 'Password', 'password')}
                                        {this.renderInput('passwordconfirm', 'Confirm Password', 'password')}
                                        {this.renderButton('Register')} 
                                    </form>


                                                                                                    
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