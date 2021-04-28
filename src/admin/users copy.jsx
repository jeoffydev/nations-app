import React, {Component} from 'react';  
import {authAdminAccess } from '../auth/authService'; 

//Import these 2 for api and http post
import { apiEndPoint } from '../config/apiEndPoint'; 
import axiosApiInstance from '../auth/httpService'; 
import UserEdit from './popup/user-edit';



class Users extends  Component{

    state = {
        dataUsers : {}, 
    }
 


    constructor(){
        super();
        
    }  

   

    componentDidMount(){   
        const { dataUsers } = this.state;

        //Only admin access only
        authAdminAccess(this.props.itemProps); 
        //Get users for admin only
        axiosApiInstance.get(apiEndPoint('get') )
            .then(res => {
                //console.log(res.data);  
                this.setState( { dataUsers : res.data });
        })  
    }

   

    render(){ 
        const { dataUsers } = this.state;  


        var userArray = [];
        for (let value of Object.values(dataUsers)) { 
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
                                    <UserEdit item ={user} name="user" selectedInstrument={user.instruments} />    
                                     
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
                   
                    <main className="container whitebg text-left body-content"> 
                        <div className="row">
                            <div className="col-md-12">
                                <h2> <i className="fa fa-users"></i> Users </h2> 
                                 
                                {userList}  

                            </div>
                        </div> 
                    </main>  
           </ React.Fragment>
        )
    }
}

export default  Users;