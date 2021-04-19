import React, {Component} from 'react';
 

const Input = ( props ) =>{
     
    const { name, type, label,  value, onChange, error } = props;
   
     
    return (
            
        <React.Fragment>
           <div className="form-group">
                <label htmlFor={name}>{label}</label>
                <input type={type} 
                name={name} 
                value={value} 
                onChange={onChange}  
                className="form-control" 
                id={name} 
                 /> 
                 { error && <div className="alert alert-danger">{error}</div> }
            </div>
        </React.Fragment>
      
    ) 
 

} 


export default Input;