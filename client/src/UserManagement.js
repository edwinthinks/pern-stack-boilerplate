import React, { useState, useEffect } from 'react';
import './UserManagement.css'

function UserManagement() {
  const [users, setUsers] = useState([])
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: ""
  })
  const [errorMessages, setErrorMessages] = useState([])

  useEffect(() => {
    fetchUsers();
  },[])

  async function fetchUsers() {
    const response = await fetch('/api/users');
    const json = await response.json();

    setUsers(json);
  };

  async function deleteUser(userId) {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'DELETE'
    });

    // Re-fetch users after deleting
    fetchUsers()
  }

  function handleFormChange(event) {
    const { name, value } = event.target;
    const newUserData = {...userData, ...{[name]: value}}
    setUserData(newUserData);
  }

  async function submitCreateUser() {
    const response = await fetch(`/api/users/`, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers:{
        'Content-Type': 'application/json'
      }
    });

    if (response.status != 200) {
      // A server side error occured. Display the
      // error messages.
      handleServerError(response);
    } else {
      clearUserForm();
      // Re-fetch users after creating new
      fetchUsers()
    }
  }

  async function handleServerError(response) {
    const json = await response.json();
    const errorMessages = json.errors.map((e) => {
      return e.message
    })

    setErrorMessages(errorMessages);
  }

  function clearUserForm() {
    setErrorMessages([])
    setUserData({firstName: "", lastName: "", email: ""})
  }

  return (
    <div>
      <div className='user-management'>
        <div className='user-management__header'>
          <h1> Sample User Management UI </h1>
        </div>
        <div className='user-management__form'>
          <form className='user-form' onSubmit={e => {e.preventDefault()}}>
            <div className='user-form__title'>
              <h1> Create User </h1>
            </div>
            <div className="user-form__errors">
              <ul>
                {errorMessages.map((em) => {
                  return (
                    <li>{em}</li>
                  )
                })}
              </ul>
            </div>
            <div className="form-group user-form__first-name">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                name='firstName'
                value={userData.firstName}
                onChange={handleFormChange}/>
            </div>
            <div className="form-group user-form__last-name">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                name='lastName'
                value={userData.lastName}
                onChange={handleFormChange}/>
            </div>
            <div className="form-group user-form__email">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                name='email'
                value={userData.email}
                onChange={handleFormChange}/>
            </div>

            <div className="form-group user-form__actions">
              <button className="btn btn-primary user-form__submit" onClick={submitCreateUser}>
                Submit
              </button>
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
                      <button type="button" className="btn btn-danger user-row__action-button" onClick={() => { deleteUser(u.id) }}>
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
