import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signin.css'

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5050/checkUserCredentials', {
        username, 
        password
      });

      if (res.data.success) { 
        alert('Sign-In Successful');
        navigate('/App');  // Redirect to the app page after successful sign-in
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      alert('Invalid credentials');
    }
  };

  return (
    <form className="SigninPage" onSubmit={handleSubmit}>
      <p>Sign in</p>
      <input
        name="username"
        type="username"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;