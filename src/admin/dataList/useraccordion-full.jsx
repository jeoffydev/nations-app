import React, {Component} from 'react';   
import Form from '../../form/form'; 
import Joi from 'joi-browser'; 

 
 

class UserAccordionFull extends Form{

  
    constructor(props){
        super(props); 
        console.log( this.props.items, "Anp ba");
          
        
    } 

     
    state = {
        items: ''
    }


   

    componentDidMount(){    
        //Set state items from props
        console.log(this.props.items, "Anp ba");
        const { items } = this.state; 
        const itemProps = this.props.items; 
        this.setState( { items : itemProps });  
    }
 

    doSubmit = async () =>{ 
    
    }

   
    
    
    
    render(){  
        
        console.log(this.state.items, "Anp ba");

        const { items  } = this.state;
 
        var userArray = [];
        for (let value of Object.values(items)) { 
            var arrayPush = {'id': value.id, 'fullname': value.fullName, 'email': value.email, 'instruments':  value.membersInstrumentViewModels}
            userArray.push(arrayPush);
        } 
        
        const userList = userArray.map( (user) =>  
            <div className="collapse-div-container" key={user.id}>
                <a className="btn btn-primary btn-block teal" data-toggle="collapse" href={'#userCollapse'  + user.id} role="button" aria-expanded="false" aria-controls="userCollapse">
                    {user.fullname} 
                </a>  
                <div className="collapse" id={'userCollapse'  + user.id}>
                    <div className="card card-body">
                       
                        <div className="row">
                            <div className="col-md-4">
                                    <p> Full Name: <br /> {user.fullname}  </p>
                                    <p>  Email:<br />  {user.email} </p> 
                                    
                                     
                            </div>
                            <div className="col-md-8">
                                   <h3>Skills &amp; Member's Intruments</h3> 
                                   <p>{user.instruments.length === 0 ? 'No instrument saved for this member ' : ''}</p>
                                   <ul className="list-group">
                                    {user.instruments.map( (ins)=>
                                            <li className="list-group-item" key={ins.instrumentId}> { ins.instrument.instrumentName }</li>
                                        )}
                                   </ul>
                                   
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        )   



        return (

            <React.Fragment>

                
            </React.Fragment>
        )
    }
}

export default UserAccordionFull;
 