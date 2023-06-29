import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {collection, deleteDoc, doc, getDocs, updateDoc, deleteField} from "firebase/firestore";
import {db} from "../firebase";
import {useNavigate} from "react-router-dom";

const Person = (props) => {
    let navigate = useNavigate();

    const [giftsList, setGiftsList] = useState([]);
    const [reload, setReload] = useState(true);

    const giftsCollection = collection(db, "gifts");

    useEffect(() => {
        const getGifts = async () => {
            const gifts = await getDocs(giftsCollection);
            const allGifts = (gifts.docs.map((doc) => ({...doc.data(), id: doc.id})));
            setGiftsList(allGifts)
        }
        getGifts();
        console.log("reloading")
    }, [reload])


    const personDelete = async (id) => {
        const deletedPerson = doc(db, "persons", id);
        await deleteDoc(deletedPerson);
        giftsList.map((gift)=>{
            if(gift.giftPerson === id){
                giftDelete(gift.id)
            }
        })
        props.setReloadPeople((prev)=>!prev)
    }

    const giftDelete = async (id) => {
        const deletedGift = doc(db, "gifts", id);
        await deleteDoc(deletedGift);
        setReload((prev)=>!prev)
    }

    const hideGifts = (id) => {
        const hiddenGifts = document.getElementById(`gifts${id}`)
        hiddenGifts.classList.toggle("hidden")
        const hideButton = document.getElementById(`hide${id}`)
        if (hideButton.innerText === "▲") {
            hideButton.innerText = "▼"
        } else {
            hideButton.innerText = "▲"
        }
    }

    if (props.userLoggedIn) {
        return (
            <>
                {/*<div className="back-button"><Link to="/friends" className="back-button-link">Back to friends</Link>*/}
                {/*</div>*/}
                <div className="section person-section" id={props.personId}>
                    <div className="person-profile">
                        <div className="person-profile-photo" style={{backgroundImage: `url("${props.personPhotoURL}")`}}></div>
                        <div className="person-profile-data">
                            <div className="person-profile-name">{props.personName}</div>
                            <div className="person-profile-date">{props.personBirthday}</div>
                            <div className="person-profile-description">{props.personDescription}
                            </div>
                            <div className="person-profile-buttons">
                                <button className="person-profile-delete-button" onClick={()=>personDelete(props.personId)}>delete</button>
                                <Link to="/add-gift" className="person-profile-add-gift-button">+ add gift</Link>
                            </div>
                        </div>
                    </div>


                    <div className="gift-section" id={`gifts${props.personId}`}>

                        {giftsList.map((gift)=>{
                            if(gift.giftPerson === props.personId) {
                                return(
                                    <div className="single-gift" id={gift.id} key={gift.id}>
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
                    </div>
                    <div className="gifts-list-switch" >
                        <input type="checkbox" id="showgifts"/>
                        <label htmlFor="showgifts" id={`hide${props.personId}`} onClick={()=>hideGifts(props.personId)}>▲</label>
                    </div>
                </div>
            </>
        )
    } else {
        return null
    }
}

export default Person;