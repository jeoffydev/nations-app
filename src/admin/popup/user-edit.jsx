import React, {Component} from 'react';   
import Form from '../../form/form'; 
import Joi from 'joi-browser'; 

//Import these 2 for api and http post
import { apiEndPoint } from '../../config/apiEndPoint'; 
import axiosApiInstance from '../../auth/httpService'; 

import {PopupHeader, EditButton} from './popup-helper';

class UserEdit extends Form{
    constructor(props){
        super(props);

        
         
    } 

     
     
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

    //Joi schema
    schema = { 
        fullName : Joi.string().required().min(4),
        id : Joi.string().required(),
        membersInstrumentViewModels: Joi.array().required()  
    }

   

    componentDidMount(){   
         //Get Instruments in DB
         axiosApiInstance.get(apiEndPoint('get-instrument') )
         .then(res => {
             console.log(res.data);  
             this.setState( { instruments : res.data });
        }) 
        
        //Selected Instruments for Users
        const {selectedInstrument} = this.props; 
        //Select Instruments
        var insSel = [];
        for (let value of selectedInstrument) {  
            insSel.push(value.instrumentId);
        }  
         
        //User edit 
        const { data  } = this.state;
        const {item  } = this.props;  

        //User Edit
        data.fullName = this.props.item.fullname;
        data.id = this.props.item.id;
        //data.membersInstrumentViewModels = insSel;
        this.setState({data});

       
        
    }
 

    doSubmit = async () =>{ 
        const {   data } = this.state;
        console.log(  data );
        
        const dataObj = {
            "fullName" : data.fullName,
            "id": data.id 
        }
       console.log(apiEndPoint('update-user-details'));
        axiosApiInstance.put(apiEndPoint('update-user-details'),  dataObj )
        .then(res => {
            console.log(res.data);  
            
       })  
    }
    
    
    render(){ 

        const {instruments,   data  } = this.state;
        const {item, name } = this.props;   
        
        //Display all Instruments
        var insArray = [];
        for (let value of Object.values(instruments)) { 
            var arrayPush = {'id': value.id, 'instrumentName': value.instrumentName, 'instrumentDescription': value.instrumentDescription }
            insArray.push(arrayPush);
        } 
        //Display all Instruments in list
        const instrumentList = insArray.map( (ins) =>    
            <li className="list-group-item" key={ins.id}>  
                <div className="form-check">
                    {data.membersInstrumentViewModels.indexOf(ins.id) !== -1   ? this.InputCheckBox('instrumentCheckBox', 'check' + ins.id, 'checkbox', ins.instrumentName, ins.id, true)   :  this.InputCheckBox('instrumentCheckBox', 'check' + ins.id, 'checkbox', ins.instrumentName, ins.id, false) } 
                   
                </div>
            </li>
        ) 

        return (

            <React.Fragment>

                <EditButton idname={name} id={item.id} />
                
                {/* Model here */} 
                <div className="modal fade" id={name+ 'Modal' + item.id} tabIndex="-1" role="dialog" aria-labelledby="popModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <PopupHeader idname="user" label={item.fullname} /> 
                            <div className="modal-body"> 

                                    <form className="form-signin" onSubmit={this.handleSubmit} noValidate> 
                                        {this.renderInputEdit('id', '', 'hidden', item.id )} 
                                        {this.renderInputEditReadOnly('email', 'Email Address', 'email', item.email )} 
                                        {this.renderInputEdit('fullName', 'Full Name', 'text', data.fullName  )}

                                        <h3>Skills &amp; Instruments</h3>
                                        <ul className="list-group">     
                                            {instrumentList}
                                        </ul> 
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
                  
            </React.Fragment>
        )
    }
}

export default UserEdit;
 