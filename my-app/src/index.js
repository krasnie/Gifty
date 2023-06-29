import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './styles/styles.scss';
import {
    HashRouter,
    Route,
    Routes,
    Link,
    NavLink,
    Outlet
} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
//import firebase, {db} from "./firebase";
import Header from "./components/Header";
import Authentication from "./components/Authentication";
import MainButton from "./components/MainButton";
import FormGift from "./components/FormGift";
import People from "./components/People";
import FormPerson from "./components/FormPerson";
import Events from "./components/Events";
import Person from "./components/Person";
import PageNotFound from "./components/PageNotFound";

const App = () => {
    const [userLoggedIn, setUserLoggedIn] = useState(false)

    const scrollUp = (id) => {
        const up = document.getElementById(id)
        up.scrollIntoView({behavior: "smooth"})
    }

    return (<HashRouter>
            <Header userLoggedIn={userLoggedIn}/>
            <div className="main">
                <button onClick={()=> scrollUp("header")} className="up-button">^</button>
                <div className="container">
                    <Routes>
                        <Route path='/login' element={<Authentication setUserLoggedIn={setUserLoggedIn}/>}/>
                        <Route path='/' element={<><MainButton userLoggedIn={userLoggedIn}/></>}/>
                        <Route path='/home' element={<><Authentication setUserLoggedIn={setUserLoggedIn}/><MainButton userLoggedIn={userLoggedIn}/></>}/>
                        <Route path='/add-gift' element={<><Authentication setUserLoggedIn={setUserLoggedIn}/><FormGift userLoggedIn={userLoggedIn}/></>}/>
                        <Route path='/friends' element={<><Authentication setUserLoggedIn={setUserLoggedIn}/><People userLoggedIn={userLoggedIn}/></>}/>
                        <Route path='/add-friend' element={<><Authentication setUserLoggedIn={setUserLoggedIn}/><FormPerson userLoggedIn={userLoggedIn}/></>}/>
                        <Route path='/events' element={<><Authentication setUserLoggedIn={setUserLoggedIn}/><Events userLoggedIn={userLoggedIn}/></>}/>
                        {}
                        <Route path='/person' element={<><Authentication setUserLoggedIn={setUserLoggedIn}/><Person userLoggedIn={userLoggedIn}/></>}/>
                        <Route path='*' element={<PageNotFound/>}/>
                    </Routes>
                </div>
            </div>
        </HashRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
