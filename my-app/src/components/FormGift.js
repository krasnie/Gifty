import React, {useState, useEffect} from 'react';

const FormGift = () => {
    return (
        <div className="section">
            <form className="form-gift">
                <div className="form-input">
                    <label htmlFor="giftname">gift name</label>
                    <input name="giftname" id="giftname" type="text"/>
                </div>
                <div className="form-input">
                    <label htmlFor="giftlink">link</label>
                    <input name="giftlink" id="giftlink" type="text"/>
                </div>
                <div className="form-input">
                    <label htmlFor="giftdescription">description</label>
                    <input name="giftdescription" id="giftdescription" type="textarea"/>
                </div>
                <div className="form-input">
                    <label htmlFor="giftprice">price</label>
                    <input name="giftprice" id="giftprice" type="number"/>
                </div>
                <div className="form-gift-for-who">
                    <h3>it would be a perfect gift for:</h3>
                    <input className="form-checkbox-for-who" type="checkbox" id="person1"/>
                    <label className="form-checkbox-for-who-avatar" htmlFor="person1"></label>
                    <input className="form-checkbox-for-who" type="checkbox" id="person2"/>
                    <label className="form-checkbox-for-who-avatar" htmlFor="person2"></label>
                    <input className="form-checkbox-for-who" type="checkbox" id="person3"/>
                    <label className="form-checkbox-for-who-avatar" htmlFor="person3"></label>
                    <input className="form-checkbox-for-who" type="checkbox" id="person4"/>
                    <label className="form-checkbox-for-who-avatar" htmlFor="person4"></label>
                    <input className="form-checkbox-for-who" type="checkbox" id="person5"/>
                    <label className="form-checkbox-for-who-avatar" htmlFor="person5"></label>
                </div>
                <button className="button-add-gift-submit" type="submit">save idea</button>
            </form>
        </div>
    )
}

export default FormGift;