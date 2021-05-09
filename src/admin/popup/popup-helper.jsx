import React, {Component} from 'react';   

export function EditButton  ( props ) { 
    const {  idname,  id, label   } = props; 
    return (
            
        <React.Fragment>
            <div  > 
                <button type="button" className="btn btn-sm btn-dark " data-testid="editbutton" data-toggle="modal" data-target={'#' + idname + 'Modal' +  id}> {label} </button> 
            </div>
        </React.Fragment>
      
    )  

} 

export function AddButton  ( props ) { 
    const {  idname,  id, label   } = props; 
    return (
            
        <React.Fragment>
            <p> 
                <button type="button" className="btn   btn-dark " data-toggle="modal" data-target={'#' + idname + 'Modal' +  id}> {label} </button> 
            </p>
        </React.Fragment>
      
    )  

} 
 


export function PopupHeader  ( props ) {
     
    const {  idname,  label,   } = props;  
    return (
            
        <React.Fragment>
            <div className="modal-header">
                <h5 className="modal-title" id={ idname + "ModalLabel"}> {label}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </React.Fragment>
      
    )  
} 


export default {
    PopupHeader,
    EditButton
}