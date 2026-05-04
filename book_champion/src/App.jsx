import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import NotFound from './components/notFound/NotFound';
import Protected from './components/protected/Protected';
import CleanupDemo from './components/cleanupDemo/CleanupDemo';

function App() {
	const [loggedIn, setLoggedIn] = useState(false);

	const handleLogIn = () => {
		setLoggedIn(true);
	};

	const handleLogout = () => {
		setLoggedIn(false);
	};

	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Navigate to="login" />} />
					<Route path="/login" element={<Login onLogin={handleLogIn} />} />
					<Route element={<Protected isSignedIn={loggedIn} />}>
						<Route path="/library/*" element={<Dashboard onLogout={handleLogout} />} />
					</Route>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
			<ToastContainer />
		</div>
	);
}

export default App;
