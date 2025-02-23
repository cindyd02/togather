import { useSyncExternalStore } from "react";

const users = [
	{
		username: "cindy123",
		password: "togather",
		age: 22,
		location: "New York",
		pronouns: "she/her",
		gender: "female",
		about: "Love to visit art museums and try new foods!",
	},
];

class UserStore {
	user = null;
	subscribers = new Set();

	subscribe = (notify) => {
		this.subscribers.add(notify);
		return () => {
			this.subscribers.delete(notify);
		};
	};

	notify = () => {
		this.subscribers.forEach((notify) => notify());
	};

	login = (username, password) => {
		const user = users.find((user) => user.username === username);
		if (user && user.password === password) {
			this.user = user;
			this.notify();
			return {
				variant: "ok",
			};
		}
		return {
			variant: "error",
			message: "Invalid login!",
		};
	};

	setUser = (userdata) => {
		this.user = userdata;
		this.notify();
	};

	getUser = () => {
		return this.user;
	};

	logout = () => {
		this.user = null;
		this.notify();
	};
}

export const userStore = new UserStore();

export const useUser = () => {
	const user = useSyncExternalStore(userStore.subscribe, userStore.getUser);
	return {
		user,
		login: userStore.login,
		logout: userStore.logout,
	};
};
