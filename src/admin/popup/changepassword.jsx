import React, {Component} from 'react';   
 
 
import Joi from 'joi-browser'; 


class ChangePassword extends Component{
    constructor(props){
        super(props); 
         
    } 

     
     
    state = {
        
        data: { 
             
        },   
         
    }

    //Joi schema
    schema = {  
    }

   

    componentDidMount(){   
      
       console.log("this.props.userId", this.props.userId)
        
    }
 

    doSubmit = async () =>{ 
         
    }

   
    
    
    
    render(){ 
        
        

        return (

            <React.Fragment> 

            <p> 
                <button type="button" className="btn btn-sm btn-dark " data-toggle="modal" data-target={'#ChangePasswordModal' + this.props.userId}> Change Password </button> 
            </p>

            
                  
            </React.Fragment>
        )
    }
}

export default ChangePassword;
 