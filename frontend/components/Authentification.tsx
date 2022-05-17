import Image from 'next/image';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { handleUserConnection, handleUserRegistration } from '../dbLogic/userRegistration';
import styles from '../styles/Authentification.module.css'

function Authentification({ signingUp, shown, setShown }: { signingUp: boolean, shown: boolean, setShown: Dispatch<SetStateAction<boolean>> }) {
    let contextText: string = "Sign Up";
    if (!signingUp) {
        contextText = "Sign In";
    }

    const [errorSignUp, setErrorSignUp] = useState(false);
    const [errorSignIn, setErrorSignIn] = useState(false);

    const toggleVisibility = useCallback (() => {
            setShown(false);
    }, [setShown]);

    return (
        <div className={styles.globalContainer} >
            <div className={styles.iframe}>
                <div className={styles.closeContainer}>
                    <Image className={styles.closeIcon} src='/close_icon.png' alt='close' width={60} height={60} onClick={toggleVisibility}/>
                </div>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>{contextText}</h1>
                </div>
                <form onSubmit={ (event) => signingUp ? handleUserRegistration(event, setErrorSignUp) : handleUserConnection(event, setErrorSignIn)} className={styles.authForm} id="submitForm">
                    <div className={styles.authInnerDivs}>
                        <label className={styles.textForm} htmlFor="login">Login</label>
                        <input className={styles.textForm} type="text" id="login" name="login" maxLength={30} minLength={4} />
                    </div>
                    <div className={styles.authInnerDivs}>
                        <label className={styles.textForm} htmlFor="password">Password</label>
                        <input className={styles.textForm} type="password" id="password" name="password" maxLength={30} minLength={4} />
                    </div>
                    <button type="submit" className={`${styles.confirmButton} ${styles.textForm}`} >{contextText}</button>
                    {errorSignUp ? <p className={`${styles.textForm} ${styles.errorMsg}`}>ERROR: Login already taken.</p> : null}
                    {errorSignIn ? <p className={`${styles.textForm} ${styles.errorMsg}`}>ERROR: Wrong login or password</p> : null}
                </form>
            </div>
        </div>
    )
}

export default Authentification;