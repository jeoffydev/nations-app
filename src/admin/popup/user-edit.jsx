import React, {Component} from 'react';   
import Form from '../../form/form'; 
import Joi from 'joi-browser'; 

//Import these 2 for api and http post
import { apiEndPoint } from '../../config/apiEndPoint'; 
import axiosApiInstance from '../../auth/httpService'; 


class UserEdit extends Form{
    
    state = {
        dataUsers : {},
        data: { 
            fullName: '' 
        },   
        instruments: {},
        insSel: [],
        errors : { },
    }

    //Joi schema
    schema = { 
        fullName : Joi.string().required().min(4) 
    }

    constructor(){
        super();
        
    } 
    

    componentDidMount(){   
         //Get Instruments in DB
         axiosApiInstance.get(apiEndPoint('get-instrument') )
         .then(res => {
             console.log(res.data);  
             this.setState( { instruments : res.data });
        }) 
        
        const {insSel  } = this.state;
        const {selectedInstrument} = this.props; 
        //Select Instruments
        //var insSel = [];
        for (let value of selectedInstrument) {  
            insSel.push(value.instrumentId);
        }  
        this.setState( { insSel });
        //console.log("insSel", insSel);
    }

   

    doSubmit = async () =>{ 
        const { loginError, data,  insSel} = this.state;
        console.log(data, insSel); 
    }
    
    
    render(){ 

        const {instruments, insSel  } = this.state;
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
                    {insSel.indexOf(ins.id) !== -1   ? this.InputCheckBox('instrumentCheckBox', 'check' + ins.id, 'checkbox', ins.instrumentName, ins.id, true)   :  this.InputCheckBox('instrumentCheckBox', 'check' + ins.id, 'checkbox', ins.instrumentName, ins.id, false) } 
                   
                </div>
            </li>
        ) 

        return (
            <React.Fragment>
                <p> <button type="button" className="btn btn-sm btn-dark " data-toggle="modal" data-target={'#' +name+ 'Modal' + item.id}> Edit </button> </p>

                {/* Model here */} 
                <div className="modal fade" id={name+ 'Modal' + item.id} tabIndex="-1" role="dialog" aria-labelledby="popModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="userModalLabel">Edit {item.fullname}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form className="form-signin" onSubmit={this.handleSubmit} noValidate>  
                                    {this.renderInputEditReadOnly('email', 'Email Address', 'email', item.email )}
                                    {this.renderInputEdit('fullName', 'Full Name', 'text', item.fullname )}

                                    <h3>Skills &amp; Instruments</h3>
                                    <ul className="list-group">     
                                        {instrumentList}
                                    </ul>

                                    
                                    {this.renderButtonUpdate('Update')} 
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
 