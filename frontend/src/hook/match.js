import { useSyncExternalStore } from "react";
import { chatStore } from "./chats";
import { eventMessages, eventTopics } from "./events";

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

	clearMatch = () => {
		this.match = null;
		this.notify();
	};
}

export const matchStore = new MatchStore();

const rand = (arr) => {
	if (arr.length === 0) {
		return undefined; // Return undefined for empty arrays
	}
	const randomIndex = Math.floor(Math.random() * arr.length);
	return arr[randomIndex];
};

export let demoMatchTimer = {
	cur: null,
	recentName: null,
};

export const demoMatch = () => {
	const topic = eventTopics[demoMatchTimer.recentName];
	const message = eventMessages[demoMatchTimer.recentName];

	const id = (chatStore.getChat().length + 1).toString();
	const newChat = {
		id,
		roomName: `Room ${id}`,
		topic: topic,
		members: [
			...new Set([
				rand(["alice", "bob", "carl", "jan", "joe"]),
				rand(["alice", "bob", "carl", "jan", "joe"]),
				rand(["alice", "bob", "carl", "jan", "joe"]),
				rand(["alice", "bob", "carl", "jan", "joe"]),
			]),
		],
		messages: [
			{
				sender: "system",
				message: message,
			},
		],
	};

	matchStore.setMatch(newChat);

	setTimeout(() => {
		chatStore.sendMessage(
			"Woah, that sounds awesome! Excited to meet everyone!",
			newChat.id,
			newChat.members[0]
		);
		console.log("Sent message");
	}, 4000);

	chatStore.setChat([...chatStore.getChat(), newChat]);
};

export const useMatch = () => {
	const match = useSyncExternalStore(matchStore.subscribe, matchStore.getMatch);
	return {
		match,
	};
};
