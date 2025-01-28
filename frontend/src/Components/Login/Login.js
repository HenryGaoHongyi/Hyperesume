import React, { useState } from 'react';
import './Login.css';
import errorIcon from '../../Assets/tooltip-warning-error-icon.png';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setUser } from '../../redux/reducers/userSlice';
import Navbar from '../Navbar/Navbar';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // To prevent multiple submissions
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateUsername = (value) => {
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!value) {
            setUsernameError('Username is required');
            return false;
        }
        if (!usernameRegex.test(value)) {
            setUsernameError('Only letters, numbers, and underscores are allowed');
            return false;
        }
        if (value.length < 3) {
            setUsernameError('Username must be at least 3 characters');
            return false;
        }
        setUsernameError('');
        return true;
    };

    const validatePassword = (value) => {
        if (!value) {
            setPasswordError('Password is required');
            return false;
        }
        // Uncomment and adjust the following lines for password validation
        // if (value.length < 8) {
        //     setPasswordError('Password must be at least 8 characters');
        //     return false;
        // }
        setPasswordError('');
        return true;
    };

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        setUsername(value);
        validateUsername(value);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        validatePassword(value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const isUsernameValid = validateUsername(username);
        const isPasswordValid = validatePassword(password);

        if (!isUsernameValid || !isPasswordValid) {
            return;
        }

        if (isSubmitting) {
            // Prevent multiple submissions
            return;
        }

        setIsSubmitting(true);
        setSubmitError('');

        try {
            const response = await fetch('http://localhost:8081/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // crucial for session cookies
                body: JSON.stringify({ username, password })
            });

            console.log('Status:', response.status);
            // Convert headers to array for easier logging
            const headersArray = [];
            for (let pair of response.headers.entries()) {
                headersArray.push(pair);
            }
            console.log('Headers:', headersArray);

            let data;
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text();
            }
            console.log('Response Body:', data);

            if (response.ok) {
                if (typeof data === 'string') {
                    // If response is not JSON, handle accordingly
                    throw new Error('Unexpected response format');
                }

                dispatch(setUser({
                    isAuthenticated: true,
                    ...data
                }));

                // Now redirect based on role
                if (data.role === 'ROLE_ADMIN') {
                    navigate('/admin');
                } else if (data.role === 'ROLE_USER') {
                    navigate('/profile');
                } else {
                    navigate('/login?error');
                }
            } else {
                if (typeof data === 'object' && data.message) {
                    setSubmitError(data.message);
                } else if (typeof data === 'string') {
                    setSubmitError(data);
                } else {
                    setSubmitError('Login failed');
                }
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setSubmitError('Login failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className='parent-container-auth'>
                <div className="login-container">
                    <h1 className="login-title">Login</h1>
                    <form onSubmit={handleLogin} className="login-form">
                        <div className={`form-group ${usernameError ? 'error' : ''}`}>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={handleUsernameChange}
                                className="form-input"
                                placeholder="Enter username"
                            />
                            {usernameError && <div className="tooltip"><img src={errorIcon} alt="error" />{usernameError}</div>}
                        </div>
                        <div className={`form-group ${passwordError ? 'error' : ''}`}>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="form-input"
                                placeholder="Enter your password"
                            />
                            {passwordError && <div className="tooltip"><img src={errorIcon} alt="error" />{passwordError}</div>}
                        </div>
                        {submitError && <div className="error-message">{submitError}</div>}
                        <button
                            type="submit"
                            className="login-button"
                            disabled={!!usernameError || !!passwordError || isSubmitting}
                        >
                            {isSubmitting ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    <p className="signup-text">
                        Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Login;
