import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../../redux/reducers/userSlice';
import logo from '../../Assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const username = useSelector(state => state.user.userData?.username);
  const userRole = useSelector(state => state.user.userData?.role);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const menuRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = (e) => {
    e.preventDefault();
    dispatch(clearUser());
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
    navigate('/login');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  // Define menu items based on user role
  const getMenuItems = () => {
    if (userRole === 'ROLE_ADMIN') {
      return [
        { path: '/admin', label: 'Dashboard' },
        { path: '/profile', label: 'Profile' }
      ];
    }
    return [
      { path: '/', label: 'Home' },
      { path: '/profile', label: 'Profile' },
      { path: '/templates', label: 'Templates' }
    ];
  };

  return (
    <nav className="navbar" ref={menuRef}>
      <a href={userRole === 'ROLE_ADMIN' ? '/admin' : '/'} className="logo-link">
        <img src={logo} alt="Logo" className="logo" />
      </a>

      <button 
        className="hamburger" 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`auth-section ${isMobileMenuOpen ? 'active' : ''}`}>
        {isAuthenticated ? (
          <>
            <div className="user-menu">
              <div className="welcome-text" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                Welcome {username}! {userRole === 'ROLE_ADMIN' && <span>(Admin)</span>}
              </div>
            </div>
            <div className={`menu-items ${isDropdownOpen ? 'show' : ''}`}>
              {getMenuItems().map((item, index) => (
                <a 
                  key={index}
                  href={item.path}
                  className="menu-item"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.path);
                    setIsDropdownOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </a>
              ))}
              <a 
                href="/signout" 
                className="menu-item" 
                onClick={handleSignOut}
              >
                Sign out
              </a>
            </div>
          </>
        ) : (
          <a 
            href="/login" 
            className="menu-item" 
            onClick={(e) => {
              e.preventDefault();
              handleLoginClick();
            }}
          >
            Log in / Sign up
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;