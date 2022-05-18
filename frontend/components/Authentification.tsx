import Image from "next/image";
import {
    Dispatch,
    FormEvent,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { CurrProfileContext } from "../context/userContext";
import {
    handleUserConnection,
    handleUserRegistration,
} from "../dbLogic/userRecognition";
import { LocalStorageLoggedInUserKey } from "../pages/_app";
import styles from "../styles/Authentification.module.css";
import { CurrProfile } from "../types/currProfile";

function Authentification({
    signingUp,
    shown,
    setShown,
}: {
    signingUp: boolean;
    shown: boolean;
    setShown: Dispatch<SetStateAction<boolean>>;
}) {
    const [currProfile, setCurrProfile] = useContext(CurrProfileContext);
    let contextText: string = "Sign Up";
    let clickCount: number = 0;

    if (!signingUp) {
        contextText = "Sign In";
    }
    document.body.style.overflow = "hidden";
    const [errorSignUp, setErrorSignUp] = useState(false);
    const [errorSignIn, setErrorSignIn] = useState(false);
    const popUp = useRef<HTMLDivElement>(null);

    const closePopUp = useCallback(() => {
        document.body.style.overflow = "auto";
        setShown(false);
    }, [setShown]);

    const toggleVisibility = useCallback(() => {
        closePopUp();
    }, [closePopUp]);

    useEffect(() => {
        //CORRECT CLICKCONT FOR PRODUCTION (SET TO 2 BECAUSE OF REACTSTRICTCODE)
        window.addEventListener("click", (event: MouseEvent) => {
            if (
                clickCount >= 2 &&
                shown &&
                popUp.current &&
                !popUp.current.contains(event.target as Node)
            ) {
                closePopUp();
            }
            clickCount += 1;
        });

        window.addEventListener("keydown", (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closePopUp();
            }
        });
    });

    async function handleUserSubmit(event: FormEvent<HTMLFormElement>) {
        let userProfile: CurrProfile;

        if (signingUp) {
            setCurrProfile(
                (userProfile = await handleUserRegistration(
                    event,
                    setErrorSignUp,
                    currProfile
                ))
            );
        } else {
            setCurrProfile(
                (userProfile = await handleUserConnection(
                    event,
                    setErrorSignIn,
                    currProfile
                ))
            );
        }
        if (userProfile && userProfile.isLoggedIn && userProfile.id) {
            localStorage.setItem(
                LocalStorageLoggedInUserKey,
                JSON.stringify(userProfile)
            );
            toggleVisibility();
        }
    }

    return (
        <div className={styles.globalContainer}>
            <div ref={popUp} className={styles.iframe}>
                <div className={styles.closeContainer}>
                    <Image
                        className={styles.closeIcon}
                        src="/close_icon.png"
                        alt="close"
                        width={60}
                        height={60}
                        onClick={toggleVisibility}
                    />
                </div>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>{contextText}</h1>
                </div>
                <form
                    onSubmit={async (event) => await handleUserSubmit(event)}
                    className={styles.authForm}
                    id="submitForm"
                >
                    <div className={styles.authInnerDivs}>
                        <label className={styles.textForm} htmlFor="login">
                            Login
                        </label>
                        <input
                            className={styles.textForm}
                            type="text"
                            id="login"
                            name="login"
                            maxLength={30}
                            minLength={4}
                        />
                    </div>
                    <div className={styles.authInnerDivs}>
                        <label className={styles.textForm} htmlFor="password">
                            Password
                        </label>
                        <input
                            className={styles.textForm}
                            type="password"
                            id="password"
                            name="password"
                            maxLength={30}
                            minLength={4}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`${styles.confirmButton} ${styles.textForm}`}
                    >
                        {contextText}
                    </button>
                    {errorSignUp ? (
                        <p className={`${styles.textForm} ${styles.errorMsg}`}>
                            ERROR: Login already taken.
                        </p>
                    ) : (
                        <p></p>
                    )}
                    {errorSignIn ? (
                        <p className={`${styles.textForm} ${styles.errorMsg}`}>
                            ERROR: Wrong login or password
                        </p>
                    ) : (
                        <p></p>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Authentification;
