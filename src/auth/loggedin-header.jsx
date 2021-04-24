import React, {Component} from 'react';   


const LoggedinHeader = ( {email, role} ) =>{ 
     

    if(email && role){
        return (
                
            <React.Fragment>
                    <div className="row">
                        <div className="col-md-12 text-right"> 
                            <span className="badge badge-success"> Hello, {email} [{role}]  </span> 
                        </div>
                    </div> 
            </React.Fragment> 
        ) 
    } 
    else{
        return null;
    }    

} 


export default LoggedinHeader;