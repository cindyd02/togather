import { useUser } from "@/hook/user";
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Header from "../Header";
import "./index.css";

const Layout = () => {
	const nav = useNavigate();
	const { user } = useUser();

	useEffect(() => {
		if (!user) {
			nav("/login");
		}
	}, [nav, user]);

	return (
		<div className="w-full h-screen bg-amber-50 flex justify-center items-center">
			<div className="flex flex-col gap-0">
				<Header />
				<div className="folder">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Layout;
