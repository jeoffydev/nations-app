import React, {Component} from 'react';  
import UserEdit from './../popup/user-edit';

const Listgroup = ( { items } ) =>{  
    
        
    
        return (
                    
            <React.Fragment>

                <ul className="list-group">
                    {items.map( (item)=>
                        <li className="list-group-item" key={item.id}> { item.name }</li>
                    )}
                </ul>
                
            </React.Fragment> 
        ) 
     
} 


export default Listgroup;