"use client";

import { apiUrl } from "@/lib/utils";
import axios from "axios";
import React, { useContext, useState, createContext, useEffect } from "react";
import { toast } from "sonner";

interface IUser {
	_id: string;
	email: string;
}

interface IUserContext {
	user: IUser | null;
	setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
	loading: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = createContext<IUserContext>({
	user: null,
	setUser: () => {},
	loading: true,
	setIsLoggedIn: () => false,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<IUser | null>(null);
	const [loading, setLoading] = useState(true);
	const [loggedIn, setIsLoggedIn] = useState(false);

	const getCurrentUser = async () => {
		try {
			const userToken = localStorage.getItem("token");
			if (userToken) {
				const response = await axios.get(`${apiUrl}/auth/current-user`, {
					headers: { Authorization: `Bearer ${userToken}` },
				});
				if (response.status === 200) {
					setUser(response.data.user);
				}
			} else {
				setUser(null);
			}
		} catch (error) {
			toast.error("Failed to get current user data");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getCurrentUser();
	}, [loggedIn]);

	return (
		<UserContext.Provider value={{ user, setUser, loading, setIsLoggedIn }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	return useContext(UserContext);
};

export default UserProvider;
