import Image from 'next/image';
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import styles from '../styles/Authentification.module.css'

function Authentification({ signingUp, shown, setShown }: { signingUp: boolean, shown: boolean, setShown: Dispatch<SetStateAction<boolean>> }) {
    let contextText: string = "Sign Up";
    if (!signingUp) {
        contextText = "Sign In";
    }
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
                <form className={styles.authForm}>
                    <div className={styles.authInnerDivs}>
                        <label className={styles.textForm} htmlFor="login">Login</label>
                        <input className={styles.textForm} type="text" id="login" maxLength={30} minLength={4} />
                    </div>
                    <div className={styles.authInnerDivs}>
                        <label className={styles.textForm} htmlFor="password">Password</label>
                        <input className={styles.textForm} type="password" id="password" maxLength={30} minLength={4} />
                    </div>
                    <button className={`${styles.confirmButton} ${styles.textForm}`}>{contextText}</button>
                </form>
            </div>
        </div>
    )
}

export default Authentification;