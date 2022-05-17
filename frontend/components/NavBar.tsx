import styles from '../styles/navBar.module.css';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Authentification from './Authentification';

function NavBar() {
    const [shown, setShown] = useState(false);
    const [authIsSignUp, setAuthIsSignUp] = useState(true);

    const signUptoggleAuthVisibility = () => {
        setAuthIsSignUp(true);
        setShown(!shown);
    }

    const signIntoggleAuthVisibility = () => {
        setAuthIsSignUp(false);
        setShown(!shown);

    }


    return (
        <>
            <nav className={styles.nav}>
                <Link href="/"><a className={`${styles.title} ${styles.link}`}>blog NestNext</a></Link>
                <ul className={styles.ul}>
                    <li className={styles.li}>
                        <Link href="/Categories"><a className={styles.link}>Categories</a></Link>
                    </li>
                    <li className={styles.li}>
                        <Link href="/About"><a className={styles.link}>About</a></Link>
                    </li>
                    <li className={styles.li}>
                        <a className={styles.link} onClick={signIntoggleAuthVisibility}>Sign in</a>
                    </li>
                    <li className={styles.li}>
                        <a className={`${styles.link} ${styles.getStarted}`} onClick={signUptoggleAuthVisibility}>Get started</a>
                    </li>
                </ul>
            </nav>
            {shown ? <Authentification signingUp={authIsSignUp} shown={shown} setShown={setShown} /> : null}
        </>
    )
}

export default NavBar;