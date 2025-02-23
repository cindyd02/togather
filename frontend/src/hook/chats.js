import { useSyncExternalStore } from "react";

export const members = {
	system: {
		picture: undefined,
	},
	joe: {
		username: "Joe",
		picture: "/assets/imgs/user1.png",
		age: 22,
		location: "New York",
		pronouns: "he/him",
		gender: "male",
		about: "Love to visit art museums and try new foods!",
		preferredGender: "",
	},
	alice: {
		username: "Alice",
		picture: "/assets/imgs/user2.png",
		age: 22,
		location: "New York",
		pronouns: "she/her",
		gender: "female",
		about: "Love to visit art museums and try new foods!",
		preferredGender: "",
	},
	bob: {
		username: "Bob",
		picture: "/assets/imgs/user3.png",
		age: 22,
		location: "New York",
		pronouns: "he/him",
		gender: "male",
		about: "Love to visit art museums and try new foods!",
		preferredGender: "",
	},
	carl: {
		username: "Carl",
		picture: "/assets/imgs/user4.png",
		age: 22,
		location: "New York",
		pronouns: "he/him",
		gender: "male",
		about: "Love to visit art museums and try new foods!",
		preferredGender: "",
	},
	jan: {
		username: "Jan",
		picture: "/assets/imgs/user5.png",
		age: 22,
		location: "New York",
		pronouns: "she/her",
		gender: "female",
		about: "Love to visit art museums and try new foods!",
		preferredGender: "",
	},
};

const defaultChats = [
	{
		id: "1",
		roomName: "Room 1",
		members: [members.joe, members.alice, members.jan],
		messages: [
			{
				sender: "system",
				message:
					"Hey all! Everyone here has expressed interest in <strong>art</strong> and <strong>food</strong>. There is an upcoming wine and art event in New York City: <strong>Wine & Art in the Park</strong>. Let's get planning!",
			},
			{
				sender: "joe",
				message:
					"Hey everyone! I'm Joe. I love visiting art museums and trying new foods. Looking forward to the event!",
			},
			{
				sender: "alice",
				message:
					"Hi Joe! I'm Alice. I also love art and food. Can't wait to meet everyone at the event!",
			},
			{
				sender: "jan",
				message:
					"Hi everyone, I'm Jan. Looking forward to planning this event with you all!",
			},
		],
	},
	{
		id: "2",
		roomName: "Room 2",
		members: [members.bob, members.carl],
		messages: [
			{
				sender: "system",
				message:
					"Hey all! Everyone here has expressed interest in <strong>startups</strong>. There is an upcoming startup event in New York City: <strong>Startup Summit 2023</strong>. Let's plan to go together!",
			},
			{
				sender: "bob",
				message:
					"Hi everyone! I'm Bob. I'm passionate about technology and innovation. Looking forward to our discussions!",
			},
			{
				sender: "carl",
				message:
					"Hello! I'm Carl. Excited to talk about the latest tech trends with you all!",
			},
		],
	},
	{
		id: "3",
		roomName: "Room 3",
		members: [members.joe, members.alice, members.jan],
		messages: [
			{
				sender: "system",
				message:
					"Hey all! Everyone here has expressed interest in <strong>travel experiences</strong>. There is an upcoming travel event in New York City: <strong>Travel Expo 2023</strong>. Let's get planning!",
			},
			{
				sender: "joe",
				message:
					"Hey everyone! I'm Joe. I love traveling and exploring new places. Looking forward to the event!",
			},
			{
				sender: "alice",
				message:
					"Hi Joe! I'm Alice. I also love traveling. Can't wait to meet everyone at the event!",
			},
			{
				sender: "jan",
				message:
					"Hi everyone, I'm Jan. Looking forward to planning this travel event with you all!",
			},
		],
	},
];

class ChatStore {
	chatRooms = null;
	subscribers = new Set();

	constructor() {
		const chat = localStorage.getItem("chat");
		if (false) {
			this.chatRooms = JSON.parse(chat);
		} else {
			this.chatRooms = defaultChats;
			localStorage.setItem("chat", JSON.stringify(defaultChats));
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

	getChat = () => {
		return this.chatRooms;
	};

	sendMessage = (msg, roomId) => {
		const chatData = this.chatRooms;
		console.log(chatData, roomId);
		const room = chatData.find((room) => room.id === roomId);
		const newMessage = {
			sender: "me",
			message: msg,
		};
		room.messages = [...room.messages, newMessage];
		this.setChat(chatData);
	};

	setChat = (chatData) => {
		this.chatRooms = chatData;
		localStorage.setItem("chat", JSON.stringify(chatData));
		this.notify();
	};
}

export const chatStore = new ChatStore();

export const useChatrooms = () => {
	const chatRooms = useSyncExternalStore(
		chatStore.subscribe,
		chatStore.getChat
	);
	return {
		chatRooms,
		sendMessage: chatStore.sendMessage,
	};
};
