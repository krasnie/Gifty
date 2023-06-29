import React from 'react';
import {
    Link,
} from 'react-router-dom';



const MainButton = (props) => {
    if (props.userLoggedIn) {
        return (
            <div className="section">
                <div className="add-gift" id="add-gift">
                    <div className="add-gift-image"></div>
                    <Link to="/add-gift" class="add-gift-button"><p className="add-git-button-text">+ new gift idea</p></Link>
                </div>
                <div className="explore-section">
                    <Link to={"/friends"} className="see-gift-ideas">
                        <h3>see gift ideas for your</h3>
                        <h2><p>friends</p></h2>
                        <div className="friends-image"></div>
                    </Link>
                    <Link to={"/events"} className="see-events">
                        <div className="events-image"></div>
                        <h3>explore upcoming</h3>
                        <h2>events</h2>
                    </Link>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="section">
                <div className="add-gift" id="add-gift">
                    <div className="add-gift-image"></div>
                    <Link to="/login" class="add-gift-button">SIGN UP</Link>
                </div>
            </div>
        )
    }
}

export default MainButton;