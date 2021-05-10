
import React, {Component} from 'react';
 

export function apiEndPoint(opts){

    const urlApi = 'http://localhost:62961/';
    switch(opts) {
        case 'get':
            return urlApi + 'api/account';
          break;
        case 'add':
            return urlApi + 'api/account';
          break;
        case 'login':
            return urlApi + 'api/account/login';
          break;
        case 'get-instrument':
            return urlApi + 'api/instrument';
          break;  
        case 'update-user-details':
            return urlApi + 'api/Account/UpdateUserDetails';
          break;  
        case 'update-user-password':
            return urlApi + 'api/Account/UpdateUserPassword';
          break;
        case 'delete-user':
          return urlApi + 'api/account/DeleteThisUser';
          break;  
         
         //Categories
        case 'get-categories':
            return urlApi + 'api/category';
          break;
        case 'update-category':
            return urlApi + 'api/category';
          break; 
        case 'delete-category':
            return urlApi + 'api/category';
          break;    
        case 'add-category':  
          return urlApi + 'api/category';
          break; 

        //Instruments
        case 'get-instruments':
          return urlApi + 'api/instrument';
          break;
        case 'update-instrument':
            return urlApi + 'api/instrument';
            break; 
        case 'delete-instrument':
            return urlApi + 'api/instrument';
            break;    
        case 'add-instrument':  
          return urlApi + 'api/instrument';
          break; 

        //Songs
        case 'get-songs':
          return urlApi + 'api/song';
          break;
        case 'update-song':
          return urlApi + 'api/song';
          break; 
        case 'delete-song':
          return urlApi + 'api/song';
          break;    
        case 'add-song':  
          return urlApi + 'api/song';
          break; 
        
        
        default:
          // code block
    }

    
}

 