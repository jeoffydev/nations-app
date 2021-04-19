import React, {Component} from 'react'; 
import Joi from 'joi-browser'; 
import Input from './input';

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
        //console.log(errors);
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
        data[input.name] = input.value; 
       
        this.setState({ data, errors }); 
    }

    renderButton = label =>{
        return (
            
            <React.Fragment>
               <button type="submit"  disabled={this.validateThis()} className="btn btn-primary">{label}</button>
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
    


}

export default Form;