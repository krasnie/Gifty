import React from 'react';
import {
    Link, NavLink,
} from 'react-router-dom';

const Header = () => {
    return(
        <header className="header" id="header">
            <div className="logo">GIFTY</div>
            <div className="navigation">
                <li><Link to="/" class="nav-button" >home</Link></li>
                <li><Link to="/add-gift" class="nav-button" >add gift</Link></li>
                <li><Link to="/friends" class="nav-button" >friends</Link></li>
                <li><Link to="/events" class="nav-button" >events</Link></li>
            </div>
        </header>
    )
}

export default Header;