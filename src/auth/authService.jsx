import jwtDecode from 'jwt-decode';
import React, {Component} from 'react';   


export function getCurrentUser(){ 
    try{
        const jwt = localStorage.getItem('token');
        return jwtDecode(jwt);
    }
    catch(e){
        return null;
    } 
}


export function getJwt(){ 
    return localStorage.getItem('token');
}


export default{
    getCurrentUser,
    getJwt
}
