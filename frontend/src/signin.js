import React, { useState } from 'react';
import axios from 'axios';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/signin', { email, password });
      localStorage.setItem('token', res.data.token); 
      alert('Sign-In Successful');
    } catch (err) {
      console.error(err);
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input name="password" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;