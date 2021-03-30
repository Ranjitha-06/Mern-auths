import React from 'react';
import {Link} from 'react-router-dom';
const NavBar=()=>{
    return (
        <nav>
        <div className="nav-wrapper #ec407a pink lighten-1">
            <Link to="/" className="brand-logo left moveme "><b>Logo</b></Link>
            
        </div>
    </nav>
    )
}
export default NavBar;