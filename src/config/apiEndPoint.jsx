
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
        default:
          // code block
    }

    
}

 