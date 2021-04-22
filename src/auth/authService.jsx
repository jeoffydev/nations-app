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


export function login(data){
    localStorage.setItem('token', data.token);
    window.location.href="/admin/dashboard";
}

export function logout(){
    localStorage.removeItem('token');
    window.location.href="/";
}

 

export default{
    getCurrentUser,
    getJwt 
}
