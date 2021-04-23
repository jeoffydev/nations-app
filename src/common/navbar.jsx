import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import { logout} from '../auth/authService'; 

class Navbar extends Component{

    render(){
        
        return ( 
            <React.Fragment>

                
                   <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="/"><img className="mb-4" src={"/logo-nations.png"}  className="img-thumbnail small-logo"   alt="logo"  /></a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/admin" exact={true}>Home  </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/admin/users"  > Users </NavLink>
                                </li>

                                <li className="nav-item">
                                    <span className="nav-link cursor-point" onClick={logout}  > Logout </span>
                                </li>
                                
                            </ul> 
                        </div>
                    </nav>
 
           </ React.Fragment>
        )
    }
}

export default Navbar;