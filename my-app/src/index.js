import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/styles.scss';
import reportWebVitals from './reportWebVitals';
//import firebase, {db} from "./firebase";
import Header from "./components/Header";
import Authentication from "./components/Authentication";

const App = () => {
    return (<>
            <Header/>
            <div className="main">
                <div className="container">
                    <Authentication/>
                </div>
            </div>
        </>
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
