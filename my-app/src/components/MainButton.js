import React, {useState, useEffect} from 'react';
import {
    HashRouter,
    Route,
    Routes,
    Link,
    NavLink,
    Outlet
} from 'react-router-dom';


const MainButton = () => {
    return (
        <div className="section">
            <div className="add-gift" id="add-gift">
                <div className="add-gift-image"></div>
                <Link to="/add-gift" class="add-gift-button" >+ new gift idea</Link>
            </div>
        </div>
    )
}

export default MainButton;