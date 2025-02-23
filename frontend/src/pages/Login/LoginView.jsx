import { useNavigate } from "react-router-dom";
import "./index.css";
import { useState } from "react";
import { userStore } from "@/hook/user";

const LoginView = () => {
	const nav = useNavigate();
	const [uname, setUname] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = () => {
		const result = userStore.login(uname, password);
		if (result.variant === "error") {
			alert(result.message);
		} else {
			nav("/");
		}
	};

	return (
		<div className="grid grid-cols-2 text-left">
			<label>Username</label>
			<input
				type="text"
				value={uname}
				placeholder="Username"
				onChange={(e) => setUname(e.target.value)}
				required
			/>
			<label>Password</label>
			<input
				type="password"
				value={password}
				placeholder="Password"
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			<button
				onClick={handleLogin}
				className="col-span-2 mt-3"
				disabled={!uname || !password}
			>
				Login
			</button>
		</div>
	);
};

export default LoginView;
