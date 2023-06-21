import React, {useState} from 'react';
import {createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";

const Authentication = () => {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            console.log(user)
        } catch (error) {
            console.log(error.message)
        }
    }

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log(user)
        } catch (error) {
            console.log(error.message)
        }
    }

    const logout = async () => {
        await signOut(auth);
    }

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
                    <button onClick={register} className="button-register">CREATE USER</button>
                </div>
            </form>

            <h4 className="logged-user">User logged in: <span>{user?.email}</span> <button onClick={logout} className="button-signout">log out</button></h4>
        </>
    )
}

export default Authentication;