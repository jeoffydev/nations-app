import React, {Component} from 'react';
 

const AlertMessage = ( props ) =>{
     
    const { value, classes  } = props; 
    const addedClass = 'alert ' + classes; 
    return (
            
        <React.Fragment>
           <div className={addedClass} role="alert">
                 {value}
            </div>
        </React.Fragment>
      
    ) 
 

} 


export default AlertMessage;