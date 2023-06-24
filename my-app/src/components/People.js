import React, {useState, useEffect} from 'react';
import {
    HashRouter,
    Route,
    Routes,
    Link,
    NavLink,
    Outlet
} from 'react-router-dom';
import {collection, getDocs} from "firebase/firestore"
import {auth, db} from "../firebase";
import Person from "./Person";


const People = (props) => {
    const [peopleList, setPeopleList] = useState([]);

    const personsCollection = collection(db, "persons");

    useEffect(() => {
        const getPeople = async () => {
            const people = await getDocs(personsCollection);
            const allPeople = (people.docs.map((doc) => ({...doc.data(), id: doc.id})));
            //setPeopleList(allPeople.filter((doc) => (doc.personAuthor.id === auth.currentUser.uid)))
            setPeopleList(allPeople)
            console.log(allPeople)
        }
        getPeople();
    }, [peopleList])

    if (props.userLoggedIn) {
        return (<>

                <div className="section-people" id="people">
                    <h1>my friends</h1>
                    <div className="people">
                        {peopleList.map((person) => {
                            const personLink = `/people#${person.id}`
                            if (person.personAuthor.id === auth.currentUser.uid) {
                                return (
                                    <div className="people-single">
                                        <a href={personLink} className="people-pic man"></a>
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
                        return <Person userLoggedIn={props.userLoggedIn} personName={person.personName} personBirthday={person.personBirthday} personDescription={person.personDescription} personId={person.id} />
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