import React, {useState, useEffect} from 'react';
import {addDoc, collection, getDocs} from "firebase/firestore";
import {auth, db} from "../firebase";
import {useNavigate} from "react-router-dom";

const FormGift = (props) => {
    const [giftName, setGiftName] = useState("");
    const [giftLink, setGiftLink] = useState("");
    const [giftPrice, setGiftPrice] = useState("");
    const [giftDescription, setGiftDescription] = useState("");
    const [giftPeople, setGiftPeople] = useState([]);
    const [peopleList, setPeopleList] = useState([]);

    const personsCollection = collection(db, "persons");
    const giftsCollection = collection(db, "gifts");

    let navigate = useNavigate();

    useEffect(() => {
        const getPeople = async () => {
            const people = await getDocs(personsCollection);
            const allPeople = (people.docs.map((doc) => ({...doc.data(), id: doc.id})));
            allPeople.sort((a, b) => {
                let fa = a.personName.toLowerCase(),
                    fb = b.personName.toLowerCase();

                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            });
            setPeopleList(allPeople)
        }
        getPeople();
    }, [])

    const createGift = async (event) => {
        event.preventDefault();
        const errorMessageName = document.getElementById("error-message-name");
        const errorMessageNameLong = document.getElementById("error-message-name-long");
        const errorMessagePeople = document.getElementById("error-message-people");
        if (giftName.length < 3){
            errorMessageName.classList.remove("hidden");
            return null;
        } else {
            errorMessageName.classList.add("hidden");
        }
        if (giftName.length > 70){
            errorMessageNameLong.classList.remove("hidden");
            return null;
        } else {
            errorMessageNameLong.classList.add("hidden");
        }
        if (giftPeople.length === 0){
            errorMessagePeople.classList.remove("hidden");
            return null;
        } else {
            errorMessageName.classList.add("hidden");
            giftPeople.map((person) => {
                addDoc(giftsCollection, {
                    giftName,
                    giftLink,
                    giftPrice,
                    giftDescription,
                    giftPerson: person,
                })
            })
            navigate("/friends")
        }
    }

    const addGiftPerson = (id) => {
        let checkBox = document.getElementById(id);
        let label = document.getElementById(`label${id}`);

        if (checkBox.checked) {
            setGiftPeople(prev => [...prev, id])
            label.classList.add("checked-label")
        } else {
            setGiftPeople(prev => prev.filter(el => !el === id))
            label.classList.remove("checked-label")
        }
    }


    if (props.userLoggedIn) {
        return (
            <div className="section">
                <form className="form-gift">
                    <div className="form-input">
                        <label htmlFor="giftname">gift name</label>
                        <input name="giftname" id="giftname" type="text" onChange={(event) => {
                            setGiftName(event.target.value)
                        }}/>
                    </div>
                    <div className="form-input">
                        <label htmlFor="giftlink">link</label>
                        <input name="giftlink" id="giftlink" type="text" onChange={(event) => {
                            setGiftLink(event.target.value)
                        }}/>
                    </div>
                    <div className="form-input">
                        <label htmlFor="giftdescription">description</label>
                        <input name="giftdescription" id="giftdescription" type="textarea" onChange={(event) => {
                            setGiftDescription(event.target.value)
                        }}/>
                    </div>
                    <div className="form-input">
                        <label htmlFor="giftprice">price</label>
                        <input name="giftprice" id="giftprice" type="text" onChange={(event) => {
                            setGiftPrice(event.target.value)
                        }}/>
                    </div>
                    <div className="form-gift-for-who">
                        <h3>it would be a perfect gift for:</h3>
                        {peopleList.map((person) => {
                            if (person.personAuthor.id === auth.currentUser.uid) {
                                return (
                                    <>
                                        <div className="form-gift-for-who-option">
                                            <input className="form-checkbox-for-who" type="checkbox" id={person.id}
                                                   onChange={(event) => addGiftPerson(person.id)}/>
                                            <label className="form-checkbox-for-who-avatar"
                                                   htmlFor={person.id} id={`label${person.id}`} style={{backgroundImage: `url("${person.personPhotoURL}")`}}></label>
                                            <p>{person.personName}</p>
                                        </div>
                                    </>
                                )
                            }
                        })}
                    </div>
                    <div className="error-message hidden" id="error-message-name">Add gift name (min. 3 characters)</div>
                    <div className="error-message hidden" id="error-message-name-long">Gift name too long (max. 70 characters)</div>
                    <div className="error-message hidden" id="error-message-people">Choose persons</div>
                    {peopleList.some((person)=>(person.personAuthor.id === auth.currentUser.uid)) ? null : <div className="error-message" id="error-message-people">CREATE FRIENDS FIRST</div>}
                    <button className="button-add-gift-submit" type="submit" onClick={createGift}>save idea</button>
                </form>
            </div>
        )
    } else {
        return null
    }
}

export default FormGift;