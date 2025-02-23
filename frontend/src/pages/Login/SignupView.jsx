import { userStore } from "@/hook/user";
import { Fragment } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
	const nav = useNavigate();
	const [data, setData] = useState({
		username: "",
		password: "",
		age: "",
		location: "",
		pronouns: "",
		gender: "",
		about: "",
		preferredGender: "",
	});

	const handleSignup = () => {
		userStore.setUser(data);
		console.log("Created new user: ", data.username);
		nav("/");
	};

	return (
		<div className="grid grid-cols-2 text-left">
			{Object.entries(data).map(([key, value]) => (
				<Fragment key={key}>
					<label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
					<input
						type={key === "password" ? "password" : "text"}
						value={value}
						placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
						onChange={(e) => setData({ ...data, [key]: e.target.value })}
						required
					/>
				</Fragment>
			))}
			<button
				onClick={handleSignup}
				className="col-span-2 mt-5"
				disabled={!data.username}
			>
				Sign Up
			</button>
		</div>
	);
};

export default Signup;
