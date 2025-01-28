import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * @param {React.Component} component - The component to render if access is granted.
 * @param {Array<string>} roles - An array of roles that are allowed to access the route.
 * @returns {React.Component} - The original component or a Navigate component redirecting to home/login.
 */
function ProtectedRoute({ component: Component, roles }) {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const userRole = useSelector(state => state.user.userInfo?.role);

    if (!isAuthenticated) {
        // If not authenticated, redirect to login
        return <Navigate to="/login" replace />;
    }

    if (roles && !roles.includes(userRole)) {
        // If authenticated but role not authorized, redirect to home or an unauthorized page
        return <Navigate to="/" replace />;
    }

    // If authenticated and authorized, render the component
    return <Component />;
}

export default ProtectedRoute;
