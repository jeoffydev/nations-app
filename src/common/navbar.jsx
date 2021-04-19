import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';

class Navbar extends Component{

    render(){
        
        return ( 
            <React.Fragment>
                   <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="/">Roster Logo</a>
                        
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/" exact={true}>Home  </NavLink>
                                </li>
                                
                            </ul> 
                        </div>
                    </nav>
 
           </ React.Fragment>
        )
    }
}

export default Navbar;