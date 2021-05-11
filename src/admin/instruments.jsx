import React, {Component} from 'react';   
import {authAdminAccess } from '../auth/authService'; 
import Form from './../form/form'; 
import Joi from 'joi-browser'; 
import AddCategory from './add-category';
import AddInstrument from './add-instrument';


//Import these 2 for api and http post
import { apiEndPoint } from '../config/apiEndPoint'; 
import axiosApiInstance from '../auth/httpService';  

import {PopupHeader, EditButton, AddButton} from './popup/popup-helper';  
import swal from 'sweetalert'; 

import { Header } from 'semantic-ui-react'

class Instruments extends  Form{

    state = {
        dataInstruments: {},
        data: { 
            id: '',
            instrumentName: '',
            instrumentDescription: ''
        }, 
        errors : {},
        popupName: ''  
        
        
    }
 


    constructor(props){
        super(props);
        
    }  

    //Joi schema
    schema = { 
        id : Joi.number().required(),
        instrumentName : Joi.string().required().min(4), 
        instrumentDescription : Joi.string(), 
    }

   

    componentDidMount(){   

        //Only admin access only
        authAdminAccess(this.props.itemProps); 

        const { dataInstruments } = this.state; 

       axiosApiInstance.get(apiEndPoint('get-instruments') ) 
        .then(res => {
             console.log(res.data);
             this.setState( { dataInstruments : res.data });  
        })   
         
    }

   
    
    handleInstrumentDetails(ins, insName ){
             
        const { data, popupName  } = this.state;

        data.id = ins.id; 
        data.instrumentName = ins.instrumentName;  
        data.instrumentDescription = ins.instrumentDescription;  
        this.setState({data, popupName: insName});

   }


   //Do submit all the forms
   doSubmit = async () =>{ 
        const {   data } = this.state;  
        
        //Stringify to json
        const dataObj = {
            "instrumentName" : data.instrumentName,
            "instrumentDescription" : data.instrumentDescription,
            "id": data.id,  
        }  
        //Send update request
        axiosApiInstance.put(apiEndPoint('update-instrument'),  dataObj )
        .then(res => { 
            try{
                //get the instruments again
                axiosApiInstance.get(apiEndPoint('get-instruments') ) 
                .then(res => { 
                    this.setState( { dataInstruments : res.data });   
                }) 
            }
            catch(e){
                console.log(e);
                return null;
            }  
        })  
    
    }

    //Delete instrument
    deleteInstrument = (id) =>{
        const { dataInstruments } = this.state; 

        //console.log(id);

        swal({
            title: "Are you sure you want to delete this Instrument?",
            text: "Once deleted, you will not be able to recover this Instrument!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

                    const dataObj = { 
                        "id": id,
                    }   
                     
                    //Send delete request
                    axiosApiInstance.delete(apiEndPoint('delete-instrument') + "/" + id   )
                    .then(res => { 
                        try{
                            //console.log(res.data.value)
                             this.setState( { dataInstruments : res.data.value});  
                        }
                        catch(e){
                            return null;
                        }  
                })  

                swal("Instrument has been deleted!", {
                    icon: "success",
                });
                 
            } else {
              swal("Instrument is safe!");
            }
          });

    }
 

    render(){ 
        
        const { dataInstruments, data, popupName } = this.state; 
        //console.log(dataInstruments, data, popupName);

        /* Filter here  */
 
        var insArray = [];
        for (let value of Object.values(dataInstruments)) { 
            var arrayPush = {'id': value.id, 'instrumentName': value.instrumentName,  'instrumentDescription': value.instrumentDescription}
            insArray.push(arrayPush);
        } 

        const instrumentList = insArray.map( (ins) => {
 
            var insName = ins.instrumentName.split(" ").join("");
            return (
                <tbody key={ins.id}> 
                    <tr> 
                        <td>{ins.instrumentName} - <small>{ins.instrumentDescription}</small></td>
                        <td  className="text-center">  
                            <span onClick={()=>this.handleInstrumentDetails(ins, insName)}>   <EditButton idname={insName} id={ins.id} label="Edit" />  </span>   
                        
                        </td>
                        <td  className="text-center"> <span  className="cursor-point" onClick={()=>this.deleteInstrument(ins.id)}  > <i className="fa fa-trash"></i> </span> </td>
                    </tr> 
                </tbody>  
                
            )
        })
         
        return (  
            <React.Fragment> 
                   
                    <main className="container whitebg text-left body-content"> 
                        <div className="row">
                            <div className="col-md-12">
                                <Header as='h2' icon='box' content='Instruments'></Header> 

                                <div className="row">
                                    <div className="col-md-3">
                                        <AddInstrument  />
                                    </div> 
                                    <div className="col-md-9">  
                                        
                                    </div>
                                </div>
                                 

                                <div className="row">
                                    <div className="col-md-12">

                                    <table className="table table-striped">
                                        <thead>
                                            <tr> 
                                                <th scope="col">Instrument Name/Description</th>
                                                <th className="text-center" scope="col">Edit</th>
                                                <th className="text-center" scope="col">Delete</th>
                                            </tr>
                                        </thead>
                                        {instrumentList} 
                                    </table> 
                                         
                                    </div>  
                                </div>
                                
                                 
                            </div>
                        </div> 
                    </main> 

                    <div className="modal fade" id={popupName + 'Modal' + data.id} tabIndex="-1" role="dialog" aria-labelledby="popModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content"> 
                                        <PopupHeader idname="instrument" label={'Edit ' + data.instrumentName} />  
                                        <div className="modal-body text-left">  
                                            <form className="form-signin" onSubmit={this.handleSubmit} noValidate> 
                                                {this.renderInputEdit('id', '', 'hidden',  data.id )}  
                                                {this.renderInputEdit('instrumentName', 'Instrument Name', 'text', data.instrumentName  )}
                                                {this.renderInputEdit('instrumentDescription', 'Instrument Description', 'text', data.instrumentDescription  )}
                                                {this.renderButton('Update')} 
                                            </form>  
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> 
                                        </div>
                                    </div>
                                </div>
                    </div>   


                   

           </ React.Fragment>
        )
    }
}

export default  Instruments;