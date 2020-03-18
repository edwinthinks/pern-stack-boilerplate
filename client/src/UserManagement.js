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

  async function deleteUser(userId) {
    const response = await fetch(`/api/users/${userId}`, {method: 'DELETE'});
    const json = await response.json();

    // Re-fetch users after deleting
    fetchUsers()
  }

  return (
    <div>
      <div className='user-management'>
        <div className='user-management__header'>
          <h1> Sample User Management UI </h1>
        </div>
        <div className='user-management__form'>
          <form className='user-form'>
            <div className='user-form__title'>
              <h1> Create User </h1>
            </div>
            <div class="form-group user-form__first-name">
              <label>First Name</label>
              <input type="text" class="form-control"/>
            </div>
            <div class="form-group user-form__last-name">
              <label>Last Name</label>
              <input type="text" class="form-control"/>
            </div>
            <div class="form-group user-form__email">
              <label>Email</label>
              <input type="text" class="form-control"/>
            </div>

            <div class="form-group user-form__actions">
              <button class="btn btn-primary user-form__submit">Submit</button>
            </div>
          </form>
        </div>
        <div className='user-management__list'>
          <table className='table'>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Updated At</th>
                <th scope="col">Created At</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                return (
                  <tr className='user-row'>
                    <td>{u.id}</td>
                    <td>{u.firstName}</td>
                    <td>{u.lastName}</td>
                    <td>{u.email}</td>
                    <td>{u.updatedAt}</td>
                    <td>{u.createdAt}</td>
                    <td>
                      <button type="button" className="btn btn-primary user-row__action-button">
                        Edit
                      </button>
                      <button type="button" class="btn btn-danger user-row__action-button" onClick={() => { deleteUser(u.id) }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UserManagement;
