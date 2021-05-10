import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import { getUserRole, logout} from '../auth/authService';  
import NationsLogo from './logo';

class Navbar extends Component{
    
    state = {
        userAccess : ''
    }
    componentDidMount(){
        const {userAccess} = this.state;  
        this.setState({userAccess : getUserRole()})
    }

    render(){
        const {userAccess} = this.state;
        
        return ( 
            <React.Fragment>

                
                   <nav className="navbar navbar-expand-lg navbar-light bg-light ">
                        
                        <a className="navbar-brand" href="/"><NationsLogo classes="img-thumbnail small-logo" imgUrl="/logo-nations.png" /></a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/admin" exact={true}>Home  </NavLink>
                                </li>
                                <li className="nav-item"> 
                                    <NavLink className="nav-link" to="/admin/my-rosters" > My Rosters </NavLink> 
                                </li> 
                                { userAccess === 'Admin' &&  <li className="nav-item"> <NavLink className="nav-link" to="/admin/users"  > Users </NavLink> </li> }
                                { userAccess === 'Admin' &&  <li className="nav-item"> <NavLink className="nav-link" to="/admin/categories"  > Category </NavLink> </li> }
                                { userAccess === 'Admin' &&  <li className="nav-item"> <NavLink className="nav-link" to="/admin/instruments"  > Instrument </NavLink> </li> }
                                { userAccess === 'Admin' &&  <li className="nav-item"> <NavLink className="nav-link" to="/admin/songs"  >Song </NavLink> </li> }

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