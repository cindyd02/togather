import { members, useChatrooms } from "@/hook/chats";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./index.css"

const Pic = ({ id }) => {
	return (
		<div className="w-10">
			<img src={members[id] ? members[id].picture : undefined} alt="" />
		</div>
	);
};

const Chat = () => {
	const { roomId } = useParams();
	const { chatRooms, sendMessage } = useChatrooms();
	const [msg, setMsg] = useState("");

	console.log(roomId, chatRooms);
	const chatRoom = chatRooms.find((room) => room.id === roomId);

	if (!chatRoom) {
		return <div>No chat selected.</div>;
	}

	return (
		<div className="h-[600px] flex flex-col gap-4 p-4 inset-shadow-sm inset-shadow-gray-500 rounded-3xl">
			<h2>{chatRoom.roomName}</h2>
			<div className="flex flex-col gap-4 h-full overflow-y-scroll pr-5">
				{chatRoom.messages.map((msg, index) =>
					msg.sender === "me" ? (
						<div key={index}>
							<div className="flex justify-end gap-2 text-right">
								<div>
									<span className="text-gray-600">{msg.sender}</span>
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
								<span className="text-gray-600">{msg.sender}</span>
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
