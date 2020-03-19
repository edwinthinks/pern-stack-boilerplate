import React, { useState, useEffect } from 'react';
import './UserManagement.css'

function UserManagement() {
  // Define the empty state of the user form to be
  // used when clearing out the form and setting the
  // default state.
  const emptyUserFormData = {firstName: "", lastName: "", email: ""}

  // Define the useState hooks to help manage the
  // states for each.
  const [users, setUsers] = useState([]) // User list.
  const [userData, setUserData] = useState(emptyUserFormData); // User form content.
  const [errorMessages, setErrorMessages] = useState([]) // Error message from server.

  /*
   * Loads the users from the API on load
   */
  useEffect(() => {
    fetchUsers();
  },[])

  /*
   * Fetches users from the API and updates the
   * state value for the users list.
   */
  async function fetchUsers() {
    const response = await fetch('/api/users');
    const json = await response.json();

    setUsers(json);
  };

  /**
   * Deletes a user via the API and then re-fetches
   * the list of users and updates it's state.
   */
  async function deleteUser(userId) {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'DELETE'
    });

    // Re-fetch users after deleting
    fetchUsers()
  }

  /*
   * Creates a new user via the API. If the response indicates
   * a failure, it will render the errors retrieved by the API
   * via state change. Otherwise it will clear the form and then
   * re-fetch the users list.
   */
  async function createUser() {
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

  /**
   * Handles events related to changes made on the
   * user form. This will update the state of the
   * user form data.
   */
  function handleUserFormChange(event) {
    const { name, value } = event.target;
    const newUserData = {...userData, ...{[name]: value}}
    setUserData(newUserData);
  }

  /*
   * Accepts a response that indicated a unsuccesful API
   * transaction and renders the error messages it contains
   * via state change.
   */
  async function handleServerError(response) {
    const json = await response.json();
    const errorMessages = json.errors.map((e) => {
      return e.message
    })

    setErrorMessages(errorMessages);
  }

  /*
   * Clears out the input values of the user form
   * and the error messages.
   */
  function clearUserForm() {
    setErrorMessages([])
    setUserData(emptyUserFormData)
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
                onChange={handleUserFormChange}/>
            </div>
            <div className="form-group user-form__last-name">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                name='lastName'
                value={userData.lastName}
                onChange={handleUserFormChange}/>
            </div>
            <div className="form-group user-form__email">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                name='email'
                value={userData.email}
                onChange={handleUserFormChange}/>
            </div>

            <div className="form-group user-form__actions">
              <button className="btn btn-primary user-form__submit" onClick={createUser}>
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
