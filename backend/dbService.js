const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config(); // read from .env file

let instance = null;

// if you configure directly in this file, there is a security issue, but it will work
const connection = mysql.createConnection({

     host: "localhost",
     user: "root",        
     password: "",
     database: "web_app",
     port: 3306

});

connection.connect((err) => {
     if (err) {
        console.log(err.message);
     }
     console.log('db ' + connection.state);    // to see if the DB is connected or not
});

// The following are database functions
class DbService {
    static getDbServiceInstance() { // Singleton pattern
        return instance ? instance : new DbService();
    }

    // Fetch all data from the users table
    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users;";
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    else resolve(results);
                });
            });
            return response;

        } catch (error) {
            console.log(error);
        }
    }

    // Insert a new user into the users table
    async insertNewUser(username, password, firstname, lastname, age, salary, registerday, signintime) {
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO users (username, password, firstname, lastname, age, salary, registerday, signintime) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
                connection.query(query, [username, password, firstname, lastname, age, salary, registerday, signintime], (err, result) => {
                    if (err) reject(new Error(err.message));
                    else resolve(result.insertId);
                });
            });
            console.log(insertId);  // for debugging to see the result of insert
            return {
                id: insertId,
                username: username,
                password: password,
                firstname: firstname,
                lastname: lastname,
                age: age,
                salary: salary,
                registerday: registerday,
                signintime: signintime
            };
        } catch (error) {
            console.log(error);
        }
    }

    // Search a user by username
    async searchByUsername(username) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users WHERE username = ?;";
                connection.query(query, [username], (err, results) => {
                    if (err) reject(new Error(err.message));
                    else resolve(results);
                });
            });
            return response;

        } catch (error) {
            console.log(error);
        }
    }

    // Check the user's password based on their username
    async checkUserPassword(username, password) {
       try {
          const response = await new Promise((resolve, reject) => {
             const query = "SELECT password FROM users WHERE username = ?;";
             connection.query(query, [username], (err, results) => {
                   if (err) reject(new Error(err.message));
                   else resolve(results);
             });
           });
            return response;

       } catch (error) {
            console.log(error);
       }
      }

    // Delete a user by ID
    async deleteUserById(id) {
        try {
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM users WHERE id = ?;";
                connection.query(query, [id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    else resolve(result.affectedRows);
                });
            });

            console.log(response);  // for debugging to see the result of delete
            return response === 1 ? true : false;

        } catch (error) {
            console.log(error);
        }
    }

    // Update a user's information by ID
    async updateUserById(id, newFirstname, newLastname) {
        try {
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE users SET firstname = ?, lastname = ? WHERE id = ?;";
                connection.query(query, [newFirstname, newLastname, id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    else resolve(result.affectedRows);
                });
            });

            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
        }
    }
}



module.exports = DbService;