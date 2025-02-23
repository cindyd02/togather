import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import { IconContext } from "react-icons";
import Home from "./pages/Home";
import Chats from "./pages/Chats";
import Chat from "./pages/Chats/Chat";

const App = () => {
	return (
		<IconContext.Provider
			value={{
				style: {
					margin: "auto 2px",
				},
			}}
		>
			<BrowserRouter>
				<AnimatePresence mode="wait">
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route element={<Layout />}>
							<Route index element={<Home />} />
							<Route path="chats" element={<Chats />}>
								<Route path=":roomId" element={<Chat />} />
							</Route>
							<Route path="profile" element={<Profile />} />
						</Route>
						{/* <Route path="/events" element={<EventPage />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/sign-in" element={<Signing />} />
						<Route path="/user-identity" element={<UserIdentity />} />
						<Route path="/preferences" element={<UserPreferences />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/swiping" element={<Swiping />} /> */}
					</Routes>
				</AnimatePresence>
			</BrowserRouter>
		</IconContext.Provider>
	);
};

export default App;
