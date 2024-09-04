import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin(email, password, role);
    navigate('/');
  };

  return (
    <div className='container'>
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <img src="/image1.png" alt="Login" className="login-image" />
        <h2>Login</h2>
        <div className="radio-container">
          <label>
            <input 
              type="radio" 
              value="student" 
              checked={role === 'student'} 
              onChange={() => setRole('student')} 
            />
            Student
          </label>
          <label>
            <input 
              type="radio" 
              value="alumni" 
              checked={role === 'alumni'} 
              onChange={() => setRole('alumni')} 
            />
            Alumni
          </label>
        </div>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <button type="submit" className="login-btn">Submit</button>
      </form>
    </div>
    </div>
  );
};

export default Login;
