import { userStore, useUser } from "@/hook/user";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
	const { user } = useUser();
	const nav = useNavigate();

	const handleLogout = () => {
		userStore.logout();
		nav("/");
	};

	return (
		<div className="flex px-10 py-3 border fixed top-0 w-full bg-white z-10">
			<Link to="/" className="logo-link">
				<h1 className="logo">toGather</h1>
			</Link>

			{user && (
				<div className="ml-auto flex gap-5">
					<div>{user.username}</div>
					<button className="underline" onClick={handleLogout}>
						Log out
					</button>
				</div>
			)}
		</div>
	);
};

export default Header;
