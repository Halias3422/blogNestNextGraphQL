import styles from '../styles/Discover.module.css'

function Discover() {
    return (
        <div className={styles.globalContainer}>
            <div className={styles.topContainer}>
                <h4 className={styles.title}>DISCOVER MORE OF WHAT MATTERS TO YOU</h4>
                <div className={styles.categoriesContainer}>
                    {/* add categories buttons */}
                </div>
            </div>
            <div className={styles.bottomContainer}>
                {/* add links */}
            </div>
        </div >
    )
}

export default Discover;