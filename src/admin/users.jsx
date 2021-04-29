import React, {Component} from 'react';  
import {authAdminAccess } from '../auth/authService'; 

//Import these 2 for api and http post
import { apiEndPoint } from '../config/apiEndPoint'; 
import axiosApiInstance from '../auth/httpService'; 
import UserEdit from './popup/user-edit';

import Form from './../form/form'; 
import Joi from 'joi-browser'; 

import {PopupHeader, EditButton} from './popup/popup-helper';  
import { arrayToJSONObject } from './../config/codehelper';
import ListInstruments from './popup/list-instruments';

class Users extends  Form{

    state = {
        dataUsers : {}, 
        data: { 
            fullName: '',
            id: '',
            membersInstrumentViewModels: [] 
        },   
        instruments: {},
        insSel: [],
        errors : {},
    }
 


    constructor(){
        super();
        
    }  

    //Joi schema
    schema = { 
        fullName : Joi.string().required().min(4),
        id : Joi.string().required(),
        membersInstrumentViewModels: Joi.array().required()  
    }

   

    componentDidMount(){   
        const { dataUsers } = this.state;

        //Only admin access only
        authAdminAccess(this.props.itemProps); 
        //Get users for admin only
        axiosApiInstance.get(apiEndPoint('get') )
            .then(res => {
                console.log(res.data);   
                this.setState( { dataUsers : res.data });  
        })  

        //Get Instruments in DB
        axiosApiInstance.get(apiEndPoint('get-instrument') )
        .then(res => {
            console.log(res.data);  
            this.setState( { instruments : res.data });
        }) 
 


    }

   

    render(){ 
        const { dataUsers } = this.state;  


        var userArray = [];
        for (let value of Object.values(dataUsers)) { 
            var arrayPush = {'id': value.id, 'fullname': value.fullName, 'email': value.email, 'instruments':  value.membersInstrumentViewModels}
            userArray.push(arrayPush);
        } 
        console.log(userArray, "here")
 
        
        const {instruments,   data  } = this.state;
        const {item, name } = this.props;   
        

        //Display all Instruments
        var insArray = [];
        for (let value of Object.values(instruments)) { 
            var arrayPush = {'id': value.id, 'instrumentName': value.instrumentName, 'instrumentDescription': value.instrumentDescription }
            insArray.push(arrayPush);
        }  
         
        
        const userList = userArray.map( (user) =>  
            <div className="collapse-div-container" key={user.id}>
                <a className="btn btn-primary btn-block teal" data-toggle="collapse" href={'#userCollapse'  + user.id} role="button" aria-expanded="false" aria-controls="userCollapse">
                    {user.fullname} 
                </a>  
                <div className="collapse" id={'userCollapse'  + user.id}>
                    <div className="card card-body">
                       
                        <div className="row">
                            <div className="col-md-4">
                                    <p> Full Name: <br /> {user.fullname}  </p>
                                    <p>  Email:<br />  {user.email} </p> 
                                    <EditButton idname={name} id={user.id} />
                
                                    {/* Model here */} 
                                    <div className="modal fade" id={name+ 'Modal' + user.id} tabIndex="-1" role="dialog" aria-labelledby="popModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">

                                                <PopupHeader idname="user" label={data.fullname} /> 

                                                <div className="modal-body"> 

                                                        <form className="form-signin" onSubmit={this.handleSubmit} noValidate> 
                                                            {this.renderInputEdit('id', '', 'hidden', user.id )} 
                                                            {this.renderInputEditReadOnly('email', 'Email Address', 'email', user.email )} 
                                                            {this.renderInputEdit('fullName', 'Full Name', 'text', user.fullname  )}

                                                            <h3>Skills &amp; Instruments</h3>
                                                            
                                                            <ListInstruments instrumentsArray={insArray} myItems ={user.instruments} onChange={this.handeInstrumentChangeCheckBox} />
                                                           
                                                            {this.renderButton('Update')} 
                                                        </form>  
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Model here */} 
                                     
                            </div>
                            <div className="col-md-8">
                                   <h3>Skills &amp; Member's Intruments</h3> 
                                   <p>{user.instruments.length === 0 ? 'No instrument saved for this member ' : ''}</p>
                                   <ul className="list-group">
                                    {user.instruments.map( (ins)=>
                                            <li className="list-group-item" key={ins.instrumentId}> { ins.instrument.instrumentName }</li>
                                        )}
                                   </ul>
                                   
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        )   



         
        return (  
            <React.Fragment> 
                   
                    <main className="container whitebg text-left body-content"> 
                        <div className="row">
                            <div className="col-md-12">
                                <h2> <i className="fa fa-users"></i> Users </h2> 

                                {userList}  

                            </div>
                        </div> 
                    </main>  
           </ React.Fragment>
        )
    }
}

export default  Users;