import React, {Component} from 'react';
 

export function Input  ( props ) {
     
    const { name, type, label,  value, onChange, error  } = props; 
     
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

export function Select  ( props ) {
     
    const { name, type, label,  values, onChange, error  } = props;  
    var res = values.split(","); 

    return (
            
        <React.Fragment>
            <div className="form-group">
                <label htmlFor={name}>{label}</label>
                <select className="form-control"  name={name}  onChange={onChange}   >
                    <option>--Select Role --</option>
                    {res.map( (role) => <option key={role} value={role}> {role}</option>)}
                   
                </select>
           
            
            {/*<div className="form-group">
                <label htmlFor={name}>{label}</label>
                <input type={type} 
                name={name} 
                value={value} 
                onChange={onChange}  
                className="form-control" 
                id={name}   /> */}

                 { error && <div className="alert alert-danger">{error}</div> }
            </div>
        </React.Fragment>
      
    ) 
 

} 



export function InputreadOnly  ( props ) {
     
    const { name, type, label,  value, onChange   } = props; 
     
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
                readOnly    
                 />  
            </div>
        </React.Fragment>
      
    ) 
 

} 


export function InputCheckBox  ( props ) {
     
    const { name, id, type, label, check, value,  onChange    } = props; 
     
    
    return (
            
        <React.Fragment>
            <div className="form-check">
                <label className="form-check-label" htmlFor={id} >
                    <input type={type} 
                    name={name} 
                    className="form-check-input" 
                    id={id}    
                    checked={check}
                    onChange={onChange}  
                    value={value}
                    />  
                 {label} </label>
            </div>
        </React.Fragment>
      
    ) 
 

} 


export default{
    Input,
    InputreadOnly ,
    InputCheckBox 
}
