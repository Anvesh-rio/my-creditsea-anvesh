import React, { useState } from 'react';
import './UserPanel.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const UserPanel = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [loginData, setLoginData] = useState({ gmail: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', gmail: '', password: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  console.log('Login:', loginData);

  try {
    const response = await fetch('https://backend-creadisea.onrender.com/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const result = await response.json();
    console.log("line 27",result.data)


    if (result.success) {
      localStorage.setItem('userId', result.data._id);
      localStorage.setItem('userName', result.data.name);
      // After login, store like this:
      localStorage.setItem(
        'user',
        JSON.stringify({ name: '', role: 'user' }) // or 'user'
      );

      navigate('/userdashboard');
    } else {
      alert('Login failed: ' + result.message);
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Server error during login');
  }
};


const handleRegister = async (e) => {
  e.preventDefault();
  console.log('Register:', registerData);

  try {
    const response = await fetch('https://backend-creadisea.onrender.com/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    });

    const result = await response.json();
    console.log("Register response:", result);

    if (result.success) {
      alert("Registration successful! Please log in.");
      setShowRegister(false); // Switch to login form
    } else {
      alert("Registration failed: " + result.message);
    }
  } catch (error) {
    console.error('Register error:', error);
    alert('Server error during registration');
  }
};


  return (
    <div className="user-panel">
      <div className="card-container">
        {showRegister ? (
          <form onSubmit={handleRegister} className="form-box">
            <input
              type="text"
              placeholder="Full Name"
              value={registerData.name}
              onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={registerData.gmail}
              onChange={(e) => setRegisterData({ ...registerData, gmail: e.target.value })}
              required
            />
            <div className="password-input">
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Password"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            <button type="submit">Register</button>
            <p className="toggle-link" onClick={() => setShowRegister(false)}>
              Already have an account? Login
            </p>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="form-box">
            <input
              type="email"
              placeholder="Email"
              value={loginData.gmail}
              onChange={(e) => setLoginData({ ...loginData, gmail: e.target.value })}
              required
            />
            <div className="password-input">
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            <button type="submit">Login</button>
            <p className="toggle-link" onClick={() => setShowRegister(true)}>
              Sign up?
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserPanel;
