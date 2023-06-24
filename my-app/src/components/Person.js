import React, {useState, useEffect} from 'react';
import {
    HashRouter,
    Route,
    Routes,
    Link,
    NavLink,
    Outlet
} from 'react-router-dom';

const Person = () => {
    return (
        <>
            <div className="back-button"><Link to="/friends" className="back-button-link">Back to friends</Link></div>
            <div className="section person-section" id="patryk">
                <div className="person-profile">
                    <div className="person-profile-photo"></div>
                    <div className="person-profile-data">
                        <div className="person-profile-name">patryk</div>
                        <div className="person-profile-date">16-07-1994</div>
                        <div className="person-profile-description">he likes football(borussia dortmund), fancy coffee,
                            kraft
                            beer, traveling, good food and music
                        </div>
                        <div className="person-profile-buttons">
                            <button className="person-profile-edit-button">edit</button>
                            <button className="person-profile-delete-button">delete</button>
                            <button className="person-profile-add-gift-button">+ add gift</button>
                        </div>
                    </div>
                </div>


                <div className="gift-section">
                    <div className="single-gift">
                        <div className="single-gift-image"></div>
                        <div className="single-gift-data">
                            <div className="single-gift-name">borussia dortmund gadgets</div>
                            <div className="single-gift-price">20-500pln</div>
                            <div className="single-gift-description">clothes, mug, cap, posters, stickers</div>
                            <div className="gift-buttons">
                                <button className="gift-link-button">link</button>
                                <button className="gift-delete-button">delete</button>
                            </div>
                        </div>
                    </div>
                    <div className="single-gift">
                        <div className="single-gift-image"></div>
                        <div className="single-gift-data">
                            <div className="single-gift-name">barrel aged coffe</div>
                            <div className="single-gift-price">60pln</div>
                            <div className="single-gift-description">light or semi roasted, not dark</div>
                            <div className="gift-buttons">
                                <button className="gift-link-button">link</button>
                                <button className="gift-delete-button">delete</button>
                            </div>
                        </div>
                    </div>
                    <div className="single-gift">
                        <div className="single-gift-image"></div>
                        <div className="single-gift-data">
                            <div className="single-gift-name">gift name</div>
                            <div className="single-gift-price">price</div>
                            <div className="single-gift-description">description</div>
                            <div className="gift-buttons">
                                <button className="gift-link-button">link</button>
                                <button className="gift-delete-button">delete</button>
                            </div>
                        </div>
                    </div>
                    <div className="gifts-list-switch">
                        <input type="checkbox" id="showgifts"/>
                        <label htmlFor="showgifts">^</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Person;