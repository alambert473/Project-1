// Backend: application services, accessible by URIs

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const dbService = require('./dbService');  // DbService is assumed to be the modified dbService.js

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// CREATE: Insert a new user
app.post('/insertUser', (request, response) => {
    console.log("app: insert a user.");
    
    const { username, password, firstname, lastname, age, salary } = request.body;
    const db = dbService.getDbServiceInstance();

    const registerday = new Date().toISOString().split('T')[0];  // current date
    const signintime = new Date().toISOString().replace('T', ' ').split('.')[0];  // current datetime

    const result = db.insertNewUser(username, password, firstname, lastname, age, salary, registerday, signintime);

    // note that result is a promise
    result 
    .then(data => response.json({data: data})) // Return the newly added user to frontend
    .catch(err => console.log(err));
});

// READ: Get all users
app.get('/getAllUsers', (request, response) => {
    console.log('Fetching all users');
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData(); // call a DB function

    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err));
});

// READ: Search for a user by username
app.get('/searchUser/:username', (request, response) => { 
    const { username } = request.params;
    console.log(`Searching for user: ${username}`);

    const db = dbService.getDbServiceInstance();
    const result = db.searchByUsername(username); // call the appropriate DB function

    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err));
});

// UPDATE: Update user data by ID
app.patch('/updateUser', (request, response) => {
    console.log("app: update is called");

    const { id, firstname, lastname } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.updateUserById(id, firstname, lastname);

    result.then(data => response.json({success: true}))
    .catch(err => console.log(err));
});

// DELETE: Delete user by ID
app.delete('/deleteUser/:id', (request, response) => {
    const { id } = request.params;
    console.log(`Deleting user with ID: ${id}`);
    const db = dbService.getDbServiceInstance();

    const result = db.deleteUserById(id);

    result.then(data => response.json({success: true}))
    .catch(err => console.log(err));
});

// Debug endpoint (optional, remove this in production)
app.post('/debug', (request, response) => {
    const { debug } = request.body;
    console.log(debug);
    return response.json({success: true});
});

// Debug function: You can use this to test any DB function temporarily
app.get('/testdb', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.deleteById("14"); // call a DB function here for testing
    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err));
});

// Set up the web server listener
app.listen(5050, () => {
    console.log("I am listening on port 5050.")
});

app.get('/', (req, res) => {
    res.send('Backend is running!');
});