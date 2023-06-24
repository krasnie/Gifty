import React, {useState, useEffect} from 'react';
import {
    HashRouter,
    Route,
    Routes,
    Link,
    NavLink,
    Outlet
} from 'react-router-dom';
import {deleteDoc, doc} from "firebase/firestore";
import {db} from "../firebase";
import {useNavigate} from "react-router-dom";

const Person = (props) => {
    let navigate = useNavigate();

    const personDelete = async (id) => {
        const deletedPerson = doc(db, "persons", id);
        await deleteDoc(deletedPerson);
    }

    if (props.userLoggedIn) {
        return (
            <>
                {/*<div className="back-button"><Link to="/friends" className="back-button-link">Back to friends</Link>*/}
                {/*</div>*/}
                <div className="section person-section" id={props.personId}>
                    <div className="person-profile">
                        <div className="person-profile-photo"></div>
                        <div className="person-profile-data">
                            <div className="person-profile-name">{props.personName}</div>
                            <div className="person-profile-date">{props.personBirthday}</div>
                            <div className="person-profile-description">{props.personDescription}
                            </div>
                            <div className="person-profile-buttons">
                                <button className="person-profile-edit-button">edit</button>
                                <button className="person-profile-delete-button" onClick={()=>personDelete(props.personId)}>delete</button>
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
    } else {
        return null
    }
}

export default Person;