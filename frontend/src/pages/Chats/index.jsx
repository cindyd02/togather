import { useChatrooms } from "@/hook/chats";
import { NavLink, Outlet } from "react-router-dom";

const Chats = () => {
	const { chatRooms } = useChatrooms();
	console.log(chatRooms);
	return (
		<div className="grid grid-cols-[3fr_5fr] gap-5 p-20">
			<div>
				<h2 className="text-2xl mb-5">Chats</h2>
				{chatRooms.map((room) => (
					<NavLink
						key={room.id}
						to={`${room.id}`}
						className={({ isActive }) => (isActive ? "active-chat" : "")}
					>
						<div className="my-5 p-2">
							<div className="flex gap-4 items-center">
								<label>{room.roomName}</label>

								<div className="flex">
									{room.members.map((user) => (
										<div key={user.username} className="w-9 -ml-3">
											<img src={user.picture} alt={user.username} />
										</div>
									))}
								</div>
							</div>
							<div className="line-clamp-2">{room.messages.at(-1).message}</div>
						</div>
					</NavLink>
				))}
			</div>
			<div>
				<Outlet />
			</div>
		</div>
	);
};

export default Chats;
