import React, {useState, useEffect} from 'react';
import {
    HashRouter,
    Route,
    Routes,
    Link,
    NavLink,
    Outlet
} from 'react-router-dom';

const People = () => {
    return(
        <div className="section-people" id="people">
            <h1>my friends</h1>
            <div className="people">
                <div className="people-single">
                    <Link to="/person" className="people-pic man"></Link>
                    <p className="people-name">PATRYK</p>
                </div>
                <div className="people-single">
                    <div className="people-pic woman"></div>
                    <p className="people-name">ANIA</p>
                </div>
                <div className="people-single">
                    <div className="people-pic man"></div>
                    <p className="people-name">MIKOLAJ</p>
                </div>
                <div className="people-single">
                    <div className="people-pic woman"></div>
                    <p className="people-name">KASIA</p>
                </div>
                <div className="people-single">
                    <div className="people-pic woman"></div>
                    <p className="people-name">ASIA</p>
                </div>
            </div>
            <button className="button-people-add">+ add friend</button>
        </div>
    )
}

export default People;