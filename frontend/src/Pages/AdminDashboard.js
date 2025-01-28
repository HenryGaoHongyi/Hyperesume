// src/pages/AdminDashboard.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './CSS/AdminDashboard.css';
import Navbar from '../Components/Navbar/Navbar';

function AdminDashboard() {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const isAuthenticated = user.isAuthenticated;
    const userRole = user.userInfo?.role;

    const [users, setUsers] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [editingUser, setEditingUser] = useState(null);
    const [editFormData, setEditFormData] = useState({
        username: '',
        role: '',
        profile: {
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        }
    });

    useEffect(() => {
        // Since route is protected, additional authentication checks are optional
        // Fetch users from the backend
        fetch('http://localhost:8081/api/admin/users', {
            method: 'GET',
            credentials: 'include' // Include session cookie
        })
            .then(response => {
                if (response.redirected && response.url.endsWith('/login')) {
                    throw new Error('Not authenticated, got redirected to /login');
                }
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Expected JSON but got something else');
                }
                return response.json();
            })
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                console.error(error);
                setErrorMessage(error.message);
            });
    }, []);

    const handleEdit = (user) => {
        setEditingUser(user.id);
        setEditFormData({
            username: user.username,
            role: user.role,
            profile: {
                firstName: user.profile?.firstName || '',
                lastName: user.profile?.lastName || '',
                email: user.profile?.email || '',
                phone: user.profile?.phone || ''
            }
        });
    };

    const handleCancelEdit = () => {
        setEditingUser(null);
        setEditFormData({
            username: '',
            role: '',
            profile: {
                firstName: '',
                lastName: '',
                email: '',
                phone: ''
            }
        });
    };

    const handleInputChange = (e, field, isProfile = false) => {
        if (isProfile) {
            setEditFormData(prev => ({
                ...prev,
                profile: {
                    ...prev.profile,
                    [field]: e.target.value
                }
            }));
        } else {
            setEditFormData(prev => ({
                ...prev,
                [field]: e.target.value
            }));
        }
    };

    const handleSaveEdit = (userId) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(editFormData.profile.email)) {
            setErrorMessage('Please enter a valid email address');
            setTimeout(() => setErrorMessage(''), 3000);
            return;
        }

        // Make a PUT request to update the user in the backend
        fetch(`http://localhost:8081/api/admin/users/${userId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: editFormData.username,
                role: editFormData.role,
                profile: editFormData.profile // Include profile fields if backend expects them
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update user');
                }
                return response.json(); // assuming backend returns updated user
            })
            .then(updatedUser => {
                setUsers(prevUsers =>
                    prevUsers.map(user =>
                        user.id === userId
                            ? {
                                ...user,
                                username: updatedUser.username,
                                role: updatedUser.role,
                                profile: {
                                    ...user.profile,
                                    ...updatedUser.profile
                                }
                            }
                            : user
                    )
                );

                setSuccessMessage('User information updated successfully');
                setTimeout(() => setSuccessMessage(''), 3000);
                setEditingUser(null);
            })
            .catch(error => {
                console.error(error);
                setErrorMessage('Failed to update user');
            });
    };

    const handleDelete = (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) {
            return;
        }

        // Make a DELETE request to remove the user in the backend
        fetch(`http://localhost:8081/api/admin/users/${userId}`, {
            method: 'DELETE',
            credentials: 'include'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete user');
                }
                return response.json(); // assuming backend returns success message
            })
            .then(() => {
                setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
                setSuccessMessage('User successfully deleted');
                setTimeout(() => setSuccessMessage(''), 3000);
            })
            .catch(error => {
                console.error(error);
                setErrorMessage('Failed to delete user');
            });
    };

    const handleRoleChange = (userId, newRole) => {
        const adminCount = users.filter(user => user.role === 'ROLE_ADMIN').length;
        const targetUser = users.find(user => user.id === userId);

        if (adminCount === 1 && targetUser.role === 'ROLE_ADMIN' && newRole === 'ROLE_USER') {
            setErrorMessage('Cannot remove the last admin role');
            setTimeout(() => setErrorMessage(''), 3000);
            return;
        }

        // Update role in backend as well
        fetch(`http://localhost:8081/api/admin/users/${userId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: targetUser.username,
                role: newRole,
                profile: targetUser.profile // include profile to avoid overwriting
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update role');
                }
                return response.json(); // assuming backend returns updated user
            })
            .then(updatedUser => {
                setUsers(prevUsers =>
                    prevUsers.map(user =>
                        user.id === userId
                            ? { ...user, role: updatedUser.role }
                            : user
                    )
                );
                setSuccessMessage(`Role updated successfully for ${targetUser.username}`);
                setTimeout(() => setSuccessMessage(''), 3000);
            })
            .catch(error => {
                console.error(error);
                setErrorMessage('Failed to update role');
            });
    };

    const renderUserRow = (user) => {
        if (editingUser === user.id) {
            return (
                <tr key={user.id} className="editing-row">
                    <td>
                        <input
                            type="text"
                            value={editFormData.username}
                            onChange={(e) => handleInputChange(e, 'username')}
                            className="edit-input"
                        />
                    </td>
                    <td>
                        <select
                            value={editFormData.role}
                            onChange={(e) => handleInputChange(e, 'role')}
                            className="role-select"
                        >
                            <option value="ROLE_USER">ROLE_USER</option>
                            <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                        </select>
                    </td>
                    <td>
                        <input
                            type="text"
                            value={editFormData.profile.firstName}
                            onChange={(e) => handleInputChange(e, 'firstName', true)}
                            className="edit-input"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={editFormData.profile.lastName}
                            onChange={(e) => handleInputChange(e, 'lastName', true)}
                            className="edit-input"
                        />
                    </td>
                    <td>
                        <input
                            type="email"
                            value={editFormData.profile.email}
                            onChange={(e) => handleInputChange(e, 'email', true)}
                            className="edit-input"
                        />
                    </td>
                    <td>
                        <input
                            type="tel"
                            value={editFormData.profile.phone}
                            onChange={(e) => handleInputChange(e, 'phone', true)}
                            className="edit-input"
                        />
                    </td>
                    <td className="action-column">
                        <button onClick={() => handleSaveEdit(user.id)} className="save-button">Save</button>
                        <button onClick={handleCancelEdit} className="cancel-button">Cancel</button>
                    </td>
                </tr>
            );
        }

        return (
            <tr key={user.id}>
                <td>{user.username}</td>
                <td>
                    <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        className="role-select"
                    >
                        <option value="ROLE_USER">ROLE_USER</option>
                        <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                    </select>
                </td>
                <td>{user.profile?.firstName || ''}</td>
                <td>{user.profile?.lastName || ''}</td>
                <td>{user.profile?.email || ''}</td>
                <td>{user.profile?.phone || ''}</td>
                <td className="action-column">
                    <button onClick={() => handleEdit(user)} className="edit-button">Edit</button>
                    <button onClick={() => handleDelete(user.id)} className="delete-button">Delete</button>
                </td>
            </tr>
        );
    };

    return (
        <>
            <Navbar />
            <div className="admin-container">
                <h1>Admin Dashboard</h1>
                <p>Welcome, Admin!</p>

                <h2>Manage Users</h2>
                {successMessage && <p className="success-message">Success: {successMessage}</p>}
                {errorMessage && <p className="error-message">Error: {errorMessage}</p>}

                <table className="admin-table">
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => renderUserRow(user))}
                    {users.length === 0 && (
                        <tr>
                            <td colSpan="7" className="empty-message">No users found.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default AdminDashboard;
