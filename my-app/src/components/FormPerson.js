import React, {useState, useEffect} from 'react';
import { addDoc, collection } from "firebase/firestore";
import {db, auth, storage} from "../firebase";
import {useNavigate} from "react-router-dom";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";


const FormPerson = (props) => {
    const [personPhoto, setPersonPhoto] = useState(null);
    const [personName, setPersonName] = useState("");
    const [personBirthday, setPersonBirthday] = useState(new Date());
    const [personDescription, setPersonDescription] = useState("");
    const [personGiftBox, setPersonGiftBox] = useState([]);

    const personsCollection = collection(db, "persons");
    const eventsCollection = collection(db, "events");
    let navigate = useNavigate();

    const createEvent = async () => {
        await addDoc(eventsCollection, {
            eventAuthor: {name: auth.currentUser.email, id: auth.currentUser.uid},
            personName,
            personBirthday,
        })
    }

    const uploadPhoto = () => {
        if (personPhoto == null) return;
        const photoRef = ref(storage, `images/${personPhoto.name + v4()}`);
        uploadBytes(photoRef, personPhoto).then(()=>{
            alert("Image Uploaded")
        })
    }

    const createPerson = async (event) => {
        event.preventDefault();
        await addDoc(personsCollection, {
            personAuthor: {name: auth.currentUser.email, id: auth.currentUser.uid},
            personName,
            personBirthday,
            personDescription,
            personGiftBox
        })
        navigate("/friends");
        await createEvent();
        await uploadPhoto();
    };

    if (props.userLoggedIn) {
        return (
            <div className="section">
                <form className="form-person">
                    <div className="form-person-container">
                        <div className="person-photo-container">
                            <div className="form-input-person">
                                <label htmlFor="personPhoto">PHOTO</label>
                                <input className="photo-upload" name="personPhoto" id="personPhoto" type="file"
                                       accept="image/png, image/jpg" onChange={(event) => {setPersonPhoto(event.target.files[0])}} />
                            </div>
                        </div>
                        <div className="person-short-container">
                            <div className="form-input-person">
                                <label htmlFor="personName">name</label>
                                <input name="personName" id="personName" type="text" onChange={(event) => {setPersonName(event.target.value)}}/>
                            </div>
                            <div className="form-input-person">
                                <label htmlFor="personDate">date of birth</label>
                                <input name="personDate" id="personDate" type="date" onChange={(event) => {setPersonBirthday(event.target.value)}}/>
                            </div>
                        </div>
                    </div>
                    <div className="form-input-person">
                        <label htmlFor="personDescription">description</label>
                        <input name="personDescription" id="personDescription" type="textarea" onChange={(event) => {setPersonDescription(event.target.value)}}/>
                    </div>
                    <button className="button-add-person-submit" type="submit" onClick={createPerson}>save friend</button>
                </form>
            </div>
        )
    } else {
        return null
    }
}

export default FormPerson;