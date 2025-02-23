import { NavLink } from "react-router-dom";
import "./index.css";

const Tab = ({ to, label }) => {
	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				isActive ? "tab tab-active" : "tab tab-inactive"
			}
		>
			{label}
		</NavLink>
	);
};

const Header = () => {
	return (
		<div className="flex">
			<Tab to="/" label="Home" />
			<Tab to="/chats" label="Chats" />
			<Tab to="/profile" label="Profile" />
			<label className="fixed top-4 left-4 text-2xl">toGather</label>
		</div>
	);
};

export default Header;
