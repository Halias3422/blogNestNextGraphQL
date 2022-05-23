import styles from '../styles/navBar.module.css';
import Link from 'next/link';
import {
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useState
} from 'react';
import Authentification from './Authentification';
import { CurrProfile } from '../types/currProfile';
import { CurrProfileContext } from '../context/userContext';
import UserMenuNavBar from './UserMenuNav.component';

function NavBar() {
	const [showAuthMenu, setShowAuthMenu] = useState(false);
	const [authIsSignUp, setAuthIsSignUp] = useState(true);
	const [currProfile, setCurrProfile] = useContext(CurrProfileContext);

	const signUptoggleAuthVisibility = () => {
		setAuthIsSignUp(true);
		setShowAuthMenu(!showAuthMenu);
	};

	const signIntoggleAuthVisibility = () => {
		setAuthIsSignUp(false);
		setShowAuthMenu(!showAuthMenu);
	};

	return (
		<>
			<nav className={styles.nav}>
				<Link href="/">
					<a className={`${styles.title} ${styles.link}`}>
						blog NestNext
					</a>
				</Link>
				<ul className={styles.ul}>
					<li className={styles.li}>
						<Link href="/Categories">
							<a className={styles.link}>Categories</a>
						</Link>
					</li>
					<li className={styles.li}>
						<Link href="/About">
							<a className={styles.link}>About</a>
						</Link>
					</li>
					{currProfile.isLoggedIn ? (
						<UserMenuNavBar />
					) : (
						<>
							<li className={styles.li}>
								<a
									className={styles.link}
									onClick={signIntoggleAuthVisibility}
								>
									Sign in
								</a>
							</li>
							<li className={styles.li}>
								<a
									className={`${styles.link} ${styles.getStarted}`}
									onClick={signUptoggleAuthVisibility}
								>
									Get started
								</a>
							</li>
						</>
					)}
				</ul>
			</nav>
			{showAuthMenu ? (
				<Authentification
					signingUp={authIsSignUp}
					shown={showAuthMenu}
					setShown={setShowAuthMenu}
				/>
			) : null}
		</>
	);
}

export default NavBar;
