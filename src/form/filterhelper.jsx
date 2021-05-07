


import React, {Component} from 'react';
 

export function FilterAdminUser  ( props ) {
     
    const { name,   label,  values,   onChange  } = props; 
    var res = values.split(",");  

    const mapSelect = res.map( (role) => { 
            return (
                <option key={role} value={role}   >{role}</option>
            )
        }
    );
    const defaultOption = <option value="">--Select Role --</option>    

    return (
            
        <React.Fragment>
            <div className="form-group">
                <label htmlFor={name}>{label}</label> 
                <select className="form-control"  name={name}  onChange={onChange}    > 
                        {defaultOption}
                        {mapSelect} 
                </select> 
               
            </div>
        </React.Fragment>
      
    ) 
 

} 

export function FilterInput  ( props ) {
     
    const { name, type, label, placeholder,   onChange  } = props; 
     
    return (
            
        <React.Fragment>
           <div className="form-group">
                <label htmlFor={name}>{label}</label>
                <input type={type} 
                name={name}  
                onChange={onChange}  
                className="form-control" 
                id={name} 
                placeholder={placeholder}
 
                 />   
            </div>
        </React.Fragment>
      
    ) 
 

}

export function FilterFormUser  ( props ) {
     
    const { name1,  label1, placeholder1, name2,  label2, values,    onSubmit, onChange  } = props; 

    var res = values.split(",");  

    const mapSelect = res.map( (role) => { 
            return (
                <option key={role} value={role} >{role}</option>
            )
        }
    );
    const defaultOption = <option value="">--Select Role --</option>    
     
    return (
            
        <React.Fragment>
           <form className="form-signin margin-bottom" onSubmit={onSubmit} noValidate> 

                <div className="row">
                    <div className="col-md-5">
                        <div className="form-group">
                            <label htmlFor={name1}>{label1}</label>
                            <input type="text" 
                            name={name1}    
                            className="form-control" 
                            id={name1} 
                            placeholder={placeholder1} 
                            onChange={onChange}  
                            />   
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="form-group">
                            <div className="form-group">
                                <label htmlFor={name2}>{label2}</label> 
                                <select className="form-control"  name={name2}   onChange={onChange}     > 
                                        {defaultOption}
                                        {mapSelect} 
                                </select> 
                            
                            </div>
                        </div>  
                    </div>
                    <div className="col-md-2"> 
                        <button type="submit" className="btn btn-primary margin-top-btn"  >Search</button>
                    </div>

                </div>                                                 
                
                
               
            </form>
        </React.Fragment>
      
    ) 
 

}
  
  

export default{
    FilterAdminUser,
    FilterInput
}


