import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { CurrProfileContext } from "../context/userContext";
import styles from "../styles/UserMenuPopUp.module.css";

function UserMenuPopUp({
    shown,
    setShown,
}: {
    shown: boolean;
    setShown: Dispatch<SetStateAction<boolean>>;
}) {
    let clickCount: number = 0;
    const popUp = useRef<HTMLDivElement>(null);
    const [currProfile, setCurrProfile] = useContext(CurrProfileContext);
    const router = useRouter();

    const logOutRequest = () => {
        window.localStorage.removeItem('loggedIn');
        setCurrProfile({
            isLoggedIn: false,
            login: null,
            id: null,
        });
        router.reload();
    }

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            //CORRECT CLICKCONT FOR PRODUCTION (SET TO 2 BECAUSE OF REACTSTRICTCODE)
            if (
                clickCount >= 2 &&
                shown &&
                popUp.current &&
                !popUp.current.contains(event.target as Node)
            ) {
                console.log("ici");
                setShown(false);
            }
            clickCount += 1;
        }
        window.addEventListener("click", handleClick);
    });
    return (
        <div ref={popUp} className={styles.globalContainer}>
            <a className={styles.listElement}>Place Holder</a>
            <a className={styles.listElement}>Place Holder</a>
            <a className={styles.listElement}
            onClick={logOutRequest}>Log out</a>
        </div>
    );
}

export default UserMenuPopUp;
