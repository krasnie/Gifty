import React, {useState, useEffect} from 'react';
import {db, auth} from "../firebase";
import {collection, deleteDoc, doc, getDocs} from "firebase/firestore";

const Events = (props) => {
    const [eventsList, setEventsList] = useState([]);
    const [reload, setReload] = useState(true);

    const eventsCollection = collection(db, "events");

    useEffect(() => {
        const getEvents = async () => {
            const events = await getDocs(eventsCollection);
            const allEvents = (events.docs.map((doc) => ({...doc.data(), id: doc.id})));
            allEvents.sort((a,b) => (a.eventDate[1]-b.eventDate[1]))
            allEvents.sort((a,b) => (a.eventDate[0]-b.eventDate[0]))
            allEvents.sort((a,b) => (a.eventDate[4]-b.eventDate[4]))
            allEvents.sort((a,b) => (a.eventDate[3]-b.eventDate[3]))
            console.log(allEvents)
            setEventsList(allEvents)
        }
        getEvents();
    }, [reload])

    const eventDelete = async (id) => {
        const deletedEvent = doc(db, "events", id);
        await deleteDoc(deletedEvent);
        setReload((prev)=>!prev)
    }

    if (props.userLoggedIn) {
        return (
            <div className="section">
                <div className="section-events" id="events">
                    <div className="section-events-list">
                        <h2>events</h2>
                        <p>MY EVENTS</p>
                        <ul>
                            {eventsList.map((ev) => {
                                    if (ev.eventAuthor.id === auth.currentUser.uid) {
                                        return (<div className="single-event">
                                            <li key={ev.id}><span>{ev.eventDate}</span> {ev.eventName}</li>
                                            <button className="delete-event-button" onClick={()=>eventDelete(ev.id)}>delete</button>
                                        </div>)
                                    }
                                })
                            }
                        </ul>
                        <p>OTHER EVENTS</p>
                        <ul>
                            {eventsList.map((ev) => {
                                if (ev.eventAuthor.id === "admin") {
                                    return (<div className="single-event">
                                        <li key={ev.id}><span>{ev.eventDate}</span> {ev.eventName}</li>
                                    </div>)
                                }
                            })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }
}

export default Events;