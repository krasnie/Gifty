import React, {useState, useEffect} from 'react';
import {
    HashRouter,
    Route,
    Routes,
    Link,
    NavLink,
    Outlet
} from 'react-router-dom';
import {collection, deleteDoc, doc, getDocs, updateDoc, deleteField} from "firebase/firestore";
import {db} from "../firebase";
import {useNavigate} from "react-router-dom";

const Person = (props) => {
    let navigate = useNavigate();

    const [giftsList, setGiftsList] = useState([]);

    const giftsCollection = collection(db, "gifts");

    useEffect(() => {
        const getGifts = async () => {
            const gifts = await getDocs(giftsCollection);
            const allGifts = (gifts.docs.map((doc) => ({...doc.data(), id: doc.id})));
            //setPeopleList(allPeople.filter((doc) => (doc.personAuthor.id === auth.currentUser.uid)))
            setGiftsList(allGifts)
            console.log(allGifts)
        }
        getGifts();
    }, [])

    const personDelete = async (id) => {
        const deletedPerson = doc(db, "persons", id);
        await deleteDoc(deletedPerson);
    }

    const giftDelete = async (id) => {
        const deletedGift = doc(db, "gifts", id);
        await deleteDoc(deletedGift);
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
                                <Link to="/add-gift" className="person-profile-add-gift-button">+ add gift</Link>
                            </div>
                        </div>
                    </div>


                    <div className="gift-section">

                        {giftsList.map((gift)=>{
                            if(gift.giftPerson === props.personId) {
                                return(
                                    <div className="single-gift">
                                        <div className="single-gift-image"></div>
                                        <div className="single-gift-data">
                                            <div className="single-gift-name">{gift.giftName}</div>
                                            <div className="single-gift-price">{gift.giftPrice}</div>
                                            <div className="single-gift-description">{gift.giftDescription}</div>
                                            <div className="gift-buttons">
                                                <a href={gift.giftLink} target="_blank" className="gift-link-button">link</a>
                                                <button className="gift-delete-button" onClick={()=>giftDelete(gift.id)}>delete</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            } else return null;

                        })}

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