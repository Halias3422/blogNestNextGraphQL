import { useLazyQuery, useMutation } from '@apollo/client';
import { Button, styled, Typography } from '@mui/material';
import {
	Dispatch,
	FormEvent,
	SetStateAction,
	useContext,
	useEffect,
	useState
} from 'react';
import {
	CREATE_NEW_USER_MUTATION,
	SET_USER_SESSION_TOKEN
} from '../../../../pages/api/mutations/usersMutations';
import { USER_FIND_ONE_BY_CREDENTIALS } from '../../../../pages/api/queries/usersQueries';
import { setNewSession } from '../../../../pages/api/sessionManagement/newSessionHandler';
import {
	CurrProfileContext,
	LocalStorageCurrSession
} from '../../../../pages/_app';
import { CurrProfile, UserSubmit } from '../../../../types/user';
import UserDialogTitle from '../subComponents/DialogTitle';
import TextFieldSigning from './subComponents/TextFieldSigning';

const SigningFormContainer = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center'
});

const SubmitButton = styled(Button)({
	backgroundColor: 'black',
	borderRadius: '25px',
	paddingLeft: '40px',
	paddingRight: '40px'
});

const ErrorMessage = styled(Typography)({
	marginTop: '20px',
	marginBottom: '20px',
	color: 'red'
});

const SigningForm = ({
	setOpen,
	signUp,
	setOpenSigningForm
}: {
	setOpen: Dispatch<SetStateAction<boolean>>;
	signUp: boolean;
	setOpenSigningForm: Dispatch<SetStateAction<boolean>>;
}) => {
	const [currProfile, setCurrProfile] = useContext(CurrProfileContext);
	const [
		userRegistrationMutation,
		{
			data: mutationData,
			loading: mutationLoading,
			error: mutationError,
			called: mutationCalled
		}
	] = useMutation(CREATE_NEW_USER_MUTATION);
	const [
		userConnectionQuery,
		{
			data: queryData,
			loading: queryLoading,
			error: queryError,
			called: queryCalled
		}
	] = useLazyQuery(USER_FIND_ONE_BY_CREDENTIALS);
	const [submitResponseMessage, setSubmitResponseMessage] = useState('');
	const [setUserSessionToken] = useMutation(SET_USER_SESSION_TOKEN);

	const sendSignUpRequest = async (userCredentials: UserSubmit) => {
		await userRegistrationMutation({
			variables: { newUser: userCredentials }
		}).catch(() => {
			setSubmitResponseMessage('Error: login already taken.');
		});
	};

	const sendSignInRequest = async (userCredentials: UserSubmit) => {
		await userConnectionQuery({
			variables: {
				login: userCredentials.login,
				password: userCredentials.password
			}
		}).catch((e) => {});
		if (queryError) {
			setSubmitResponseMessage('Error: wrong login or password.');
		}
	};

	const handleUserSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const userCredentials: UserSubmit = {
			login: (
				event.currentTarget.elements.namedItem(
					'login'
				) as HTMLInputElement
			).value,
			password: (
				event.currentTarget.elements.namedItem(
					'password'
				) as HTMLInputElement
			).value
		};
		signUp
			? sendSignUpRequest(userCredentials)
			: sendSignInRequest(userCredentials);
	};

	const createCurrProfileFromRequestData = async (requestData: any) => {
		const connectedUser: CurrProfile = {
			isLoggedIn: true,
			login: requestData.login,
			id: requestData.id,
			sessionToken: await setNewSession(
				requestData.id,
				setUserSessionToken
			),
			sessionChecked: true
		};
		return connectedUser;
	};

	const createCurrProfileFromUserConnection = async () => {
		let connectedUser: CurrProfile = currProfile;
		if (queryData) {
			connectedUser = await createCurrProfileFromRequestData(
				queryData.findOneUserByCredentials
			);
		} else if (mutationData) {
			connectedUser = await createCurrProfileFromRequestData(
				mutationData.createNewUser
			);
		}
		setCurrProfile(connectedUser);
		localStorage.setItem(
			LocalStorageCurrSession,
			JSON.stringify(connectedUser)
		);
		setOpenSigningForm(false);
		setOpen(false);
	};

	useEffect(() => {
		if (
			(mutationCalled && !mutationLoading && !mutationError) ||
			(queryCalled && !queryLoading && !queryError)
		) {
			createCurrProfileFromUserConnection();
		}
	});

	return (
		<>
			<UserDialogTitle title={signUp ? 'Create account.' : 'Log in.'} />
			<Typography
				variant="body1"
				sx={{ textAlign: 'center', margin: '20px 0px 60px 0px' }}
			>
				Enter your login and password to{' '}
				{signUp ? 'create your account.' : 'log in.'}
			</Typography>
			<form onSubmit={handleUserSubmit}>
				<SigningFormContainer>
					<TextFieldSigning type="login" />
					<TextFieldSigning type="password" />
					<SubmitButton type="submit" variant="contained">
						Submit
					</SubmitButton>
				</SigningFormContainer>
			</form>
			<ErrorMessage>{submitResponseMessage}</ErrorMessage>
		</>
	);
};

export default SigningForm;
