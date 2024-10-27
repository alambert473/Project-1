// src/App.js
import React, { useState } from 'react';
import './main.css';

const App = () => {
  const [name, setName] = useState(''); // Search input
  const [users, setUsers] = useState([]); // Array to hold user data from the API

  // Function to search users by first or last name
  const handleSearch = () => {
    fetch('http://localhost:5050/getAllUsers')
        .then(response => response.json())
        .then(data => {
              const usersArray = data.data;

              let newusers = usersArray.filter(user => {
                if (user.firstname == name || user.lastname == name) {
                  return true;
                }
                });

              setUsers(newusers);
        })


     .catch(error => console.error('Error fetching data:', error));
};

  return (
    <main>
      <div className="Part-3">
        <p>search users by first and/or last name</p>
        <div className="button-container">
          <input
            type="text"
            placeholder="search by first/last name"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update name state on input change
          />
          <button onClick={handleSearch}>search</button>
        </div>
      </div>

      <table id="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Password</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Salary</th>
            <th>Age</th>
            <th>Register Day</th>
            <th>Sign In Time</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.salary}</td>
                <td>{user.age}</td>
                <td>{user.registerday}</td>
                <td>{user.signintime || 'Never signed in'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">Empty</td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
};

export default App;