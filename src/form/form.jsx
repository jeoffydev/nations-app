import React, {Component} from 'react'; 
import Joi from 'joi-browser'; 
import {Input, InputCheckBox, InputreadOnly} from './input';

class Form extends Component{

  

    state = {
        data: {},
        errors : {}
    }

 

    //Simple validation
    validateThis = () =>{
        const { data } = this.state;
 
        const options = {abortEarly: false}
        const { error } =   Joi.validate( data, this.schema, options);
        
        if(!error) return null;
        
        const errors = {};
        for (let item of error.details)
            errors[item.path[0]] = item.message;

        return errors; 
    }   

    autoValidate = ({ name, value }) => { 

        // Is to validate each field not the whole form
        //USe js6 for the computed name
        const obj = {[name]: value}; 
        const schema = {
            [name]: this.schema[name]
        }
        const { error } =   Joi.validate( obj, schema); 
        return error ? error.details[0].message : null;
      
    } 
 

    handleSubmit = e =>{
       
        const { data } = this.state;
        e.preventDefault();

        const errors = this.validateThis();
        console.log(errors);
        this.setState({ errors : errors || {} });
        if (errors)  return;  

        this.doSubmit();
 
    }

    handeLoginChange  = e =>{
        //console.log(e);
        const { currentTarget: input } = e;
        //Destructure argument

        //validation while typing
        //Copy the array
        const errors = {...this.state.errors};
        const errorMessage = this.autoValidate(input); 
        if(errorMessage){ 
             //Display in setState please
            errors[input.name] = errorMessage;
        }else{
            //Display in setState please
            delete errors[input.name];
        }
         
        const data = {...this.state.data};
        //get the name attribute of input textbox login
        //console.log(input.name + " = " + input.value);
        data[input.name] = input.value; 
       
        this.setState({ data, errors }); 
    }

    //Handle Onchange for checkboxes
    handeInstrumentChangeCheckBox = e =>{ 

        const { currentTarget: input } = e; 
         
        const target = e.target;
        var value = target.value;
        //console.log("value", value, " target.checked = ", target.checked  );
        
        const {data,  errors  } = this.state;  
        if(target.checked){
            data.membersInstrumentViewModels.push(  parseInt(value) );
            //data[input.name]  = value;   
        }else{ 
            data.membersInstrumentViewModels.splice(data.membersInstrumentViewModels.indexOf(value), 1);
        }   
        this.setState({ data }); 
       
    }

    renderButton = label =>{
        return (
            
            <React.Fragment>
               <button type="submit"  disabled={this.validateThis()} className="btn btn-primary">{label}</button>
            </React.Fragment>
          
        ) 
     
    }

    renderButtonUpdate = label =>{
        return (
            
            <React.Fragment>
               <button type="submit"  className="btn btn-primary">{label}</button>
            </React.Fragment>
          
        ) 
     
    }

     

    renderInput = (name, label, type) =>{
       //console.log(name, label, type);
       const { data, errors } = this.state;
       return (
        <Input error={errors[name]} type={type}  name={name} label={label} value={data[name]} onChange={this.handeLoginChange} /> 
      ) 
      
    }

    renderInputEdit = (name, label, type, value ) =>{ 
        const { data, errors } = this.state;

        const valueEdit = data[name] ? data[name] : value; 
        return (
         <Input error={errors[name]} type={type}  name={name} label={label} value={valueEdit} onChange={this.handeLoginChange}   /> 
       ) 
       
     }


     renderInputEditReadOnly = (name, label, type, value ) =>{ 
        const { data, errors } = this.state;
        return (
         <InputreadOnly error={errors[name]} type={type}  name={name} label={label} value={value}    /> 
       ) 
       
     }

     InputCheckBox =  (name, id, type, label, value, opts  ) =>{ 
        const { data, errors } = this.state;
        return (
         <InputCheckBox  name={name} id={id} type={type}   label={label} value={value} check={opts}  onChange={this.handeInstrumentChangeCheckBox}     /> 
       ) 
       
     }
 

     


}

export default Form;