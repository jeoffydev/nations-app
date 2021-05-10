
import React, {Component} from 'react';
 

export function arrayToJSONObject(arr){

    let obj = []; 
    if(arr.length > 0){
        for(let i = 0; i < arr.length; i++){ 
            obj[i]  = { "instrumentId" :  JSON.stringify(arr[i]) }; 
        }
    } 
    return obj; 
    
}


export  function  createHtml(youtTubeIFrame){
    return {__html: youtTubeIFrame};
}