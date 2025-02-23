import { userStore, useUser } from "@/hook/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditField from "../EditField";
import { Fragment } from "react";
import { useEffect } from "react";

const Profile = () => {
	const nav = useNavigate();
	const { user } = useUser();
	const [showDetails, setShowDetails] = useState(false);

	const handleLogout = () => {
		userStore.logout();
		nav("/");
	};

	return (
		<>
			<div className="ml-auto flex gap-5 relative">
				<div onClick={() => setShowDetails((d) => !d)}>👤 {user.username}</div>

				{showDetails && (
					<div className="absolute top-5 right-0 w-100 bg-white p-5 border">
						<div className="grid grid-cols-2 gap-1.5">
							{Object.entries(user).map(([key, value]) => (
								<Fragment key={key}>
									<label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
									<EditField
										placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
										initial={value}
										update={(v) =>
											userStore.setUser({
												...user,
												[key]: v,
											})
										}
									/>
								</Fragment>
							))}
						</div>
						<div className="flex mt-5">
							<button
								className="inline ml-auto"
								onClick={() => setShowDetails(false)}
							>
								Close Menu
							</button>
							<button className="underline" onClick={handleLogout}>
								Log out
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default Profile;
