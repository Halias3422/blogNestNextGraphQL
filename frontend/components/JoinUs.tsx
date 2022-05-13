import Link from 'next/link';
import styles from '../styles/JoinUs.module.css'

function JoinUs() {
    return (
        <div className={styles.globalContainer}>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>Join us.</h1>
                <p className={styles.paraph}>Discover stories, thinking, and expertise from writers on any topic.</p>
                <Link href="/signUp"><a className={styles.startReading}>Start reading</a></Link>
            </div>
            <div>
                <img className={styles.gif} src="https://i.imgur.com/bH2iUei.gif" alt="mind blown" />
            </div>
        </div>
    )
}

export default JoinUs;