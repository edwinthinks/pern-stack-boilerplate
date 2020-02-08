import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // **SAMPLE**
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchUsers();
  },[])

  async function fetchUsers() {
    const response = await fetch('/api/users');
    const json = await response.json();

    setUsers(json);
  };
  // **SAMPLE**

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
          {users.length > 0 &&
            <div>
              <h1>👇 Fetched Server Data 👇</h1>
              <code> {JSON.stringify(users)} </code>
            </div>
          }
      </header>
    </div>
  );
}

export default App;
