import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Templates from './Pages/Templates';
import ResumeBuilder from './Pages/ResumeBuilder';
import AdminDashboard from './Pages/AdminDashboard';
import ProtectedRoute from './Components/ProtectedRoute';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from './redux/reducers/userSlice';
import Navbar from './Components/Navbar/Navbar';


function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch current user to verify session
        fetch('http://localhost:8081/api/me', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Not authenticated');
                }
            })
            .then(data => {
                dispatch(setUser({
                    isAuthenticated: true,
                    ...data
                }));
            })
            .catch(error => {
                console.error('User fetch error:', error);
                dispatch(clearUser());
            });
    }, [dispatch]);
    return (
        <div className='app'>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home/>} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/templates" element={<Templates />} />
                    <Route path="/resume-builder/:templateId" element={<ResumeBuilder />} />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute
                                component={AdminDashboard}
                                roles={['ROLE_ADMIN']}
                            />
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute
                                component={Profile}
                                roles={['ROLE_USER', 'ROLE_ADMIN']}
                            />
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
