// external components
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// internal components
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />

					<Route path="user/login" element={<Login />} />

					<Route path="home" element={<h1>Home Page</h1>} />

					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</BrowserRouter>
			<ToastContainer />
		</>
	);
}

export default App;
