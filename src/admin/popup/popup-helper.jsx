import React, {Component} from 'react';   

export function EditButton  ( props ) { 
    const {  idname,  id   } = props; 
    return (
            
        <React.Fragment>
            <p> 
                <button type="button" className="btn btn-sm btn-dark " data-toggle="modal" data-target={'#' + idname + 'Modal' +  id}> Edit </button> 
            </p>
        </React.Fragment>
      
    )  

} 


export function PopupHeader  ( props ) {
     
    const {  idname,  label,   } = props;  
    return (
            
        <React.Fragment>
            <div className="modal-header">
                <h5 className="modal-title" id={ idname + "ModalLabel"}>Edit {label}</h5>
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