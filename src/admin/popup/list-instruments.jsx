import React, {Component} from 'react';   
import { InputCheckBox } from './../../form/input';
 

const ListInstruments = ( {instrumentsArray, myItems,  onChange } ) =>{  

    //console.log("myItems", myItems);
    //console.log("instrumentsArray", instrumentsArray);

        var insSel = [];
        for (let value of myItems) {  
            insSel.push(value.instrumentId);
        }  

        const instrumentList = instrumentsArray.map( (ins) =>    
            <li className="list-group-item" key={ins.id}>   
                 {insSel.indexOf(ins.id) !== -1   ?  <InputCheckBox  name='instrumentCheckBox' id={'check' + ins.id} type='checkbox'   label={ins.instrumentName} value={ins.id} check={true}  onChange={onChange}     />   :   <InputCheckBox  name='instrumentCheckBox' id={'check' + ins.id} type='checkbox'   label={ins.instrumentName} value={ins.id} check={false}  onChange={onChange}     />  }   
            </li>
        ) 

    
        return (
                    
            <React.Fragment> 

                <ul className="list-group">     
                     {instrumentList}
                </ul> 


            </React.Fragment> 


        ) 
     
} 


export default ListInstruments;