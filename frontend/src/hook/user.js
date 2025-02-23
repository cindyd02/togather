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
		preferredGender: "male",
	},
];

class UserStore {
	user = null;
	subscribers = new Set();

	constructor() {
		const user = localStorage.getItem("user");
		if (user) {
			this.user = JSON.parse(user);
		}
	}

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
			this.setUser(user);
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
		localStorage.setItem("user", JSON.stringify(userdata));
		this.notify();
	};

	getUser = () => {
		return this.user;
	};

	logout = () => {
		this.setUser(null);
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
