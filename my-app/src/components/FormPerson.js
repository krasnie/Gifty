import React, {useState, useEffect} from 'react';

const FormPerson = () => {
    return (
        <div className="section">
            <form className="form-person">
                <div className="form-person-container">
                    <div className="person-photo-container">
                        <div className="form-input-person">
                            <label htmlFor="personPhoto">PHOTO</label>
                            <input className="photo-upload" name="personPhoto" id="personPhoto" type="file"
                                   accept="image/png, image/jpg"/>
                        </div>
                    </div>
                    <div className="person-short-container">
                        <div className="form-input-person">
                            <label htmlFor="personName">name</label>
                            <input name="personName" id="personName" type="text"/>
                        </div>
                        <div className="form-input-person">
                            <label htmlFor="personDate">date of birth</label>
                            <input name="personDate" id="personDate" type="date"/>
                        </div>
                    </div>
                </div>
                <div className="form-input-person">
                    <label htmlFor="personDescription">description</label>
                    <input name="personDescription" id="personDescription" type="textarea"/>
                </div>
                <button className="button-add-person-submit" type="submit">save friend</button>
            </form>
        </div>
    )
}

export default FormPerson;