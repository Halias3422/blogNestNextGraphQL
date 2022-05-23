import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { CurrProfileContext } from '../context/userContext';
import { CurrProfile } from '../types/currProfile';

export default function Authentificated({
	currProfile
}: {
	currProfile: CurrProfile;
}) {
	const router = useRouter();

	useEffect(() => {
		if (currProfile.isLoggedIn === false) {
			router.push('/');
		}
	});
	return <></>;
}
