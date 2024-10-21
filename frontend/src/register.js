import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './registration.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    age: '',
    salary: '',
    registerday: new Date().toISOString().split('T')[0],  
    signintime: new Date().toISOString().replace('T', ' ').split('.')[0],  
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate(); 

  const handleSubmit = async e => {
    e.preventDefault(); 
    try {
        const res = await axios.post('http://localhost:5050/insertUser', formData); // Send the form data to the backend 

        // Navigate to the sign-in page after successful registration
        navigate('/signin');
    } catch (err) {
        console.error(err); 
        alert('Error registering user');
    }
  };


  return (
    <form className="Registrationform" onSubmit={handleSubmit}>
      <p className="RegisterText">Registration form</p>
      <input name="firstname" placeholder="First Name" onChange={handleChange} />
      <input name="lastname" placeholder="Last Name" onChange={handleChange} />
      <input name="username" type="text" placeholder="Username" onChange={handleChange} />
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