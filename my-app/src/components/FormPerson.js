import React, {useState, useEffect} from 'react';
import {addDoc, collection} from "firebase/firestore";
import {db, auth, storage} from "../firebase";
import {useNavigate} from "react-router-dom";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";

const FormPerson = (props) => {
    const [personPhoto, setPersonPhoto] = useState(null);
    const [personPhotoURL, setPersonPhotoURL] = useState("https://firebasestorage.googleapis.com/v0/b/new-gifty.appspot.com/o/userImages%2Ficon.jpg?alt=media&token=67d50445-942f-475d-bd37-e3de2b868270");
    const [personName, setPersonName] = useState("");
    const [personBirthday, setPersonBirthday] = useState("");
    const [personDescription, setPersonDescription] = useState("");

    const personsCollection = collection(db, "persons");
    const eventsCollection = collection(db, "events");
    let navigate = useNavigate();

    const uploadPhoto = async () => {
        if (personPhoto == null) return;
        const photoRef = ref(storage, `userImages/${auth.currentUser.uid}.${personName}.${personBirthday}`)
        await uploadBytes(photoRef, personPhoto).then((result) => {
            getDownloadURL(photoRef).then((url) => {
                setPersonPhotoURL(url);
            })
        });
    };

    useEffect(()=>{
        uploadPhoto()
    }, [personPhoto])

    const createEvent = async () => {
        if(personBirthday === "") {return null;}
        const month = `${personBirthday[5]}${personBirthday[6]}`
        const day = `${personBirthday[8]}${personBirthday[9]}`
        const date = `${day}.${month}`
        await addDoc(eventsCollection, {
            eventAuthor: {name: auth.currentUser.email, id: auth.currentUser.uid},
            eventName: `${personName}'s birthday`,
            eventDate: date,
        })
    }


    const createPerson = async (event) => {
        event.preventDefault();
        const errorMessageName = document.getElementById("error-message-person-name");
        const errorMessageNameLong = document.getElementById("error-message-person-name-long");
        if (personName.length < 3){
            errorMessageName.classList.remove("hidden");
            return null;
        } else {
            errorMessageName.classList.add("hidden");
        }
        if (personName.length > 30){
            errorMessageNameLong.classList.remove("hidden");
            return null;
        } else {
            errorMessageNameLong.classList.add("hidden");
        }
        await addDoc(personsCollection, {
            personAuthor: {name: auth.currentUser.email, id: auth.currentUser.uid},
            personPhotoURL,
            personName,
            personBirthday,
            personDescription,
        })
        await createEvent();
        navigate("/friends");
    };


    if (props.userLoggedIn) {
        return (
            <div className="section">
                <form className="form-person">
                    <div className="form-person-container">
                        <div className="person-photo-container">
                            <div className="form-input-person">
                                <label htmlFor="personPhoto">PHOTO</label>
                                <label className="photo-upload" style={{backgroundImage: `url("${personPhotoURL}")`}} htmlFor="personPhoto"></label>
                                <input className="photo-upload-button" name="personPhoto" id="personPhoto" type="file"
                                       accept="image/png, image/jpeg" onChange={(event) => {
                                    setPersonPhoto(event.target.files[0])
                                }}/>
                            </div>
                        </div>
                        <div className="person-short-container">
                            <div className="form-input-person">
                                <label htmlFor="personName">name</label>
                                <input name="personName" id="personName" type="text" onChange={(event) => {
                                    setPersonName(event.target.value)
                                }} required/>
                            </div>
                            <div className="form-input-person">
                                <label htmlFor="personDate">date of birth</label>
                                <input name="personDate" id="personDate" type="date" onChange={(event) => {
                                    setPersonBirthday(event.target.value)
                                }}/>
                            </div>
                        </div>
                    </div>
                    <div className="form-input-person">
                        <label htmlFor="personDescription">description</label>
                        <input name="personDescription" id="personDescription" type="textarea" onChange={(event) => {
                            setPersonDescription(event.target.value)
                        }}/>
                    </div>
                    <div className="error-message hidden" id="error-message-person-name">Add person name (min. 3 characters)</div>
                    <div className="error-message hidden" id="error-message-person-name-long">Person name too long (max. 30 characters)</div>
                    <button className="button-add-person-submit" type="submit" onClick={createPerson}>save friend</button>
                </form>
            </div>
        )
    } else {
        return null
    }
}

export default FormPerson;