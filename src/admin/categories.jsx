import React, {Component} from 'react';   
import {authAdminAccess } from '../auth/authService'; 
import Form from './../form/form'; 
import Joi from 'joi-browser'; 
import AddCategory from './add-category';


//Import these 2 for api and http post
import { apiEndPoint } from '../config/apiEndPoint'; 
import axiosApiInstance from '../auth/httpService';  

import {PopupHeader, EditButton, AddButton} from './popup/popup-helper';  
import swal from 'sweetalert'; 

import { Header } from 'semantic-ui-react'

class Categories extends  Form{

    state = {
        dataCategories: {},
        data: { 
            id: '',
            categoryName: ''
        }, 
        errors : {},
        popupName: ''  
        
        
    }
 


    constructor(props){
        super(props);
        
    }  

    //Joi schema
    schema = { 
        id : Joi.number().required(),
        categoryName : Joi.string().required().min(4), 
    }

   

    componentDidMount(){   

        //Only admin access only
        authAdminAccess(this.props.itemProps); 

        const { dataCategories } = this.state; 

        axiosApiInstance.get(apiEndPoint('get-categories') ) 
        .then(res => {
            //console.log(res.data);
             this.setState( { dataCategories : res.data });  
        })    
         
    }

   
    
    handleCategoryDetails(cat, catName ){
             
        const { data, popupName  } = this.state;

        data.id = cat.id; 
        data.categoryName = cat.categoryName;  
        this.setState({data, popupName: catName});

   }


   //Do submit all the forms
   doSubmit = async () =>{ 
        const {   data } = this.state;  
        
        //Stringify to json
        const dataObj = {
            "categoryName" : data.categoryName,
            "id": data.id,  
        }  
        //Send update request
        axiosApiInstance.put(apiEndPoint('update-category'),  dataObj )
        .then(res => { 
            try{
                //get the users again
                axiosApiInstance.get(apiEndPoint('get-categories') ) 
                .then(res => { 
                    this.setState( { dataCategories : res.data });   
                }) 
            }
            catch(e){
                console.log(e);
                return null;
            }  
        })  
    
    }

    //Delete category
    deleteCategory = (id) =>{
        const { dataCategories } = this.state; 

        //console.log(id);

        swal({
            title: "Are you sure you want to delete this category?",
            text: "Once deleted, you will not be able to recover this category!",
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
                    axiosApiInstance.delete(apiEndPoint('delete-category') + "/" + id   )
                    .then(res => { 
                        try{
                            //console.log(res.data.value)
                             this.setState( { dataCategories : res.data.value});  
                        }
                        catch(e){
                            return null;
                        }  
                })  

                swal("Category has been deleted!", {
                    icon: "success",
                });
                 
            } else {
              swal("Category is safe!");
            }
          });

    }
 

    render(){ 
        
        const { dataCategories, data, popupName } = this.state; 
        //console.log(dataCategories, data, popupName);

        /* Filter here  */
 
        var catArray = [];
        for (let value of Object.values(dataCategories)) { 
            var arrayPush = {'id': value.id, 'categoryName': value.categoryName }
            catArray.push(arrayPush);
        } 

        const categoryList = catArray.map( (cat) => {
 
            var catName = cat.categoryName.split(" ").join("");
            return (
                <tbody key={cat.id}> 
                    <tr> 
                        <td>{cat.categoryName}</td>
                        <td  className="text-center">  
                            <span onClick={()=>this.handleCategoryDetails(cat, catName)}>   <EditButton idname={catName} id={cat.id} label="Edit" />  </span>   
                        
                        </td>
                        <td  className="text-center"> <span  className="cursor-point" onClick={()=>this.deleteCategory(cat.id)}  > <i className="fa fa-trash"></i> </span> </td>
                    </tr> 
                </tbody>  
                
            )
        })
         
        return (  
            <React.Fragment> 
                   
                    <main className="container whitebg text-left body-content"> 
                        <div className="row">
                            <div className="col-md-12">
                                <Header as='h2' icon='newspaper' content='Categories'></Header> 

                                <div className="row">
                                    <div className="col-md-3">
                                        <AddCategory />
                                    </div> 
                                    <div className="col-md-9">  
                                        
                                    </div>
                                </div>
                                 

                                <div className="row">
                                    <div className="col-md-12">

                                    <table className="table table-striped">
                                        <thead>
                                            <tr> 
                                                <th scope="col">Category Name</th>
                                                <th className="text-center" scope="col">Edit</th>
                                                <th className="text-center" scope="col">Delete</th>
                                            </tr>
                                        </thead>
                                        {categoryList} 
                                    </table> 
                                         
                                    </div>  
                                </div>
                                
                                 
                            </div>
                        </div> 
                    </main> 

                    <div className="modal fade" id={popupName + 'Modal' + data.id} tabIndex="-1" role="dialog" aria-labelledby="popModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content"> 
                                        <PopupHeader idname="category" label={'Edit ' + data.categoryName} />  
                                        <div className="modal-body text-left">  
                                            <form className="form-signin" onSubmit={this.handleSubmit} noValidate> 
                                                {this.renderInputEdit('id', '', 'hidden',  data.id )}  
                                                {this.renderInputEdit('categoryName', 'Category Name', 'text', data.categoryName  )}
                                                {this.renderButton('Update')} 
                                            </form>  
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> 
                                        </div>
                                    </div>
                                </div>
                    </div>   


                   

           </ React.Fragment>
        )
    }
}

export default  Categories;