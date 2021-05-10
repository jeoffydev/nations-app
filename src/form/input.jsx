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
     
    const { name, type, label,  values, valuex, onChange, error  } = props;  
    var res = values.split(",");  
    var selected = '';
    var selectDropdown ='';

    const mapSelect = res.map( (role) => { 
                                return (
                                    <option key={role} value={role}   > {role}</option>
                                )
                            }
                        );
    const defaultOption = <option value="">--Select Role --</option>              

    if(valuex){
        selectDropdown = (
                <select className="form-control" value={valuex}  name={name}  onChange={onChange}    > 
                        {defaultOption}
                        {mapSelect} 
                </select> 
        )
    }else{

        selectDropdown = (
            <select className="form-control"  name={name}  onChange={onChange}    > 
                     {defaultOption}
                    {mapSelect} 
            </select> 
        )

    }
     
    return (
            
        <React.Fragment>
            <div className="form-group">
                <label htmlFor={name}>{label}</label> 
                   {selectDropdown} 
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


export function InputIndependent  ( props ) {
     
    const { name, type, label,  value, onChange   } = props; 

    var valuex = '';
    if(value){
        valuex = value;
    } 
    return (
            
        <React.Fragment>
           <div className="form-group">
                <label htmlFor={name}>{label}</label>
                <input type={type} 
                name={name} 
                value={valuex} 
                onChange={onChange}  
                className="form-control" 
                id={name} 
 
                 /> 
                 
            </div>
        </React.Fragment>
      
    ) 
 

} 


export function TextareaIndependent  ( props ) {
     
    const { name,   label,  value, onChange   } = props; 

    var valuex = '';
    if(value){
        valuex = value;
    } 
    return (
            
        <React.Fragment>
           <div className="form-group">
                <label htmlFor={name}>{label}</label>
                
               <textarea   name={name}  className="form-control" id={name}  rows="3" onChange={onChange}    value={valuex} >{valuex}</textarea>  
                 
            </div>
        </React.Fragment>
      
    ) 
 

} 


export default{
    Input,
    InputreadOnly ,
    InputCheckBox,
    InputIndependent 
}
