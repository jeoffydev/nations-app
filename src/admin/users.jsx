import React, {Component} from 'react';  
import {authAdminAccess } from '../auth/authService'; 

//Import these 2 for api and http post
import { apiEndPoint } from '../config/apiEndPoint'; 
import axiosApiInstance from '../auth/httpService';  

import Form from './../form/form'; 
import Joi from 'joi-browser'; 

import {PopupHeader, EditButton, AddButton} from './popup/popup-helper';  
import { arrayToJSONObject } from './../config/codehelper';   
import ChangePassword from './popup/changepassword';
import AddUser from '../admin/add-user';
import swal from 'sweetalert'; 
import { FilterFormUser } from '../form/filterhelper';

class Users extends  Form{

    state = {
        dataUsers : {}, 
        data: { 
            fullName: '',
            id: '', 
            role: '',
            membersInstrumentViewModels: [] 
        },   
        instruments: {},
        insSel: [],
        errors : {},
        password: {
            id: '',
            pw1: '',
            pw2: '',
            pwError: ''
        },
        adminstyle: '',
        searchUser: {
            selectRole: '',
            selectName: '' 
        },
        finalSearch: {
            selectRole: '',
            selectName: '' 
        },
        hasError: false
       
        
    }
 


    constructor(){
        super();
         
    }  

    //Joi schema
    schema = { 
        fullName : Joi.string().required().min(4),
        id : Joi.string().required(),  
        role : Joi.string().required(),  
        membersInstrumentViewModels: Joi.array().required()  
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
      }
     

    componentDidMount(){   
        const { dataUsers, password } = this.state; 
        password.pwError = false;
        
        //Only admin access only
        authAdminAccess(this.props.itemProps); 
        

        axiosApiInstance.get(apiEndPoint('get') ) 
        .then(res => {
            console.log(res);
            this.setState( { dataUsers : res.data });  
        })   

        //Get Instruments in DB
        axiosApiInstance.get(apiEndPoint('get-instrument') )
        .then(res => {
            //console.log("res.data2", res.data);   
            this.setState( { instruments : res.data });
        }); 
    }

                

    handleUserDetails(user, insSel){
             
                const { data  } = this.state;

                data.fullName = user.fullname;
                data.id = user.id;
                data.role = user.role;
                data.membersInstrumentViewModels = insSel;
                this.setState({data});

    }

    //Do submit all the forms
    doSubmit = async () =>{ 
        const {   data, dataUsers,  instruments} = this.state; 

         //Save to restore  
         const selectedUser = [...this.state.dataUsers];  
         
         //Update name only
         const finUser = selectedUser.map(obj => { 
                if(obj.id === data.id){
                    obj.fullName = data.fullName
                }   
                return obj;
            } 
         ); 
        
        //Stringify to json
        const dataObj = {
            "fullName" : data.fullName,
            "id": data.id,
            "role": data.role,
            "membersInstrumentViewModels":  arrayToJSONObject(data.membersInstrumentViewModels )
        }  
        //Send update request
        axiosApiInstance.put(apiEndPoint('update-user-details'),  dataObj )
        .then(res => {
            
            try{
                //get the users again
                axiosApiInstance.get(apiEndPoint('get') ) 
                .then(res => { 
                    this.setState( { dataUsers : res.data });  
                }) 
            }
            catch(e){
                return null;
            }  
       })  
       
    }


    ChangePassword = (e, id) => {
        const { currentTarget: input } = e; 
        const {  password } = this.state; 
         
        const target = e.target;
        var value = target.value;
        console.log("value", value, " target.checked = ", target.checked   );
        console.log("id", id)
        if(id){
            password.id = id;
            this.setState({password})
        }

        if(input.name === "pw1"){
            password.pw1 = input.value;
            this.setState({password})
        }
        if(input.name === "pw2"){
            password.pw2 = input.value;
            this.setState({password})
        }

        console.log(password);
         
    }

    filterUsers = (e) =>{
        e.preventDefault();
        const { currentTarget: input } = e; 
        const {  searchUser } = this.state;  

        const target = e.target;
        var value = target.value;
        var name = target.name; 
        if(input.name === "selectRole"){
            searchUser.selectRole = input.value;
            this.setState({searchUser})
        }
        if(input.name === "selectName"){
            searchUser.selectName = input.value;
            this.setState({searchUser})
        }
       
    }

    submitFilter = e => {
        e.preventDefault();
        const {  searchUser, finalSearch } = this.state;  
        this.setState({finalSearch: searchUser})
        
    }

    submitPassword = e => {
        e.preventDefault();

        const {  password } = this.state;  
        //console.log("pw1 = " +  pw1 + " / pw2 = " + pw2 );
        if(password.pw1 && password.pw2){
            if(password.pw1 === password.pw2){
                
                const dataObj = { 
                    "id": password.id,
                    "password":  password.pw1
                }   
                console.log(dataObj)
                //Send update password request
                axiosApiInstance.put(apiEndPoint('update-user-password'), dataObj )
                    .then(res => { 
                        try{
                            console.log(res);
                        }
                        catch(e){
                            return null;
                        }  
                })  

                password.pwError = false; 
                console.log("they are the same " + password.id);
            }else{
                password.pwError = true; 
            }
            this.setState({password}) 
        }
        
    }

    deleteUser = (id)=>{

        const { dataUsers  } = this.state; 

        swal({
            title: "Are you sure you want to delete this user?",
            text: "Once deleted, you will not be able to recover this user!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

                    const dataObj = { 
                        "id": id,
                    }   
                     
                    //Send delete request
                    axiosApiInstance.post(apiEndPoint('delete-user'), dataObj   )
                    .then(res => { 
                        try{
                            //console.log(res.data.value)
                             this.setState( { dataUsers : res.data.value});  
                        }
                        catch(e){
                            return null;
                        }  
                })  

                swal("User has been deleted!", {
                    icon: "success",
                }); 
            } else {
              swal("User is safe!");
            }
          });
        
    }
    
    

    render(){ 


        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }

        const { dataUsers, pw1, pw2, searchUser  } = this.state;   
        const {instruments,   data, password,   finalSearch  } = this.state;
        const {item, name } = this.props;   
        var searchResult ='';

        console.log(finalSearch, dataUsers)


        /* Filter here */
        var filteredDataUsers = dataUsers;
        if(finalSearch.selectName && !finalSearch.selectRole){
            filteredDataUsers =  finalSearch.selectName ? dataUsers.filter(u=>u.fullName.toLowerCase().includes(finalSearch.selectName.toLowerCase()) ||  u.email.toLowerCase().includes(finalSearch.selectName.toLowerCase()) )  : dataUsers; 
        }else if(!finalSearch.selectName && finalSearch.selectRole){ 
            filteredDataUsers = finalSearch.selectRole || finalSearch.selectName ? dataUsers.filter(u=>u.role === finalSearch.selectRole   )  : dataUsers; 
        }else{
            filteredDataUsers = finalSearch.selectRole || finalSearch.selectName ? dataUsers.filter(u=>u.role === finalSearch.selectRole &&  u.fullName.toLowerCase().includes(finalSearch.selectName.toLowerCase())  )  : dataUsers; 
        }
        
        if(filteredDataUsers.length === 0 ){
            searchResult = <p className="text-center"> <i className="fa  fa-search"></i> No user found...</p>
        }  

        


        /* Filter here  */
 
        var userArray = [];
        for (let value of Object.values(filteredDataUsers)) { 
            var arrayPush = {'id': value.id, 'fullname': value.fullName, 'email': value.email, 'role': value.role, 'instruments':  value.membersInstrumentViewModels}
            userArray.push(arrayPush);
        } 
         
 
        //Display all Instruments
        var insArray = [];
        for (let value of Object.values(instruments)) { 
            var arrayPush = {'id': value.id, 'instrumentName': value.instrumentName, 'instrumentDescription': value.instrumentDescription }
            insArray.push(arrayPush);
        }   
        
        const userList = userArray.map( (user) =>   
            {    
                
                var insSel = [];
                for (let value of user.instruments) {  
                    insSel.push(value.instrumentId);
                }     

                 //Display all Instruments in list
                const instrumentList = insArray.map( (ins) => {
                        
                            return (  
                                <li className="list-group-item" key={ins.id}>   
                                <div className="form-check">
                                    {data.membersInstrumentViewModels.indexOf(ins.id) !== -1   ? this.InputCheckBox('membersInstrumentViewModels', 'check' + ins.id, 'checkbox', ins.instrumentName, ins.id, true)   :  this.InputCheckBox('membersInstrumentViewModels', 'check' + ins.id, 'checkbox', ins.instrumentName, ins.id, false) } 
                                
                                </div>
                                </li>
                            )

                        }   
                    ); 
                    
                    

                return (

                    <div className="collapse-div-container" key={user.id}>
                        <a className="btn btn-primary btn-block teal" data-toggle="collapse" href={'#userCollapse'  + user.id} role="button" aria-expanded="false" aria-controls="userCollapse">
                            {user.fullname} {user.role === "Admin" ? <span className="badge  badge-success pull-right"> {user.role} </span>  :  <span className="badge badge-pill badge-secondary pull-right"> {user.role} </span>} <span className="margin-right pull-right" onClick={()=>this.deleteUser(user.id)}><i className="fa fa-trash"></i></span>
                        </a>  
                        <div className="collapse" id={'userCollapse'  + user.id}>
                            <div className="card card-body">
                            
                                <div className="row">
                                    <div className="col-md-4">
                                            <p> Full Name: <br /> {user.fullname}  </p>
                                            <p> Role:  {user.role === "Admin" ? <span className="badge  badge-success"> {user.role} </span>  :  <span className="badge badge-pill badge-secondary"> {user.role} </span>}   </p>
                                            <p>  Email:<br />  {user.email} </p> 
                                            <span onClick={()=>this.handleUserDetails(user, insSel)} >
                                                <EditButton idname={name} id={user.id} label="Edit" /> <br />
                                                <EditButton idname="ChangePassword" id={user.id} label="Change Password" /> 
                                            </span> 
                        
                                            {/* Model here */} 
                                            <div className="modal fade" id={name+ 'Modal' + user.id} tabIndex="-1" role="dialog" aria-labelledby="popModalLabel" aria-hidden="true">
                                                <div className="modal-dialog" role="document">
                                                    <div className="modal-content">

                                                        <PopupHeader idname="user" label={'Edit ' + data.fullName} /> 

                                                        <div className="modal-body"> 

                                                                <form className="form-signin" onSubmit={this.handleSubmit} noValidate> 
                                                                    {this.renderInputEdit('id', '', 'hidden', data.id )} 
                                                                    {this.renderInputEditReadOnly('email', 'Email Address', 'email', user.email )} 
                                                                    {this.renderInputEdit('fullName', 'Full Name', 'text', data.fullName  )}
                                                                    {this.renderSelect('role', 'User Role', 'select', 'User,Admin', data.role)}  

                                                                    <h3>Skills &amp; Instruments</h3> 
                                                                    
                                                                    {instrumentList}
                                                                
                                                                    {this.renderButton('Update')} 
                                                                </form>  
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> 
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Model here */} 




                                            {/* Passwrd Modal here */} 
                                            <div className="modal fade" id={'ChangePasswordModal' + user.id} tabIndex="-1" role="dialog" aria-labelledby="popModalLabel" aria-hidden="true">
                                                <div className="modal-dialog" role="document">
                                                    <div className="modal-content"> 

                                                        <div className="modal-body"> 

                                                            <PopupHeader idname="user" label={'Change Password for ' + data.fullName} /> 
                                                            {password.pwError && <div className="alert alert-danger" role="alert"> Password didn't match </div>}
                                                            <form className="form-signin" onSubmit={this.submitPassword} noValidate> 
                                                                 
                                                                <div className="form-group">
                                                                    <label htmlFor="exampleInputPassword1">Password</label>
                                                                    <input type="password" name="pw1" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e)=>this.ChangePassword(e, user.id)} />
                                                                </div> 
                                                                <div className="form-group">
                                                                    <label htmlFor="exampleInputPassword1">Password</label>
                                                                    <input type="password" name="pw2" className="form-control" id="exampleInputPassword1" placeholder="Confirm Password" onChange={(e)=>this.ChangePassword(e, user.id)} />
                                                                </div> 
                                                                <button type="submit" className="btn btn-primary" >Change Password</button>
                                                            </form>
                                                                                                    
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> 
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Modal here */} 


                                            
                                            
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
            }
            
            
        )   
         
        return (  
            <React.Fragment> 
                   
                    <main className="container whitebg text-left body-content"> 
                        <div className="row">
                            <div className="col-md-12">
                                <h2> <i className="fa fa-users"></i> Users </h2> 
                                <div className="row">
                                    <div className="col-md-3">
                                        <AddUser />
                                    </div> 
                                    <div className="col-md-9">  
                                        <FilterFormUser name1 ="selectName" label1 ="Filter users name" placeholder1 ="Ex. Jeoffy" name2 ="selectRole"  label2 ="Select Role" values ="User,Admin"   onSubmit={this.submitFilter}  onChange={this.filterUsers}  />
                                    </div>
                                </div>
                                 
                                <div>
                                    {userList}  
                                    {searchResult}
                                </div>

                            </div>
                        </div> 
                    </main> 



           </ React.Fragment>
        )
    }
}

export default  Users;