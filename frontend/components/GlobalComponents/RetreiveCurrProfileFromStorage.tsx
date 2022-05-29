import { useContext, useEffect } from 'react';
import { CurrProfileContext, LocalStorageCurrSession } from '../../pages/_app';
import { CurrProfile } from '../../types/user';

const RetreiveCurrProfileFromStorage = () => {
	const [currProfile, setCurrProfile] = useContext(CurrProfileContext);

	useEffect(() => {
		const checkCurrSessionState = async () => {
			const currSessionCheck = localStorage.getItem(
				LocalStorageCurrSession
			);
			if (currSessionCheck) {
				const loggedInUser: CurrProfile = await JSON.parse(
					currSessionCheck
				);
				loggedInUser.sessionChecked = true;
				setCurrProfile(loggedInUser);
			} else {
				currProfile.sessionChecked = true;
				setCurrProfile(currProfile);
			}
		};
		checkCurrSessionState();
	}, [setCurrProfile]);
	return <></>;
};

export default RetreiveCurrProfileFromStorage;
