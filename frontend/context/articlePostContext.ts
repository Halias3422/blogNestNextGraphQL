import { createContext, Dispatch, SetStateAction } from 'react';

export const ArticlePostedContext = createContext<
	[boolean, Dispatch<SetStateAction<boolean>>]
>({} as any);
export const ArticlePostSuccessfulContext = createContext<
	[boolean, Dispatch<SetStateAction<boolean>>]
>({} as any);
