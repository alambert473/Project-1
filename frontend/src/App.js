import React, { useState } from 'react';
import './main.css';

const App = () => {
  const [showtext, setShowtext] = useState('');
  const [XSalary, setXSalary] = useState('');
  const [YSalary, setYSalary] = useState('');
  const [Xage, setXage] = useState('');
  const [Yage, setYage] = useState('');
  const [name, setName] = useState(''); // Search input
  const [id, setId] = useState(''); // search id
  const [users, setUsers] = useState([]); // Array to hold user data from the API

  const shownameusers = (datatype) => {
    const usersArray = datatype.data;

    const nameParts = name.trim().split(" ");

    let newusers = usersArray.filter(user => {
      if (nameParts.length === 1) {
        return (
          user.firstname.toLowerCase() === nameParts[0].toLowerCase() ||
          user.lastname.toLowerCase() === nameParts[0].toLowerCase()
        );
      } 

      else if (nameParts.length === 2) {
        return (
          user.firstname.toLowerCase() === nameParts[0].toLowerCase() &&
          user.lastname.toLowerCase() === nameParts[1].toLowerCase()
        );
      }
      return false; 
    });
  
    setUsers(newusers);
    setShowtext(`Showing results for search by name: ${name}`);
    setName('');
  }


  const showidusers = (datatype) => {
    const usersArray = datatype.data;

    let newusers = usersArray.filter(user => {
      if (user.id == id) {
        return true;
      }
      });

    setUsers(newusers);
    setShowtext(`Showing results for search users by userid of ${id}`);
    setId('');
  }


  const showsalary = (datatype) => {
    const usersArray = datatype.data;

    let newusers = usersArray.filter(user => {
      if (user.salary > XSalary && user.salary < YSalary) {
        return true;
      }
    });

    setUsers(newusers);
    setShowtext(`Showing results for search all users whose salary is between ${XSalary} and ${YSalary}`);
    setXSalary('');
    setYSalary('');
  }


  const showage = (datatype) => {
    const usersArray = datatype.data;

    let newusers = usersArray.filter(user => {
      if (user.age > Xage && user.age < Yage) {
        return true;
      }
    });

    setUsers(newusers);
    setShowtext(`Showing results for search all users whose age is between ${Xage} and ${Yage}`);
    setXage('');
    setYage('');
  }

  const checksignin = (datatype) => {
      const userarray = datatype.data;

      let newusers = userarray.filter(user => {
        if (user.signintime === null) {
          return true;
        }
      });


      setUsers(newusers);
      setShowtext(`Showing results for search users who never signed in`);
  }

  const afterjohnid = (datatype) => {
    const usersArray = datatype.data;

    const johnUser = usersArray.find(user => user.firstname.toLowerCase() === "john");
    if (!johnUser) {
      setShowtext("User 'john' not found.");
      return;
    }
  
    const johnRegisterDate = new Date(johnUser.registerday);
  
    let newusers = usersArray.filter(user => new Date(user.registerday) > johnRegisterDate);
  
    setUsers(newusers);
    setShowtext("Showing results for users who registered after John registered");
  }

  
  const sameDay = (datatype) => {
    const userarray = datatype.data;
    let johndate = null;

    userarray.forEach(e => {
      const nametouppercase = e.firstname.toUpperCase();
      console.log(nametouppercase);

      if (nametouppercase === 'JOHN'){
        johndate = String(e.registerday);
      }
    });

    if (johndate) {
        const johnyear = Number(johndate.substring(0, 4));
        const johnthismonth = Number(johndate.substring(5, 7));
        const johnthisday = Number(johndate.substring(8, 10));

        let newusers = userarray.filter(user => {
          const registerinfo = user.registerday;

          const useryear = Number(registerinfo.substring(0, 4));
          const userthismonth = Number(registerinfo.substring(5, 7));
          const userthisday = Number(registerinfo.substring(8, 10));

          if (johnyear === useryear && johnthismonth === userthismonth && johnthisday === userthisday) {
            return true;
          }
      });

      setUsers(newusers);
      setShowtext(`Results for users who registered on the same day that john registered`);
    }
  }


  const registeredtoday = (datatype) => {
    const userarray = datatype.data;

    const today = new Date().toISOString();
    const todaythisyear = Number(today.substring(0, 4));
    const todaythismonth = Number(today.substring(5, 7));
    const todaythisday = Number(today.substring(8, 10));

    console.log(today);

    let newusers = userarray.filter(user => {
      const registerinfo = user.registerday;

      const useryear = Number(registerinfo.substring(0, 4));
      const usermonth = Number(registerinfo.substring(5, 7));
      const userday = Number(registerinfo.substring(8, 10));

      if (todaythisyear === useryear && todaythismonth === usermonth && todaythisday === userday) {
        return true;
      }
    })

    setUsers(newusers);
    setShowtext(`Results for users that registered today`);
  }



  const handleSearch = (type) => {
    fetch('http://localhost:5050/getAllUsers')
        .then(response => response.json())
        .then(data => {
            if (type === "searchname") {
              shownameusers(data);
            } else if (type === 'searchid') {
              showidusers(data);
            } else if (type === 'searchsalary') {
              showsalary(data)
            } else if (type === 'searchage') {
              showage(data);
            } else if (type === "afterjohnuserid") {
              afterjohnid(data);
            }else if (type === "checksignin") {
              checksignin(data);
            } else if (type === "part9afterjohn") {
              sameDay(data);
            } else if (type === 'registeredtoday') {
              registeredtoday(data);
            }
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
            onChange={(e) => setName(e.target.value)} 
          />
          <button onClick={() => handleSearch('searchname')}>search</button>
        </div>
      </div>

      <div className="Part-4 addmargin">
        <p>search users by userid</p>
        <div className="button-container">
          <input
            type="text"
            placeholder="search users by userid"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button onClick={() => handleSearch('searchid')}>search</button>
        </div>
      </div>

      <div className="Part-5 addmargin">
        <p>search all users whose salary is between x and y</p>
        <div className="button-container">
          <input className = "X-value"
            type="text"
            placeholder="X"
            value={XSalary}
            onChange={(e) => setXSalary(e.target.value)} 
          />
          <input className='Y-value'
            type="text"
            placeholder="Y"
            value={YSalary}
            onChange={(e) => setYSalary(e.target.value)} 
          />
          <button onClick={() => handleSearch('searchsalary')}>search</button>
        </div>
      </div>

      <div className="Part-6 addmargin">
        <p>Search all users whose ages are between X and Y</p>
        <div className="button-container">
          <input className = "X-value"
            type="text"
            placeholder="X"
            value={Xage}
            onChange={(e) => setXage(e.target.value)} 
          />
          <input className='Y-value'
            type="text"
            placeholder="Y"
            value={Yage}
            onChange={(e) => setYage(e.target.value)} 
          />
          <button onClick={() => handleSearch('searchage')}>search</button>
        </div>
      </div>
      

      <p className="show-text">{showtext}</p>

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
            users.map(user => (
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