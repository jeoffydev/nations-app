
import React, {Component} from 'react';
 

export function apiEndPoint(opts){

    switch(opts) {
        case 'get':
            return 'http://localhost:62961/api/account';
          break;
        case 'login':
            return 'http://localhost:62961/api/account/login';
          break;
         
        default:
          // code block
    }

    
}

 