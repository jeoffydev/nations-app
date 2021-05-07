import React, {Component} from 'react';   

import Form from './../form/form'; 
import Joi from 'joi-browser'; 

class Categories extends  Form{

    state = {
        
        data: { 
           
        },   
        
        
    }
 


    constructor(props){
        super(props);
        
    }  

    //Joi schema
    schema = { 
        
    }

   

    componentDidMount(){   
        console.log(this.props)
    }

                
 

    render(){ 
        
         
        return (  
            <React.Fragment> 
                   
                    <main className="container whitebg text-left body-content"> 
                        <div className="row">
                            <div className="col-md-12">
                                <h2> <i className="fa fa-sticky-note"></i> Categories </h2> 
                                 
                            </div>
                        </div> 
                    </main>  

           </ React.Fragment>
        )
    }
}

export default  Categories;