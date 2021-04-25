import React, {Component} from 'react';   
import Form from '../../form/form'; 
import Joi from 'joi-browser'; 

//Import these 2 for api and http post
import { apiEndPoint } from '../../config/apiEndPoint'; 
import axiosApiInstance from '../../auth/httpService'; 


class UserEdit extends Form{
    constructor(props){
        super(props);

        
         
    } 

     
     
    state = {
        dataUsers : {},
        data: { 
            fullName: '',
            id: '' 
        },   
        instruments: {},
        insSel: [],
        errors : { },
    }

    //Joi schema
    schema = { 
        fullName : Joi.string().required().min(4),
        id : Joi.string().required()  
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


        //User edit 
        const { data  } = this.state;
        const {item  } = this.props;  

        //User Edit
        data.fullName = this.props.item.fullname;
        data.id = this.props.item.id;
        this.setState({data});

        
    }
/*
    formValidate = e => { 
        e.preventDefault();
        console.log("VALIDATE"); 
    }

    updateChange = e =>{

        //console.log(this.state.data);
        console.log("Change");
        const { currentTarget: input } = e;
        const data = {...this.state.data};
        console.log(input.name + " = " + input.value);
        //console.log(data);

        data[input.name] = input.value; 
        this.setState({data});
         
       

    } */

    doSubmit = async () =>{ 
        const { loginError, data,  insSel} = this.state;
        console.log(data, insSel); 
    }
    
    
    render(){ 

        const {instruments, insSel, data  } = this.state;
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

                                {/*<form className="form-signin" onSubmit={this.formValidate} noValidate>  
                                    <div className="form-group">
                                        <label htmlFor="FullName">Full Name</label>
                                        <input type="text" 
                                        name="fullName"
                                        value={data.fullName} 
                                        className="form-control" 
                                        onChange={this.updateChange}
                                        />  
                                    </div>
                                    <button type="submit"   className="btn btn-primary"> Update </button>
                                </form>*/}


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
 