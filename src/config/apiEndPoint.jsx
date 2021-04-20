
import React, {Component} from 'react';
 

export function apiEndPoint(opts){

    const urlApi = 'http://localhost:62961/';
    switch(opts) {
        case 'get':
            return urlApi + 'api/account';
          break;
        case 'login':
            return urlApi + 'api/account/login';
          break;
         
        default:
          // code block
    }

    
}

 