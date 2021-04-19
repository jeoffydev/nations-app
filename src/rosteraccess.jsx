import React, {Component} from 'react';   
import queryString from 'query-string'; //npm install query-string --save

class RosterAccess extends Component{
 
    componentDidMount(){
         
       
    }
    render(){
        const { match, location }  = this.props;
        //get query strings
        const resultQuery = queryString.parse(location.search);
        console.log("queryString", resultQuery);
        console.log(match);
        return ( 
            <div> 
                   <h1>Get ID {match.params.accesscode} </h1>
            </div>
        )
    }

}

export default RosterAccess;