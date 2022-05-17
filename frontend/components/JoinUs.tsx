import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/JoinUs.module.css'
import Authentification from './Authentification';

function JoinUs() {
    const [signUpVisibility, setSignUpVisibility] = useState(false);

    const toggleAuthVisibility = () => {
        setSignUpVisibility(!signUpVisibility);
    }

    return (
        <>
            <div className={styles.globalContainer}>
                <div className={styles.textContainer}>
                    <h1 className={styles.title}>Join us.</h1>
                    <p className={styles.paraph}>Discover stories, thinking, and expertise from writers on any topic.</p>
                    <a className={styles.startReading} onClick={toggleAuthVisibility}>Start reading</a>
                </div>
                <div>
                    <img className={styles.gif} src="https://i.imgur.com/bH2iUei.gif" alt="mind blown" />
                </div>
            </div>
            {signUpVisibility ? <Authentification signingUp={true} shown={signUpVisibility} setShown={setSignUpVisibility} /> : null}
        </>
    )
}

export default JoinUs;