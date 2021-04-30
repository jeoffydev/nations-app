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
import { InputCheckBox } from './../form/input';

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
        /*axiosApiInstance.get(apiEndPoint('get') )
            .then(res => {
                //console.log("res.data1", res.data);   
                this.getUserDetails(res.data);
                //console.log("this.getUserDetails(res.data)", this.getUserDetails(res.data));

                this.setState( { dataUsers : res.data });  
        })  */

        axiosApiInstance.get(apiEndPoint('get') ) 
        .then(res => {
            //console.log("res.data1", res.data);   
            //this.getUserDetails(res.data);
            //console.log("this.getUserDetails(res.data)", this.getUserDetails(res.data));

            this.setState( { dataUsers : res.data });  
        })   

        //Get Instruments in DB
        axiosApiInstance.get(apiEndPoint('get-instrument') )
        .then(res => {
            //console.log("res.data2", res.data);   
            this.setState( { instruments : res.data });
        }); 
    }

                

    handleUserDetails(user, insSel){
            console.log("CLICKED", user);
                const { data  } = this.state;

                data.fullName = user.fullname;
                data.id = user.id;
                data.membersInstrumentViewModels = insSel;
                this.setState({data});

    }


    doSubmit = async () =>{ 
        const {   data, dataUsers,  instruments} = this.state; 

         //Save to restore  
         const selectedUser = [...this.state.dataUsers];  
         
         //Update name only
         const finUser = selectedUser.map(obj => { 
                if(obj.id === data.id){
                    obj.fullName = data.fullName
                }   
                return obj;
            } 
         ); 
        
        //Stringify to json
        const dataObj = {
            "fullName" : data.fullName,
            "id": data.id,
            "membersInstrumentViewModels":  arrayToJSONObject(data.membersInstrumentViewModels )
        }  
        //Send update request
        axiosApiInstance.put(apiEndPoint('update-user-details'),  dataObj )
        .then(res => {
            
            try{
                //get the users again
                axiosApiInstance.get(apiEndPoint('get') ) 
                .then(res => { 
                    this.setState( { dataUsers : res.data });  
                }) 
            }
            catch(e){
                return null;
            } 
           
             
       })  
       
    }
    
    

    render(){ 
        const { dataUsers  } = this.state;   
        const {instruments,   data  } = this.state;
        const {item, name } = this.props;   

       
        var userArray = [];
        for (let value of Object.values(dataUsers)) { 
            var arrayPush = {'id': value.id, 'fullname': value.fullName, 'email': value.email, 'instruments':  value.membersInstrumentViewModels}
            userArray.push(arrayPush);
        } 
        
         
 
        //Display all Instruments
        var insArray = [];
        for (let value of Object.values(instruments)) { 
            var arrayPush = {'id': value.id, 'instrumentName': value.instrumentName, 'instrumentDescription': value.instrumentDescription }
            insArray.push(arrayPush);
        }  
        

        
        const userList = userArray.map( (user) =>   
            {   
                
                var insSel = [];
                for (let value of user.instruments) {  
                    insSel.push(value.instrumentId);
                }     

                 //Display all Instruments in list
                const instrumentList = insArray.map( (ins) => {
                        
                            return (  
                                <li className="list-group-item" key={ins.id}>   
                                <div className="form-check">
                                    {data.membersInstrumentViewModels.indexOf(ins.id) !== -1   ? this.InputCheckBox('membersInstrumentViewModels', 'check' + ins.id, 'checkbox', ins.instrumentName, ins.id, true)   :  this.InputCheckBox('membersInstrumentViewModels', 'check' + ins.id, 'checkbox', ins.instrumentName, ins.id, false) } 
                                
                                </div>
                                </li>
                            )

                        }   
                    ) 

                return (

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
                                            <span onClick={()=>this.handleUserDetails(user, insSel)} >
                                                <EditButton idname={name} id={user.id}  />
                                            </span> 
                        
                                            {/* Model here */} 
                                            <div className="modal fade" id={name+ 'Modal' + user.id} tabIndex="-1" role="dialog" aria-labelledby="popModalLabel" aria-hidden="true">
                                                <div className="modal-dialog" role="document">
                                                    <div className="modal-content">

                                                        <PopupHeader idname="user" label={data.fullName} /> 

                                                        <div className="modal-body"> 

                                                                <form className="form-signin" onSubmit={this.handleSubmit} noValidate> 
                                                                    {this.renderInputEdit('id', '', 'text', data.id )} 
                                                                    {this.renderInputEditReadOnly('email', 'Email Address', 'email', user.email )} 
                                                                    {this.renderInputEdit('fullName', 'Full Name', 'text', data.fullName  )}

                                                                    <h3>Skills &amp; Instruments</h3> 
                                                                    
                                                                    {instrumentList}
                                                                
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
            }
            
            
        )   
         
        return (  
            <React.Fragment> 
                   
                    <main className="container whitebg text-left body-content"> 
                        <div className="row">
                            <div className="col-md-12">
                                <h2> <i className="fa fa-users"></i> Users </h2> 
                                <div>
                                    {userList}  
                                </div>

                            </div>
                        </div> 
                    </main>  
           </ React.Fragment>
        )
    }
}

export default  Users;