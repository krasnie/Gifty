import React, {useState, useEffect} from 'react';
import {createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";
import {useNavigate} from "react-router-dom";

const Authentication = ({setUserLoggedIn}) => {

    let navigate = useNavigate();

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

    }, [])

    const register = async (e) => {
        e.preventDefault();
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword).then((result)=>{
                localStorage.setItem("userLoggedIn", true);
                setUserLoggedIn(true);
                navigate("/home");
            });
            console.log(user)
        } catch (error) {
            const errorMessageRegistration = document.getElementById("error-registration");
            errorMessageRegistration.classList.remove("hidden");
        }
    }

    const login = async (e) => {
        e.preventDefault();
        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword).then((result)=>{
                localStorage.setItem("userLoggedIn", true);
                setUserLoggedIn(true);
                navigate("/home");
            });
            console.log(user)

        } catch (error) {
            const errorMessageLogin = document.getElementById("error-login");
            errorMessageLogin.classList.remove("hidden");
        }
    }

    const logout = async () => {
        await signOut(auth).then((result)=>{
            localStorage.setItem("userLoggedIn", false);
            setUserLoggedIn(false);
            navigate("/")
        });;
    }

    if(user) {
        return (<h4 className="logged-user">User logged in: <span>{user?.email}</span> <button onClick={logout} className="button-signout">log out</button></h4>)
    } else {

        return (
            <>
                <form className="authentication">
                    <div className="authentication-login">
                        <h3>LOGIN</h3>
                        <div className="form-input">
                            <input
                                placeholder="e-mail"
                                type="email"
                                onChange={(event) => {
                                    setLoginEmail(event.target.value)
                                }}/>
                        </div>
                        <div className="form-input">
                            <input
                                placeholder="password"
                                type="password"
                                onChange={(event) => {
                                    setLoginPassword(event.target.value)
                                }}/>
                        </div>
                        <div className="error-message hidden" id="error-login">Invalid e-mail or password</div>
                        <button onClick={login} className="button-login">LOGIN</button>
                    </div>
                    <div className="authentication-register">
                        <h3>REGISTER</h3>
                        <div className="form-input">
                            <input
                                placeholder="e-mail"
                                type="email"
                                onChange={(event) => {
                                    setRegisterEmail(event.target.value)
                                }}/>
                        </div>
                        <div className="form-input">
                            <input
                                placeholder="password"
                                type="password"
                                onChange={(event) => {
                                    setRegisterPassword(event.target.value)
                                }}/>
                        </div>
                        <div className="error-message hidden" id="error-registration">Invalid e-mail or password (min. 6 characters)</div>
                        <button onClick={register} className="button-register">CREATE USER</button>
                    </div>
                </form>
            </>
        )
    }
}

export default Authentication;