import React, {useState, useEffect} from 'react';
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

const App = () => {
    const [userLoggedIn, setUserLoggedIn] = useState(false)

    return (<HashRouter>
            <Header/>
            <div className="main">
                <div className="container">
                    <Authentication setUserLoggedIn={setUserLoggedIn}/>
                    <Routes>
                        <Route path='/' element={<MainButton/>}/>
                        <Route path='/add-gift' element={<FormGift/>}/>
                        <Route path='/friends' element={<><People/><FormPerson/></>}/>
                        <Route path='/events' element={<Events/>}/>
                        <Route path='/person' element={<Person/>}/>
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
