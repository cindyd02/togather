import { useSyncExternalStore } from "react";

class MatchStore {
	match = null;
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

	setMatch = (chatRoom) => {
		this.match = chatRoom;
		this.notify();
	};

	getMatch = () => {
		return this.match;
	};
}

export const matchStore = new MatchStore();

export const useMatch = () => {
	const match = useSyncExternalStore(matchStore.subscribe, matchStore.getMatch);
	return {
		match,
	};
};
