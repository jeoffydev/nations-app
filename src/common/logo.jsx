import React, {Component} from 'react';   


const NationsLogo = ( { classes, imgUrl} ) =>{   

    const imgClass = "mb-4  " + classes;
    return (
                
        <React.Fragment>
            <img   src={imgUrl}  className={imgClass}    alt="logo"  />    
        </React.Fragment> 
    ) 

} 


export default NationsLogo;