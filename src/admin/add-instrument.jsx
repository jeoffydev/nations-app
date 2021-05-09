import React, {Component} from 'react';   
import Form from './../form/form'; 
import Joi from 'joi-browser'; 


import {PopupHeader, EditButton, AddButton} from './popup/popup-helper';


//Import these 2 for api and http post
import { apiEndPoint } from '../config/apiEndPoint'; 
import axiosApiInstance from '../auth/httpService';  

class AddInstrument extends Form{


    state = { 
        data: { instrumentName: "", instrumentDescription: "" },
        errors : { },
         
        
    } 
    schema = {
        instrumentName : Joi.string().required().label("Category name"), 
        instrumentDescription : Joi.string().label("Category description"), 
    }  

    constructor(){
        super();
        
    }  

    componentDidMount(){   
        
    }

     
    
    doSubmit = () =>{
        const { data, errordisplay } = this.state; 
         
 
        if(data){
              
                    axiosApiInstance.post(apiEndPoint('add-instrument'),  data)  
                    .then(response => {
                        console.log(response);
                        window.location.reload();
                        
                     }) 
                     .catch(error => {
                        console.log(error.response);
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
                     })  
                
        }  
       


    }

     

    render(){  
        
        const {  errorMsg } = this.state;

       
        return ( 
            <React.Fragment> 


                    
                    <AddButton idname="AddInstrument" id="ins" label="Add Instrument"  /> 

                    {/* Passwrd Modal here */} 
                    <div className="modal fade" id="AddInstrumentModalins" tabIndex="-1" role="dialog" aria-labelledby="popModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content"> 

                                <div className="modal-body"> 

                                    <PopupHeader idname="instrument" label="Add Instrument" />  

                                    {errorMsg && <div className="alert alert-danger" role="alert"> {errorMsg} </div>} 

                                    <form onSubmit={this.handleSubmit}>
                                            {this.renderInput('instrumentName', 'Instrument Name', 'text')} 
                                            {this.renderInput('instrumentDescription', 'Instrument Description', 'text')} 
                                            {this.renderButton('Add Instrument')} 

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

export default  AddInstrument;