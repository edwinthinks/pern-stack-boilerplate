import React, { useState, useEffect } from 'react';
import './UserManagement.css'

function UserManagement() {
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

  return (
    <div>
      <div className='user-management'>
        <div className='user-management__header'>
          <h1> User Management </h1>
        </div>
        <div className='user-management__form'>
          <h1> Form </h1>
        </div>
        <div className='user-management__list'>
          <h1> List </h1>
        </div>
      </div>
    </div>
  )
}

export default UserManagement;
