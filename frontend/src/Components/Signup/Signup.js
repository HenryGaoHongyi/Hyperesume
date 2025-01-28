/**
* @author Arundhati Bandopadhyaya
* @email bandopadhyaya.a@northeastern.edu
* @create date 2024-11-21 12:18:08
* @modify date 2024-11-21 12:18:08
* @desc Created a basic signup page with input validation and CSS styling
*/
import React, { useState } from 'react';
import './Signup.css';
import errorIcon from '../../Assets/tooltip-warning-error-icon.png';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

function Signup() {
 const [formData, setFormData] = useState({
   username: '',
   password: '',
   confirmPassword: ''
 });

 const [errors, setErrors] = useState({
   username: '',
   password: '',
   confirmPassword: ''
 });

 const navigate = useNavigate();

 const validateUsername = (value) => {
   const usernameRegex = /^[a-zA-Z0-9_]+$/;
   if (!value) return 'Username is required';
   if (!usernameRegex.test(value)) return 'Only letters, numbers and underscore allowed';
   if (value.length < 3) return 'Username must be at least 3 characters';
   return '';
 };

 const validatePassword = (value) => {
   // if (value.length < 8 || value.length > 15) return 'Password must be 8-15 characters';
   // if (!/[A-Z]/.test(value)) return 'Password must include an uppercase letter';
   // if (!/[a-z]/.test(value)) return 'Password must include a lowercase letter';
   // if (!/[0-9]/.test(value)) return 'Password must include a number';
   // if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return 'Password must include a special character';
   return '';
 };

 const validateConfirmPassword = (value) => {
   return value !== formData.password ? 'Passwords must match' : '';
 };

 const handleChange = (e) => {
   const { name, value } = e.target;
   setFormData(prev => ({ ...prev, [name]: value }));
   
   let error = '';
   switch(name) {
     case 'username':
       error = validateUsername(value);
       break;
     case 'password':
       error = validatePassword(value);
       break;
     case 'confirmPassword':
       error = validateConfirmPassword(value);
       break;
     default:
       break;
   }
   
   setErrors(prev => ({ ...prev, [name]: error }));
 };

 const handleSubmit = async (e) => {
   e.preventDefault();
   if (!Object.values(errors).some(error => error)) {
     try {
       const response = await fetch('http://localhost:8081/api/register', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           username: formData.username,
           password: formData.password,
           role: 'ROLE_USER'
         })
       });
 
       if (response.ok) {
         console.log("signup successful!");
         console.log(response.text());
         setErrors({ submit: 'Signup successful. Redirecting to login...' });
         setTimeout(() => {
            navigate('/login');
          }, 3000);
       } else {
         const error = await response.text();
         setErrors(prev => ({...prev, submit: error}));
       }
     } catch (error) {
       setErrors(prev => ({...prev, submit: 'Registration failed. Please try again.'}));
     }
   }
 };

 return (
  <>
  <Navbar/>
   <div className='parent-container-auth'>
     <div className="signup-container">
       <h1 className="signup-title">Sign Up</h1>
       <form onSubmit={handleSubmit} className="signup-form">
         <div className={`form-group ${errors.username ? 'error' : ''}`}>
           <input
             type="text"
             name="username"
             value={formData.username}
             onChange={handleChange}
             className="form-input"
             placeholder="Enter username"
           />
           {errors.username && <div className="tooltip"><img src={errorIcon} alt="error"/>{errors.username}</div>}
         </div>

         <div className={`form-group ${errors.password ? 'error' : ''}`}>
           <input
             type="password"
             name="password"
             value={formData.password}
             onChange={handleChange}
             className="form-input"
             placeholder="Enter password"
           />
           {errors.password && <div className="tooltip"><img src={errorIcon} alt="error"/>{errors.password}</div>}
         </div>

         <div className={`form-group ${errors.confirmPassword ? 'error' : ''}`}>
           <input
             type="password"
             name="confirmPassword"
             value={formData.confirmPassword}
             onChange={handleChange}
             className="form-input"
             placeholder="Confirm password"
           />
           {errors.confirmPassword && <div className="tooltip"><img src={errorIcon} alt="error"/>{errors.confirmPassword}</div>}
         </div>

         {errors.submit && <div className="error-message">{errors.submit}</div>}

         <button 
           type="submit" 
           className="signup-button"
           disabled={Object.values(errors).some(error => error) || Object.values(formData).some(value => !value)}
         >
           Sign Up
         </button>
       </form>
       
       <p className="login-text">
         Already have an account? <Link to="/login" className="login-link">Login</Link>
       </p>
     </div>
   </div>
   </>
 );
}

export default Signup;