import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './registration.css';

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    salary: '',
    age: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/register', formData);
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert('Error registering user');
    }
  };

  return (
    <form className = "Registrationform" onSubmit={handleSubmit}>
      <p className = "RegisterText">Registration form</p>
      <input name="first_name" placeholder="First Name" onChange={handleChange} />
      <input name="last_name" placeholder="Last Name" onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <input name="salary" placeholder="Salary" onChange={handleChange} />
      <input name="age" placeholder="Age" onChange={handleChange} />
      <button type="submit">register</button>
      <p>
        Already have an account? click <Link to="/signin" className="heretext"> here </Link> to sign in!
      </p>
      
    </form>
  );
};

export default Register;