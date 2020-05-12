import React, { useCallback, useEffect, useRef, useState } from 'react';
import firebase from '../data/firebase';
import Spinner from './commons/Spinner';


const LoginPage = () => {

    const mount = useRef(false);
    const [emailInput, setEmailInput] = useState<string>('');
    const [passwordInput, setPasswordInput] = useState<string>('');
    const [checkPassword, setCheckPassword] = useState<string>('');
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [createStatus, setCreateStatus] = useState<boolean>(false);
    const [forceUpdate, setForceUpdate] = useState<boolean>(false);

    useEffect(() => {
        const fetchAuthData = async () => {
            setIsFetching(true);
            setError('');
            if (createStatus) { // REGISTRATION
                if (checkPassword === passwordInput) {
                    firebase.auth().createUserWithEmailAndPassword(emailInput, passwordInput)
                        .catch(() => {
                            setError('Email already exists');
                            errorToggle();
                        })
                } else {
                    setError('Passwords not the same');
                    errorToggle();
                }
            } else { // LOGIN
                firebase.auth().signInWithEmailAndPassword(emailInput, passwordInput)
                    .catch(() => {
                        setError('Wrong Email or Password');
                        setIsFetching(false)
                    })
            }
        }
        if (mount.current) {
            fetchAuthData()
        }// eslint-disable-next-line
    }, [forceUpdate])

    // FIRST RENDER CONTROL
    useEffect(() => {
        mount.current = true;
        return () => {
            mount.current = false;
        }
    }, [])

    // ERROR FUNC
    const errorToggle = () => {
        setPasswordInput('');
        setCheckPassword('')
        setIsFetching(false)
    }

    // LOGIN/REGISTRATION BUTTON
    const handleLoginClick = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setForceUpdate(!forceUpdate);// eslint-disable-next-line
    }, [])


    // CHANGE TYPE OF LOGIN/REGISTRATION
    const handleFormChange = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setCreateStatus(createStatus => !createStatus)// eslint-disable-next-line
    }, [])

    return (
        <div className="loginPage">
            <h1>Login Form</h1>
            <form className="loginForm">
                {!isFetching
                    ? <>
                        <div className="loginForm__inputField">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                value={emailInput}
                                type="text"
                                placeholder="example@gmail.com"
                                onChange={(e) => setEmailInput(e.currentTarget.value)}
                            />
                        </div>
                        <div className="loginForm__inputField">
                            <label htmlFor="login">Password</label>
                            <input
                                id="password"
                                value={passwordInput}
                                type="password"
                                placeholder="password"
                                onChange={(e) => setPasswordInput(e.currentTarget.value)}
                            />
                        </div>
                        {createStatus
                            ? <div className="loginForm__inputField">
                                <label htmlFor="login">Repeat password</label>
                                <input
                                    id="checkPassword"
                                    value={checkPassword}
                                    type="password"
                                    placeholder="password"
                                    onChange={(e) => setCheckPassword(e.target.value)}
                                />
                            </div>
                            : null}
                    </>
                    : <Spinner />}
                {error !== ''
                    ?
                    <div className="loginForm__inputField">
                        <h3>{error}</h3>
                    </div>
                    : null}
                <button onClick={(e) => { handleLoginClick(e) }}>{createStatus ? 'Sign Up' : 'Login'}</button>
            </form>

            <button onClick={(e) => { handleFormChange(e) }}>{createStatus ? 'Login Form' : 'Registration Form'}</button>
        </div>
    );
}

export default LoginPage;