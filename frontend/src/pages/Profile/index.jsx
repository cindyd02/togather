import { userStore, useUser } from "@/hook/user";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import EditField from "@/components/EditField";

const Profile = () => {
	const nav = useNavigate();
	const { user } = useUser();

	const handleLogout = () => {
		userStore.logout();
		nav("/");
	};

	if (!user) {
		return null;
	}

	return (
		<div className="p-20 flex flex-col">
			<h2 className="text-3xl mb-10">Profile</h2>
			<div className="grid grid-cols-[1fr_3fr] gap-1.5 text-md">
				{Object.entries(user)
					.filter(([k]) => !["username", "password"].includes(k))
					.map(([key, value]) => (
						<Fragment key={key}>
							<label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
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
			<button className="mt-10 ml-auto" onClick={handleLogout}>
				Log out
			</button>
		</div>
	);
};

export default Profile;
