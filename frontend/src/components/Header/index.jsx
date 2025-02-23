import { useUser } from "@/hook/user";
import { Link, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import { useEffect } from "react";
import "./index.css";

const Header = () => {
	const { user } = useUser();
	const nav = useNavigate();

	useEffect(() => {
		console.log("User: ", user);
		if (user === null) {
			nav("/");
		}
	}, [user]);

	return (
		<div className="flex px-10 py-3 border fixed top-0 w-full bg-white z-10">
			<Link to="/" className="logo-link">
				<h1 className="logo">toGather</h1>
			</Link>

			{user && <Profile />}
		</div>
	);
};

export default Header;
