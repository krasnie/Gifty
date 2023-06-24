import React, {useState, useEffect} from 'react';

const Events = (props) => {
    if (props.userLoggedIn) {
        return (
            <div className="section">
                <div className="section-events" id="events">
                    <div className="section-events-list">
                        <h2>events</h2>
                        <p>coming soon...</p>
                        <ul>
                            <li>16.07 PATRYK'S BIRTHDAY</li>
                            <li>19.02 MARYSIA'S BIRTHDAY</li>
                            <li>08.03 WOMEN'S DAY</li>
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