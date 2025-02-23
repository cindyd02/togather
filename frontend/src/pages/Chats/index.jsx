import { chatStore, members, useChatrooms } from "@/hook/chats";
import { TbTrash } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";

const Chats = () => {
	const { chatRooms } = useChatrooms();
	return (
		<div className="grid grid-cols-[3fr_5fr] gap-5 p-20">
			<div className="bg-amber-50 p-4 rounded-2xl h-150">
				<h2 className="text-2xl mb-5">Chats</h2>
				<div className="h-120 overflow-y-auto overflow-hidden">
					{chatRooms.map((room) => (
						<NavLink
							key={room.id}
							to={`${room.id}`}
							className={({ isActive }) => (isActive ? "active-chat" : "")}
						>
							<div className="my-5 p-2 border-b">
								<div className="flex w-full gap-4 items-center">
									<label>
										{room.roomName}: {room.topic}
									</label>

									<div className="flex">
										{room.members.map((user) => (
											<div key={members[user].username} className="w-9 -ml-3">
												<img
													src={members[user].picture}
													alt={members[user].username}
												/>
											</div>
										))}
									</div>
									<div
										className="ml-auto"
										onClick={(e) => {
											e.stopPropagation();
											chatStore.deleteRoom(room.id);
										}}
									>
										<TbTrash className="ml-auto text-red-400" />
									</div>
								</div>
								<div className="line-clamp-2">
									{room.messages.at(-1).message}
								</div>
							</div>
						</NavLink>
					))}
				</div>
			</div>
			<div>
				<Outlet />
			</div>
		</div>
	);
};

export default Chats;
