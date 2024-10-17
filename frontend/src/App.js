// src/App.js
import React, { useState } from 'react';
import './main.css';

const App = () => {
  const [name, setName] = useState('');
  const [names, setNames] = useState([]);

  return (
    <main>
      
      <div className = "AddName">
        <label>Name:</label>
        <input
            type="text"
            id="name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
         <button id="add-name-btn" onClick={() => setNames([...names, name])}>
          Add
        </button>
      </div>


      <br /><br /><br />

      <div>
        <input placeholder="search by name" id="search-input" />
        <button id="search-btn">Search</button>
      </div>

      <table id="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Date Added</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {names.map((name, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{name}</td>
              <td>{new Date().toLocaleString()}</td>
              <td>
                <button className = "Delete-Button" onClick={() => setNames(names.filter((_, i) => i !== index))}>
                  Delete
                </button>
              </td>
              <td>
                <button className = "Edit-Button">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <section hidden id="update-row">
        <label>Name:</label>
        <input type="text" id="update-name-input" />
        <button id="update-row-btn" value="">
          Update
        </button>
      </section>
    </main>
  );
};

export default App;