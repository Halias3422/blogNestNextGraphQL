import styles from '../styles/navBar.module.css';
import Link from 'next/link';

function NavBar() {
    return (
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
                    <Link href="/SignIn"><a className={styles.link}>Sign in</a></Link>
                </li>
                <li className={styles.li}>
                    <Link href="/SignUp"><a className={`${styles.link} ${styles.getStarted}`}>Get started</a></Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;