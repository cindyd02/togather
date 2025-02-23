import "./index.css";
import { useState } from "react";
import LoginView from "./LoginView";
import SignupView from "./SignupView";

const Login = () => {
	const [view, setView] = useState("login");

	return (
		<div className="home-container">
			<div className="flex">
				<img src="/favicon.png" alt="logo" className="w-30 h-30" />
				<img
					src="/assets/imgs/user3.png"
					alt="logo"
					className="w-30 h-30 -ml-10 z-10"
				/>
				<img
					src="/assets/imgs/user2.png"
					alt="logo"
					className="w-30 h-30 -ml-10"
				/>
			</div>
			<h1 className="typewriter">
				<span>Let&apos;s Explore toGather!</span>
			</h1>
			<p>
				New to the city? Join us to find events near you and connect with others
				who want to explore too!
			</p>
			<div className="border rounded-xl p-3">
				{view === "login" && <LoginView />}
				{view === "signup" && <SignupView />}
			</div>
			<div>
				{view === "login" && (
					<button onClick={() => setView("signup")} className="inline">
						Don&apos;t have an account?{" "}
						<span className="underline">Sign up</span>!
					</button>
				)}
				{view === "signup" && (
					<button onClick={() => setView("login")} className="inline">
						Back to <span className="underline">login</span>.
					</button>
				)}
			</div>
		</div>
	);
};

export default Login;
