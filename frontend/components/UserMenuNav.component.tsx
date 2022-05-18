import Link from "next/link";
import { useContext, useState } from "react";
import { CurrProfileContext } from "../context/userContext";
import styles from "../styles/navBar.module.css";
import UserMenuPopUp from "./UserMenuPopUp";

function UserMenuNavBar() {
    const [currProfile, setCurrProfile] = useContext(CurrProfileContext);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const toggleUserMenuVisibility = () => {
        setShowUserMenu(true);
    };

    return (
        <>
            <li className={styles.li}>
                <Link href="/newArticle">
                    <a className={`${styles.link} ${styles.newArticle}`}>
                        New article
                    </a>
                </Link>
            </li>
            <li className={styles.li}>
                <a
                    className={`${styles.link} ${styles.getStarted}`}
                    onClick={toggleUserMenuVisibility}
                >
                    {currProfile.login} &#9662;
                </a>
            </li>
            {showUserMenu ? (
                <UserMenuPopUp
                    shown={showUserMenu}
                    setShown={setShowUserMenu}
                />
            ) : null}
        </>
    );
}

export default UserMenuNavBar;
