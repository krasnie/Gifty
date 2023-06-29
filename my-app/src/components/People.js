import React, {useState, useEffect, scrollIntoView} from 'react';
import { Link } from 'react-router-dom';
import {collection, getDocs} from "firebase/firestore"
import { auth, db } from "../firebase";
import Person from "./Person";


const People = (props) => {
    const [peopleList, setPeopleList] = useState([]);
    const [reloadPeople, setReloadPeople] = useState(true);

    const personsCollection = collection(db, "persons");

    useEffect(() => {
        const getPeople = async () => {
            const people = await getDocs(personsCollection);
            const allPeople = (people.docs.map((doc) => ({...doc.data(), id: doc.id})));
            setPeopleList(allPeople)
            console.log("reading")
        }
        getPeople();
    }, [reloadPeople])

    const scrollToPerson = (id) => {
        const personScroll = document.getElementById(id);
        personScroll.scrollIntoView({behavior: "smooth"})
    }

    if (props.userLoggedIn) {
        return (<>

                <div className="section-people" id="people">
                    <h1>my friends</h1>
                    <div className="people">
                        {peopleList.map((person) => {
                            const personLink = `/friends/#${person.id}`
                            if (person.personAuthor.id === auth.currentUser.uid) {
                                return (
                                    <div className="people-single" key={person.id}>
                                        <button onClick={()=> scrollToPerson(person.id)} className="people-pic" style={{backgroundImage: `url("${person.personPhotoURL}")`}}></button>
                                        <p className="people-name">{person.personName}</p>
                                    </div>
                                )
                            } else {return null}
                        })}
                    </div>
                    <Link to={"/add-friend"} className="button-people-add">+ add friend</Link>
                </div>

                {peopleList.map((person) => {
                    if (person.personAuthor.id === auth.currentUser.uid){
                        return <Person userLoggedIn={props.userLoggedIn} personName={person.personName} personBirthday={person.personBirthday} personDescription={person.personDescription} personId={person.id} personPhotoURL={person.personPhotoURL} setReloadPeople={setReloadPeople}/>
                    } else {return null}
                })
                }

            </>
        )
    } else {
        return null
    }
}

export default People;