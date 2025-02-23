import { userStore, useUser } from "@/hook/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
	const nav = useNavigate();
	const { user } = useUser();
	const [showDetails, setShowDetails] = useState(false);

	const handleLogout = () => {
		userStore.logout();
		nav("/");
	};

	return (
		<div>
			<div className="ml-auto flex gap-5">
				<div>{user.username}</div>
				<button className="underline" onClick={handleLogout}>
					Log out
				</button>
			</div>
			{showDetails && <div>
					
				</div>}
		</div>
	);
};

export default Profile;
