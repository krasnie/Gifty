import React from 'react';
import {
    Link, NavLink,
} from 'react-router-dom';

const Header = (props) => {
    return(
        <header className="header" id="header">
            <div className="logo">GIFTY</div>
            <div className="navigation">
                <li>{!props.userLoggedIn && <Link to="/" class="nav-button" >home</Link>}</li>
                <li>{props.userLoggedIn && <Link to="/home" class="nav-button" >home</Link>}</li>
                <li>{!props.userLoggedIn && <Link to="/login" class="nav-button" >LOGIN</Link>}</li>
                <li>{props.userLoggedIn && <Link to="/add-gift" class="nav-button" >add gift</Link>}</li>
                <li>{props.userLoggedIn && <Link to="/friends" class="nav-button" >friends</Link>}</li>
                <li>{props.userLoggedIn && <Link to="/events" class="nav-button" >events</Link>}</li>
            </div>
        </header>
    )
}

export default Header;