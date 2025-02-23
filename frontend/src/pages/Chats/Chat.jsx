import { members, useChatrooms } from "@/hook/chats";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import { Fragment } from "react";

const Pic = ({ id }) => {
	return (
		<div className="w-10">
			<img src={members[id] ? members[id].picture : undefined} alt="" />
		</div>
	);
};

const keys = [
	"username",
	"age",
	"location",
	"pronouns",
	"gender",
	"about",
	"preferredGender",
];

const UserModal = ({ id, children }) => {
	const user = members[id];
	const [show, setShow] = useState(false);

	if (!user) return <></>;

	return (
		<div>
			<div onClick={() => setShow(true)}>{children}</div>
			{show && (
				<div className="modal absolute">
					<div className="modal-content">
						<div className="flex justify-end">
							<button onClick={() => setShow(false)}>X</button>
						</div>
						<div className="w-20 mx-auto mb-3">
							<img src={members[id] ? members[id].picture : undefined} alt="" />
						</div>
						<div className="flex gap-4">
							<div className="grid grid-cols-2 gap-1 text-left">
								{keys.map((key) => (
									<Fragment key={key}>
										<label>{key}</label>
										<div>{user[key]}</div>
									</Fragment>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

const Chat = () => {
	const { roomId } = useParams();
	const { chatRooms, sendMessage } = useChatrooms();
	const [msg, setMsg] = useState("");

	const chatRoom = chatRooms.find((room) => room.id === roomId);

	if (!chatRoom) {
		return <div>No chat selected.</div>;
	}

	return (
		<div className="h-[600px] flex flex-col gap-4 p-4 inset-shadow-sm inset-shadow-gray-500 rounded-3xl">
			<h2>
				{chatRoom.roomName}: {chatRoom.topic}
			</h2>
			<div className="flex gap-2">
				{chatRoom.members.map((user) => (
					<UserModal id={user} key={user}>
						<div className="flex items-center">
							<Pic key={members[user].username} id={user} />{" "}
							{members[user].username}
						</div>
					</UserModal>
				))}
			</div>
			<div className="flex flex-col gap-4 h-full overflow-y-scroll pr-5">
				{chatRoom.messages.map((msg, index) =>
					msg.sender === "me" ? (
						<div key={index}>
							<div className="flex justify-end gap-2 text-right">
								<div>
									<span className="text-gray-600">Me</span>
									<div
										className="rounded-xl bg-blue-500 text-gray-50 p-2"
										dangerouslySetInnerHTML={{ __html: msg.message }}
									></div>
								</div>
							</div>
						</div>
					) : (
						<div key={index} className={"flex items-end gap-2 "}>
							<Pic id={msg.sender} />
							<div>
								<span className="text-gray-600">
									{members[msg.sender].username ?? msg.sender}
								</span>
								<div
									className="rounded-xl bg-blue-100 p-2"
									dangerouslySetInnerHTML={{ __html: msg.message }}
								></div>
							</div>
						</div>
					)
				)}
			</div>
			<div className="flex gap-4">
				<input
					type="text"
					className="w-full rounded-lg p-2 bg-gray-100"
					value={msg}
					onChange={(e) => setMsg(e.target.value)}
					placeholder="Enter Message..."
				/>
				<button
					disabled={!msg}
					onClick={() => {
						sendMessage(msg, roomId);
						setMsg("");
					}}
				>
					Send
				</button>
			</div>
		</div>
	);
};

export default Chat;
