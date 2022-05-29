// To make sure we only request data from the browser,
// we have to ensure that the components using hooks
// are only rendered on the client. We can accomplish
// this by creating a component that only renders its
// children in the browser and not on the server.
// https://www.joshwcomeau.com/react/the-perils-of-rehydration/
import { ReactNode, useEffect, useState } from 'react';

const ClientOnly = ({ children, ...delegated }: { children: ReactNode }) => {
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	if (!hasMounted) {
		return null;
	}

	return <div {...delegated}>{children}</div>;
};

export default ClientOnly;
