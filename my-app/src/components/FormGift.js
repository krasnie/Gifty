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
            //setPeopleList(allPeople.filter((doc) => (doc.personAuthor.id === auth.currentUser.uid)))
            setPeopleList(allPeople)
            console.log(allPeople)
        }
        getPeople();
    }, [])

    const createGift = async (event) => {
        event.preventDefault();
        giftPeople.map((person)=> {
            console.log(person)
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

    const addGiftPerson = (id) => {
        let checkBox = document.getElementById(id);

        if (checkBox.checked) {
            setGiftPeople(prev => [...prev, id])
            console.log(`dodano ${id}`)
        } else {
            setGiftPeople(prev => prev.filter(el => !el === id))
            console.log(`usunieto ${id}`)
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
                                        <input className="form-checkbox-for-who" type="checkbox" id={person.id} onChange={(event) => addGiftPerson(person.id)}/>
                                        <label className="form-checkbox-for-who-avatar"
                                               htmlFor={person.id}>{person.personName}</label>
                                    </>
                                )
                            }
                        })}
                        {/*<input className="form-checkbox-for-who" type="checkbox" id="7HK7k7E7oZiq52Pq5dAi"/>*/}
                        {/*<label className="form-checkbox-for-who-avatar" htmlFor="person1"></label>*/}
                        {/*<input className="form-checkbox-for-who" type="checkbox" id="person2"/>*/}
                        {/*<label className="form-checkbox-for-who-avatar" htmlFor="person2"></label>*/}
                        {/*<input className="form-checkbox-for-who" type="checkbox" id="person3"/>*/}
                        {/*<label className="form-checkbox-for-who-avatar" htmlFor="person3"></label>*/}
                        {/*<input className="form-checkbox-for-who" type="checkbox" id="person4"/>*/}
                        {/*<label className="form-checkbox-for-who-avatar" htmlFor="person4"></label>*/}
                        {/*<input className="form-checkbox-for-who" type="checkbox" id="person5"/>*/}
                        {/*<label className="form-checkbox-for-who-avatar" htmlFor="person5"></label>*/}
                    </div>
                    <button className="button-add-gift-submit" type="submit" onClick={createGift}>save idea</button>
                </form>
            </div>
        )
    } else {
        return null
    }
}

export default FormGift;