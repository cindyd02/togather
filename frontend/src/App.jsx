import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { AnimatePresence } from "framer-motion";
import Login from "./pages/Login";

const Layout = () => {
	return (
		<div>
			<Header />
			<Outlet />
		</div>
	);
};

const App = () => {
	return (
		<BrowserRouter>
			<AnimatePresence mode="wait">
				<Routes>
					<Route element={<Layout />}>
						<Route index element={<Login />} />
						<Route path="home" element={<div>Home</div>} />
					</Route>
					{/* <Route path="/events" element={<EventPage />} />
					<Route path="/groupchat" element={<GroupChat />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/sign-in" element={<Signing />} />
					<Route path="/user-identity" element={<UserIdentity />} />
					<Route path="/preferences" element={<UserPreferences />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/swiping" element={<Swiping />} /> */}
				</Routes>
			</AnimatePresence>
		</BrowserRouter>
	);
};

export default App;
